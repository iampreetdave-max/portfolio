import { NextRequest, NextResponse } from "next/server";
import { handleDebate } from "@/lib/debate";

export const runtime = 'edge';

// /fun is the AI debate only; its caps, prompts and friendly errors live in lib/debate.ts.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (body?.game !== "debate") return NextResponse.json({ error: "Unknown game" }, { status: 404 });
  const { status, body: out } = await handleDebate(body.payload, process.env.ANTHROPIC_API_KEY);
  return NextResponse.json(out, { status });
}
