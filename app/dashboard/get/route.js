import { NextResponse } from 'next/server';
import { get } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next'

export async function GET(request, context) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const res = await get('userData', { _id: new ObjectId(session.user.id) });
      const { _id, history, ...data } = res
      return NextResponse.json(
        { data },
        { status: 200 }
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
