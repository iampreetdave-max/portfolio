import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get("repo");
  if (!repo) return NextResponse.json({ error: "repo param required" }, { status: 400 });

  if (!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repo)) {
    return NextResponse.json({ error: "Invalid repo format" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "portfolio-app",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return NextResponse.json({ stars: 0, forks: 0, language: null });

    const data = await res.json();
    return NextResponse.json(
      {
        stars: data.stargazers_count ?? 0,
        forks: data.forks_count ?? 0,
        language: data.language ?? null,
      },
      { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json({ stars: 0, forks: 0, language: null });
  }
}
