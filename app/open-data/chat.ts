// Model call for the Open Data Finder: Claude Haiku 5.5 (cheap on a public page).
// Throws when there is no key or no answer; the caller then falls back to plain
// catalog order, so the page still works without a model.
// ponytail: plain fetch like lib/llm.ts, lib/debate.ts and /api/fun, so the edge bundle carries no SDK.
// Same request the benchmark ran with (effort low, max_tokens 4096, one retry, 30 s timeout).

const MODEL = "claude-haiku-5-5";

export type Msg = { role: "system" | "user"; content: string };
export type Reply = { text: string; model: string; inputTokens: number; outputTokens: number };

// next-on-pages keeps each request's env here (what getRequestContext() reads);
// `next start` locally uses process.env.
const apiKey = (): string | undefined =>
  (globalThis as any)[Symbol.for("__cloudflare-request-context__")]?.env?.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY;

export async function chat(messages: Msg[]): Promise<Reply> {
  const key = apiKey();
  if (!key) throw new Error("no model configured");
  const body = JSON.stringify({
    model: MODEL,
    max_tokens: 4096, // adaptive thinking is on by default and counts here; effort "low" keeps it short
    output_config: { effort: "low" },
    system: messages.filter((m) => m.role === "system").map((m) => m.content).join("\n"),
    messages: [{ role: "user", content: messages.filter((m) => m.role === "user").map((m) => m.content).join("\n") }],
  });
  let res: Response | undefined;
  for (let attempt = 0; attempt < 2; attempt++) { // one retry on rate limit, overload or a network error
    try {
      res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body,
        signal: AbortSignal.timeout(30_000),
      });
    } catch (e) {
      if (attempt === 1) throw e;
      continue;
    }
    if (res.ok || ![408, 409, 429, 500, 502, 503, 529].includes(res.status)) break;
  }
  if (!res?.ok) throw new Error(`anthropic ${res?.status}`);
  const msg = await res.json();
  if (msg.stop_reason === "refusal") throw new Error("Claude declined"); // Haiku has no server-side fallback
  const text = (msg.content ?? [])
    .filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("");
  if (!text.trim()) throw new Error("Claude returned no text");
  return { text, model: msg.model ?? MODEL, inputTokens: msg.usage?.input_tokens ?? 0, outputTokens: msg.usage?.output_tokens ?? 0 };
}
