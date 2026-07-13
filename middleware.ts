import { NextRequest, NextResponse } from "next/server";

/**
 * Security headers.
 *
 * These are set here rather than only in public/_headers because the HTML is
 * served by the next-on-pages worker (note `x-matched-path` / `cf-cache-status:
 * DYNAMIC` on responses), and Cloudflare's _headers file applies to statically
 * served assets. Middleware runs on every page request, so it is the reliable
 * place. public/_headers still covers the static assets that skip middleware.
 *
 * CSP note: Next.js App Router inlines its hydration/RSC scripts and next/font
 * inlines styles, so script-src/style-src need 'unsafe-inline'. A nonce-based CSP
 * would force every page to render dynamically and lose static prerendering.
 * Everything else is locked down to 'self'.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy": CSP,
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Permitted-Cross-Domain-Policies": "none",
};

function secure(res: NextResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(key, value);
  }
  // Cloudflare Pages serves assets with a wildcard CORS policy by default.
  // This site does not need to be read cross-origin.
  res.headers.delete("access-control-allow-origin");
  return res;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const session = req.cookies.get("admin_session");

    if (session?.value !== "1") {
      const loginUrl = new URL("/admin/login", req.url);
      return secure(NextResponse.redirect(loginUrl));
    }
  }

  return secure(NextResponse.next());
}

export const config = {
  // Every route except Next's own static output and static files, which are
  // served straight from the CDN and covered by public/_headers instead.
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|pdf|webmanifest)$).*)",
  ],
};
