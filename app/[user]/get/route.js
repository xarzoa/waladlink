import { NextResponse } from 'next/server';
import { get } from '@/lib/db';

export async function GET(request, context) {
  try {
    const res = await get('userData', { username: context.params.user });
    if (res) {
      const { _id, history, planInfo, plan, ...data } = res;
      return NextResponse.json({ data }, { status: 200 });
    }
    return NextResponse.json({ error: "User doesn't excist." }, { status: 404 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
