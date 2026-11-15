import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/admin-auth";

// Security headers for every page and API response. They live here, not in public/_headers,
// because the HTML is served by the next-on-pages worker (CLAUDE.md gotcha #2).
// 'unsafe-inline' stays for scripts and styles: Next inlines hydration scripts and next/font
// inlines styles, and a nonce CSP would end static prerendering (gotcha #5).
// The only third-party code the browser loads is Cloudflare Turnstile (Ask box, when enabled);
// Anthropic and the data catalogs are called server-side, so they need no entry here.
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const HEADERS: Record<string, string> = {
  "Content-Security-Policy": CSP,
  "Strict-Transport-Security": "max-age=31536000",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/dashboard routes (the cookie is HMAC-signed, see lib/admin-auth.ts)
  if (pathname.startsWith("/admin/dashboard")) {
    if (!(await isValidSession(req.cookies.get(ADMIN_COOKIE)?.value))) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const res = NextResponse.next();
  for (const [k, v] of Object.entries(HEADERS)) res.headers.set(k, v);
  return res;
}

export const config = {
  // Everything except build assets and files with an extension (icons, PDFs, images).
  matcher: ["/((?!_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};
