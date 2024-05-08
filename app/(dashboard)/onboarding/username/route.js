import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { z } from 'zod';

const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { message: 'Username must contain 4+ characters.' })
    .max(32, { message: 'Username cannot exceed 32 characters.' })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores, and hyphens.',
    })
    .toLowerCase(),
});

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '120 s'),
  analytics: true,
  prefix: 'ratelimit',
});

export async function GET(request, context) {
  let username = request.nextUrl.searchParams.get('string');

  if (!username) {
    res.status(400).json({ availability: false, message: 'Username is empty' });
    return;
  }
  const validatedFields = usernameSchema.safeParse({
    username,
  });
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        availability: false,
        message: validatedFields.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }
  const session = await auth();
  const identifier = session.user.id;
  const { success } = await ratelimit.limit(identifier);
  if (!success) {
    return NextResponse.json(
      { availability: false, message: 'Ratelimit reached.' },
      { status: 202 }
    );
  }
  if (session) {
    try {
      const exists = await redis.hget(`user:${username}`, 'exists');
      if (exists) {
        return NextResponse.json(
          { availability: false, message: 'Username is already taken.' },
          { status: 202 }
        );
      }
      return NextResponse.json(
        { availability: true, message: 'Username is available.' },
        { status: 200 }
      );
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { availability: false, message: 'Something went wrong.' },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    { availability: false, message: 'Unauthorized.' },
    { status: 401 }
  );
}
