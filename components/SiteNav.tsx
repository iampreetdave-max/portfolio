"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, FileText, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/[0.12] border border-accent/30 font-mono text-sm font-bold text-accent">
            PD
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-paper">Preet Dave</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] text-muted hover:text-paper transition-colors link-underline">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/iampreetdave-max"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid place-items-center w-9 h-9 rounded-lg border border-line text-muted hover:text-paper hover:border-line-strong transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/preet-dave-452023271/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid place-items-center w-9 h-9 rounded-lg border border-line text-muted hover:text-paper hover:border-line-strong transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="/resume.pdf"
            download="Preet-Dave-Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-accent text-ink text-[13px] font-semibold hover:bg-accent-soft transition-colors"
          >
            <FileText size={15} /> Résumé
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden grid place-items-center w-9 h-9 rounded-lg border border-line text-muted hover:text-paper transition-colors"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-ink/95 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] text-muted hover:text-paper transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              download="Preet-Dave-Resume.pdf"
              className="mt-2 inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-accent text-ink text-[14px] font-semibold w-fit"
            >
              <FileText size={15} /> Download Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
