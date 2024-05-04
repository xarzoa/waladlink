import { NextResponse } from 'next/server';

export async function POST(request, context) {
  if(context.params.id !== process.env.PLISIO_ID){
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    )
  }
  try {
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
