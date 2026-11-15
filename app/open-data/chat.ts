// Model call for the Open Data Finder: Claude Haiku 5.5 (cheap on a public page).
// Throws when there is no key or no answer; the caller then falls back to plain
// catalog order, so the page still works without a model.
// ponytail: feature-local on purpose; the parent merges this with lib/llm.ts.
import Anthropic from "@anthropic-ai/sdk";

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
  const client = new Anthropic({ apiKey: key, timeout: 30_000, maxRetries: 1 });
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 4096, // adaptive thinking is on by default and counts here; effort "low" keeps it short
    output_config: { effort: "low" },
    system: messages.filter((m) => m.role === "system").map((m) => m.content).join("\n"),
    messages: [{ role: "user", content: messages.filter((m) => m.role === "user").map((m) => m.content).join("\n") }],
  });
  if (msg.stop_reason === "refusal") throw new Error("Claude declined"); // Haiku has no server-side fallback
  const text = msg.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  if (!text.trim()) throw new Error("Claude returned no text");
  return { text, model: msg.model, inputTokens: msg.usage.input_tokens, outputTokens: msg.usage.output_tokens };
}
