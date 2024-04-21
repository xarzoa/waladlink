import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function GET(request, context) {
  try {
    const pageId = 'a8e564f73c574d09bb5f62a991dfd659';
    const response = await notion.databases.query({ database_id: 'ee210392-35a2-46ce-b2dc-af8be49f5cbd' })
    // const response = await notion.pages.retrieve({ page_id: pageId });
    console.log(response)
    return NextResponse.json( response , { status: 200 })
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
