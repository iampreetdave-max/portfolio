import { NextRequest, NextResponse } from "next/server";
import { findOpenData } from "@/app/open-data/pipeline";

export const runtime = "edge";

// POST { q } -> checked open datasets. POST, not GET, so crawlers never spend model calls.
export async function POST(req: NextRequest) {
  let q = "";
  try {
    q = String((await req.json())?.q ?? "").trim();
  } catch {}
  if (q.length < 3 || q.length > 200) {
    return NextResponse.json({ error: "Describe the data you need in 3 to 200 characters." }, { status: 400 });
  }
  try {
    return NextResponse.json(await findOpenData(q), { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "The search failed. Try again in a minute." }, { status: 500 });
  }
}
