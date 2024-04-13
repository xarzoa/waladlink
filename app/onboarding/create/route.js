import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { create } from '@/lib/db';
import { update } from '@/lib/updateAuth';
import { ObjectId } from 'mongodb';

export function _id(hex) {
  if (hex?.length !== 24) return new ObjectId()
  // i tried to do using a different method, never worked. so here i am
  return new ObjectId(hex)
}

export async function POST(request, context) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await request.json()
    try {
      await create(
        'usernames',
        {
          username: data.username,
          userId: _id(session.user.id),
        },
        ['username', 'userId']
      );
      await create(
        'userData',
        {
          username: data.username,
          userId: _id(session.user.id),
          idString: session.user.id
        },
        ['username', 'userId']
      );
      await update('users', { isnew: '' }, { _id: _id(session.user.id) })
      return NextResponse.json(
        { message: 'Successfully created the user.' },
        { status: 201 }
      );
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
}
