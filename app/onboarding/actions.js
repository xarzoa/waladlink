'use server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { create } from '@/lib/db';
import { update } from '@/lib/updateAuth';
import { ObjectId } from 'mongodb';
import { Redis } from '@upstash/redis';

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

export async function createUser(data) {
  const validatedFields = usernameSchema.safeParse({
    username: data.username,
  });
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
      type: 'error',
    };
  }
  const session = await auth()
  if (session) {
    const redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });
    const userId = session.user.id;
    try {
      const username = {
        username: data.username,
        _id: new ObjectId(userId),
      };
      const userData = {
        _id: new ObjectId(userId),
        username: data.username,
        name: data.username,
        plan: 'FREE',
        wallets: [],
        planInfo: {
          wallets: 10,
          advancedAnalytics: false,
        },
      };
      const oldUsernames = {
        _id: new ObjectId(userId),
        usernames: [data.username],
      };
      await create('userData', userData, ['username']);
      await update('users', "$unset", { isnew: '' }, { _id: new ObjectId(userId) });
      await redis.hset(`user:${data.username}`, { exists: true, userId });
      return {
        message: 'User created.',
        type: 'success',
      };
    } catch (e) {
      console.log(e);
      if (e.message.startsWith('E11000')) {
        return {
          message: 'Username or UserId already in use.',
          type: 'error',
        };
      }
      return {
        message: 'Something went wrong.',
        type: 'error',
      };
    }
  }
  return {
    message: 'Unauthorized. Relogin and try again.',
    type: 'error',
  };
}
