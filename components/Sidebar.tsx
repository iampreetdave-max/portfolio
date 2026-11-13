"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
];

const SOCIAL = [
  { href: "https://github.com/iampreetdave-max", label: "GitHub", external: true },
  { href: "https://www.linkedin.com/in/preet-dave-452023271/", label: "LinkedIn", external: true },
  { href: "mailto:iampreetdave@gmail.com", label: "Email", external: true },
  { href: "/resume.pdf", label: "Résumé", external: true },
  { href: "/cv.pdf", label: "CV", external: true },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") setTheme(current);
    else setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="sidebar">
      <nav className="nav-list">
        {NAV.map((l) => (
          <Link key={l.href} href={l.href} className={path === l.href ? "active" : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="nav-label">Contact</div>
      <div className="nav-social">
        {SOCIAL.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {l.label}
          </a>
        ))}
      </div>

      <ThemeToggle />
    </aside>
  );
}
