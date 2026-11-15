import { NextRequest, NextResponse } from "next/server";
import { ask, MAX_QUESTION } from "@/lib/ask";
import { chat } from "@/lib/llm";

export const runtime = "edge";

// Turnstile is on only when both keys are configured (TURNSTILE_SECRET here, the site key in the page).
async function humanCheck(token: unknown, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const body = new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  return ((await res.json().catch(() => ({}))) as { success?: boolean }).success === true;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  if (!question || question.length > MAX_QUESTION) {
    return NextResponse.json({ kind: "error", message: `Ask a question of up to ${MAX_QUESTION} characters.` }, { status: 400 });
  }
  if (!(await humanCheck(body?.token, req.headers.get("cf-connecting-ip")))) {
    return NextResponse.json({ kind: "error", message: "Could not verify you are human. Refresh and try again." }, { status: 403 });
  }
  try {
    return NextResponse.json(await ask(question, chat));
  } catch (e) {
    const quota = (e as { quota?: boolean }).quota === true;
    console.error("ask failed:", quota ? "quota" : (e as Error)?.message?.slice(0, 120)); // never includes a key
    return NextResponse.json({ kind: quota ? "resting" : "error" }, { status: 503 });
  }
}
