import crypto from "node:crypto";
import { NextResponse } from "next/server";

const secret = process.env.WEBHOOK_SECRET;

export async function POST(request) {
  if (!secret) {
    return new Response("Webhook Secret not set in .env", {
      status: 500,
    });
  }

  const rawBody = await request.text();

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(
    request.headers.get("X-Signature") ?? "",
    "utf8",
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    return new Response("Invalid signature", { status: 400 });
  }

  const data = JSON.parse(rawBody);

  return NextResponse.json(data)
}