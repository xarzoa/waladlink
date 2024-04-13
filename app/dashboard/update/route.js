import { NextResponse } from 'next/server';

export async function GET(request, context) {
  console.log({ con: context });
  console.log({ teq: request.nextUrl.searchParams.get('id') });
  return NextResponse.json({ hello: 'world' });
}
