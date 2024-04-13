import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { get } from '@/lib/db';
import slugify from 'slugify';

export async function GET(request, context) {
  const session = await getServerSession(authOptions);
  let username = request.nextUrl.searchParams.get('string');
  username = slugify(username, {
    replacement: '-', 
    remove: /[*+~._()'"!:@]/g, 
    lower: false, 
    strict: false, 
    locale: 'en',
    trim: true,
  });
  if (session) {
    try {
      const availability = await get('usernames', {
        username,
      });
      if (!availability) {
        return NextResponse.json({
          availability: true,
          message: 'Username available.',
        });
      }
      return NextResponse.json(
        { availability: false, message: 'Username unavailable.' },
        { status: 202 }
      );
    } catch (e) {
      return NextResponse.json(
        { availability: false, message: e.message },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    { availability: false, message: 'Unauthorized.' },
    { status: 401 }
  );
}
