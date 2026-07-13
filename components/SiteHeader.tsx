"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle light or dark theme">
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}

export default function SiteHeader() {
  const path = usePathname();
  // /fun is a self-contained dark arcade with its own nav; /admin is a private tool.
  if (path?.startsWith("/fun") || path?.startsWith("/admin")) return null;

  return (
    <header className="site-header">
      <div className="wrap site-header-in">
        <Link href="/" className="site-name">Preet Dave</Link>
        <nav className="site-nav">
          <Link href="/projects">Projects</Link>
          <a href="/resume.pdf" download>Résumé</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
