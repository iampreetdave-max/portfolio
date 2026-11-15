// The tech web's graph and layout, computed on the server at build time (the About page is
// static), so the browser only draws the numbers. Technologies come from the content tags.
import {
  siClaude, siCloudflare, siDocker, siDrizzle, siElectron, siExpo, siFastapi, siFirebase, siFlutter,
  siGithubactions, siGoogle, siGooglecloud, siGooglegemini, siHono, siHuggingface, siJavascript, siJest, siKit,
  siLeaflet, siMake, siMistralai, siMongodb, siN8n, siNextdotjs, siNodedotjs, siPandas, siPostgresql, siPython,
  siReact, siRedis, siScikitlearn, siSocketdotio, siSqlite, siStreamlit, siSupabase, siTailwindcss, siTypescript,
  siVercel, siWordpress, siYolo, siZapier,
} from "simple-icons";
import { automations, projects, techUses } from "./content";

// Brand icons (simple-icons, CC0) where the brand exists there; a monogram for the rest.
const ICONS: Record<string, { path: string }> = {
  "Claude": siClaude, "Cloudflare": siCloudflare, "Docker": siDocker, "Drizzle": siDrizzle, "Electron": siElectron,
  "Expo": siExpo, "FastAPI": siFastapi, "Firebase": siFirebase, "Flutter": siFlutter, "GitHub Actions": siGithubactions,
  "Google Workspace": siGoogle, "Google Cloud": siGooglecloud, "Gemini": siGooglegemini, "Hono": siHono,
  "Hugging Face": siHuggingface, "JavaScript": siJavascript, "Jest": siJest, "Kit": siKit, "Leaflet": siLeaflet,
  "Make": siMake, "Mistral": siMistralai, "MongoDB": siMongodb, "n8n": siN8n, "Next.js": siNextdotjs,
  "Node.js": siNodedotjs, "pandas": siPandas, "Postgres": siPostgresql, "Python": siPython, "React": siReact,
  "Redis": siRedis, "scikit-learn": siScikitlearn, "Socket.IO": siSocketdotio, "SQLite": siSqlite,
  "Streamlit": siStreamlit, "Supabase": siSupabase, "Tailwind CSS": siTailwindcss, "TypeScript": siTypescript,
  "Vercel": siVercel, "WordPress": siWordpress, "YOLOv8": siYolo, "Zapier": siZapier,
};
const MONO: Record<string, string> = {
  "LiteLLM": "LL", "Attendee": "At", "Parakeet": "Pk", "Slack": "Sl", "Playwright": "Pw", "PyMuPDF": "Mu", "OCR": "OCR",
  "Recharts": "Rc", "xarray": "xr", "CLIP": "CL", "FAISS": "FA", "BeautifulSoup": "BS", "APScheduler": "AP",
  "XGBoost": "XG", "LightGBM": "LG",
};

export type WebNode = {
  id: string; kind: "tech" | "project"; label: string; x: number; y: number;
  href?: string; icon?: string; mono?: string; n: string[]; // n: ids of the nodes it connects to
};
export type Web = { w: number; h: number; nodes: WebNode[]; edges: [string, string][] };

export function techWeb(w = 680, h = 560): Web {
  const uses = techUses();
  const linked = new Set(uses.flatMap((u) => u.projects));
  const nodes: WebNode[] = [
    ...[...projects, ...automations].filter((p) => linked.has(p.id))
      .map((p) => ({ id: p.id, kind: "project" as const, label: p.name, href: `/projects#${p.id}`, x: 0, y: 0, n: [] as string[] })),
    ...uses.map((u) => ({
      id: `t-${u.name}`, kind: "tech" as const, label: u.name, x: 0, y: 0, n: [] as string[],
      ...(ICONS[u.name] ? { icon: ICONS[u.name].path } : { mono: MONO[u.name] ?? u.name.slice(0, 2) }),
    })),
  ];
  const edges = uses.flatMap((u) => u.projects.map((p) => [`t-${u.name}`, p] as [string, string]));
  const at = new Map(nodes.map((n, i) => [n.id, i]));
  edges.forEach(([a, b]) => { nodes[at.get(a)!].n.push(b); nodes[at.get(b)!].n.push(a); });

  // Fruchterman-Reingold with a pull to the centre, from a sunflower start so it is deterministic.
  // ponytail: O(n^2) repulsion, fine for ~80 nodes at build time; a quadtree only if this grows past a few hundred.
  const N = nodes.length, k = Math.sqrt((w * h) / N) * 0.75, steps = 600;
  const pos = nodes.map((_, i) => ({ x: Math.cos(i * 2.39996) * Math.sqrt(i + 1) * 20, y: Math.sin(i * 2.39996) * Math.sqrt(i + 1) * 20 }));
  for (let s = 0; s < steps; s++) {
    const d = pos.map(() => ({ x: 0, y: 0 }));
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const dx = pos[i].x - pos[j].x, dy = pos[i].y - pos[j].y, dist = Math.max(Math.hypot(dx, dy), 0.01), f = (k * k) / dist;
      d[i].x += (dx / dist) * f; d[i].y += (dy / dist) * f; d[j].x -= (dx / dist) * f; d[j].y -= (dy / dist) * f;
    }
    for (const [a, b] of edges) {
      const i = at.get(a)!, j = at.get(b)!;
      const dx = pos[i].x - pos[j].x, dy = pos[i].y - pos[j].y, dist = Math.max(Math.hypot(dx, dy), 0.01), f = (dist * dist) / k;
      d[i].x -= (dx / dist) * f; d[i].y -= (dy / dist) * f; d[j].x += (dx / dist) * f; d[j].y += (dy / dist) * f;
    }
    const t = k * 0.5 * (1 - s / steps) + 0.5;
    pos.forEach((p, i) => {
      d[i].x -= p.x * 0.6; d[i].y -= p.y * 0.6 * (w / h); // gravity, a little stronger vertically
      const len = Math.max(Math.hypot(d[i].x, d[i].y), 0.01);
      p.x += (d[i].x / len) * Math.min(len, t); p.y += (d[i].y / len) * Math.min(len, t);
    });
  }

  // Fit into the box, leaving room for the icons and labels.
  const pad = 24, xs = pos.map((p) => p.x), ys = pos.map((p) => p.y);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const fit = pos.map((p) => ({ x: pad + ((p.x - x0) / (x1 - x0 || 1)) * (w - 2 * pad), y: pad + ((p.y - y0) / (y1 - y0 || 1)) * (h - 2 * pad) }));

  // Then nudge apart any two nodes whose circles touch (icons are r=13, project dots r=4).
  const r = (i: number) => (nodes[i].kind === "tech" ? 16 : 7);
  for (let s = 0; s < 60; s++) for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const dx = fit[i].x - fit[j].x, dy = fit[i].y - fit[j].y, dist = Math.max(Math.hypot(dx, dy), 0.01), gap = r(i) + r(j) - dist;
    if (gap > 0) { const ux = (dx / dist) * gap / 2, uy = (dy / dist) * gap / 2; fit[i].x += ux; fit[i].y += uy; fit[j].x -= ux; fit[j].y -= uy; }
  }
  nodes.forEach((n, i) => {
    n.x = Math.round(Math.min(w - pad, Math.max(pad, fit[i].x)));
    n.y = Math.round(Math.min(h - pad, Math.max(pad, fit[i].y)));
  });
  return { w, h, nodes, edges };
}
