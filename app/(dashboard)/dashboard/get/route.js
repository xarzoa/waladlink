import { NextResponse } from 'next/server';
import { get } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const res = await get('userData', { _id: new ObjectId(session.user.id) });
    const { _id, history, ...data } = res;
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
