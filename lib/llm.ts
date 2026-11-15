// One Anthropic Messages API call. The model is ASK_MODEL (default claude-haiku-5-5); the key is
// ANTHROPIC_API_KEY, the same one /api/fun uses. Errors carry `quota: true` when the API is out of
// rate limit, overloaded, or past the workspace spend limit.
// ponytail: plain fetch like /api/fun, no SDK; the deploy installs without a lockfile on the edge,
// so fewer packages is fewer ways to break it.

export type ChatArgs = { system: string; messages: { role: "user" | "assistant"; content: string }[]; maxTokens: number };
export type ChatReply = { text: string; usage: { model: string; input: number; output: number; stop?: string } };

const fail = (message: string, quota: boolean): never => { throw Object.assign(new Error(message), { quota }); };

export async function chat({ system, messages, maxTokens }: ChatArgs): Promise<ChatReply> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return fail("ANTHROPIC_API_KEY is not set", false);
  const model = process.env.ASK_MODEL || "claude-haiku-5-5";
  // Haiku 5.5 may turn thinking off, which keeps a short answer inside max_tokens; it has no server-side
  // fallback. Opus 5.5 / Sonnet 5.5 cannot turn thinking off, so they run at low effort, and a policy
  // decline is retried on a fallback model by the API ("default" routing).
  const haiku = model.startsWith("claude-haiku");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01",
      ...(haiku ? {} : { "anthropic-beta": "server-side-fallback-2026-07-01" }),
    },
    body: JSON.stringify({
      model, max_tokens: maxTokens, system, messages,
      ...(haiku ? { thinking: { type: "disabled" } } : { output_config: { effort: "low" }, fallbacks: "default" }),
    }),
  });
  if (!res.ok) {
    // Rate limit, overload, or the workspace's spend limit / credit running out: the bot "rests".
    const body = await res.text().catch(() => "");
    return fail(`anthropic ${res.status}`, res.status === 429 || res.status === 529 || /credit balance|usage limit/i.test(body));
  }
  const data = await res.json();
  const usage = { model: data.model ?? model, input: data.usage?.input_tokens ?? 0, output: data.usage?.output_tokens ?? 0, stop: data.stop_reason };
  // A refusal (the whole fallback chain declined) or a cut-off reply counts as no answer.
  if (data.stop_reason === "refusal" || data.stop_reason === "max_tokens") return { text: "", usage };
  const text = (data.content ?? []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("");
  return { text, usage };
}
