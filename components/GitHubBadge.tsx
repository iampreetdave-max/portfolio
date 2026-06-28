"use client";

import { useEffect, useState } from "react";
import { Star, GitFork } from "lucide-react";

interface GitHubStats {
  stars: number;
  forks: number;
  language: string | null;
}

function parseRepo(url: string): string | null {
  try {
    const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
    return match ? match[1].replace(/\.git$/, "") : null;
  } catch {
    return null;
  }
}

export default function GitHubBadge({ repoUrl }: { repoUrl?: string | null }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    if (!repoUrl) return;
    const repo = parseRepo(repoUrl);
    if (!repo) return;

    const controller = new AbortController();
    fetch(`/api/github-stats?repo=${encodeURIComponent(repo)}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setStats(data); })
      .catch(() => {});

    return () => controller.abort();
  }, [repoUrl]);

  if (!stats || !repoUrl) return null;
  if (stats.stars === 0 && stats.forks === 0 && !stats.language) return null;

  return (
    <div className="flex items-center gap-3 font-mono text-[10px] text-faint mt-3">
      {stats.stars > 0 && (
        <span className="flex items-center gap-1">
          <Star size={10} className="text-accent" />
          {stats.stars}
        </span>
      )}
      {stats.forks > 0 && (
        <span className="flex items-center gap-1">
          <GitFork size={10} />
          {stats.forks}
        </span>
      )}
      {stats.language && (
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {stats.language}
        </span>
      )}
    </div>
  );
}
