import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_SECONDS, newSession } from "@/lib/admin-auth";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  const expected = process.env.ADMIN_PASSWORD;

  // No password configured means no admin, never "an empty password matches an unset one".
  if (!expected || typeof password !== "string" || password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, await newSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_SECONDS,
    path: "/",
  });

  return response;
}
