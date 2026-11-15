// Admin session cookie: "<expiry ms>.<HMAC-SHA256 of the expiry, keyed with ADMIN_PASSWORD>".
// It used to be the literal "1", which anyone could set by hand to reach the admin API.
// Web Crypto only, so it runs on the edge (middleware and routes). Changing ADMIN_PASSWORD
// logs every session out.
export const ADMIN_COOKIE = "admin_session";
export const SESSION_SECONDS = 60 * 60 * 12;

const enc = new TextEncoder();

async function sign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(mac), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function newSession(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not set");
  const exp = String(Date.now() + SESSION_SECONDS * 1000);
  return `${exp}.${await sign(exp, secret)}`;
}

export async function isValidSession(value: string | undefined): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !value) return false;
  const [exp, mac] = value.split(".");
  if (!exp || !mac || !(Number(exp) > Date.now())) return false;
  const want = await sign(exp, secret);
  if (want.length !== mac.length) return false;
  let diff = 0; // constant-time compare
  for (let i = 0; i < want.length; i++) diff |= want.charCodeAt(i) ^ mac.charCodeAt(i);
  return diff === 0;
}
