import { NextResponse } from 'next/server';
import { get } from '@/lib/db';

export async function GET(request, context) {
  try {
    const res = await get('userData', { username: context.params.user });
    const { _id, history, planInfo, plan, ...data } = res;
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
