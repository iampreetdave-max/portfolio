"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Github, Linkedin, Mail, FileText, MapPin,
  Lock, Globe, FileDown, Dot,
} from "lucide-react";
import SiteNav from "@/components/SiteNav";
import Reveal from "@/components/Reveal";
import BackToTop from "@/components/BackToTop";
import AnimatedCounter from "@/components/AnimatedCounter";
import dynamic from "next/dynamic";

const Transistor3D = dynamic(() => import("@/components/Transistor3D"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <span className="font-mono text-[11px] text-faint animate-pulseSoft">initializing…</span>
    </div>
  ),
});

/* ═══════════════════════ DATA ═══════════════════════ */

const TAGLINE = [
  "ISRO climate digital twin",
  "offline predictive policing",
  "agentic legal AI",
  "AI-news aggregation",
];

const STATS = [
  { n: 4084, suffix: "+", label: "live predictions tracked across NBA, soccer, NASCAR" },
  { n: 110,  suffix: "+", label: "AI/ML sources monitored, every 15 min" },
  { n: 5,    suffix: "",  label: "hackathons & competitions built for" },
  { n: 10,   suffix: " mo", label: "at Agility, intern to engineer" },
];

const TECH = [
  "Python", "PyTorch", "TensorFlow", "scikit-learn", "FastAPI", "Next.js", "React",
  "CLIP", "FAISS", "YOLOv8", "TrOCR", "Docker", "Gemini ADK", "Claude API", "MCP",
  "Streamlit", "Supabase", "Azure", "Cloud Run", "RAG",
];

type Featured = {
  title: string; sub: string; category: string; program?: string;
  blurb: string; metrics: string[]; tags: string[];
  live?: string; repo?: string; demo2?: { label: string; url: string }; private?: boolean;
};

const FEATURED: Featured[] = [
  {
    title: "Therma Netra",
    sub: "Digital Twin of India's Climate",
    category: "Climate ML · Digital Twin",
    program: "ISRO BAH 2026 · PS #5",
    blurb:
      "An AI-powered digital twin of India's climate built entirely on national datasets (IMD, INSAT/MOSDAC, IMDAA, CPCB). One continuously-assimilated twin powers climate forecast, urban-heat mitigation, and air-quality apps, with a what-if simulator for cooling strategies.",
    metrics: ["~30% skill over persistence", "3 connected apps", "national datasets only"],
    tags: ["Python", "Streamlit", "xarray", "Pydeck", "Climate ML"],
    private: true,
  },
  {
    title: "CityShield · VisionScan",
    sub: "Unified AI Policing Platform",
    category: "Computer Vision · GovTech",
    program: "KANAD S.H.I.E.L.D. 2026 · Ahmedabad City Police",
    blurb:
      "Fuses physical and cyber crime onto one GIS map, forecasts next-week risk, and closes the loop from a live CCTV anomaly to a dispatched patrol unit, running fully offline on CPU. Adds four-mode CCTV semantic search (CLIP→FAISS, ArcFace, YOLOv8).",
    metrics: ["Hit-Rate@10 0.771 (synthetic)", "77 backend tests", "runs offline on CPU"],
    tags: ["FastAPI", "React", "CLIP", "FAISS", "YOLOv8", "Docker"],
    live: "https://visionscan.centralindia.cloudapp.azure.com",
    repo: "https://github.com/iampreetdave-max/Guardian-Angle",
  },
  {
    title: "Arbiter",
    sub: "Agentic Legal AI",
    category: "Agentic AI · Legal Tech",
    program: "XPRIZE · Build with Gemini 2026",
    blurb:
      "Turns a problem described in plain English or Hindi into a structured, citation-backed legal document. Gemini 2.0 agents (Google ADK) research applicable law in real time via Search grounding, then stream the draft, with no upfront lawyer fees.",
    metrics: ["6 document types", "5 jurisdictions", "Cloud Run (asia-south1)"],
    tags: ["Next.js 14", "FastAPI", "Gemini 2.0", "Agent ADK", "Firebase"],
    repo: "https://github.com/iampreetdave-max/arbiter",
  },
  {
    title: "AI Race News",
    sub: "AI/ML News Aggregation Platform",
    category: "Data Engineering · Backend",
    blurb:
      "A production pipeline that ingests 110+ AI/ML sources every 15 minutes, deduplicates with a three-layer system (URL, content-hash, title-similarity), auto-tags into 12 categories, and serves five audience-specific feeds via a public FastAPI REST API.",
    metrics: ["110+ sources", "every 15 min", "3-layer dedup"],
    tags: ["FastAPI", "APScheduler", "BeautifulSoup", "Docker", "Next.js"],
    live: "https://ai-race-news.pages.dev/",
    repo: "https://github.com/iampreetdave-max/ai-race-news",
  },
  {
    title: "Sports Match-Prediction Engines",
    sub: "Production ML betting-model suite",
    category: "ML · Sports Analytics",
    blurb:
      "A multi-sport ML suite forecasting NBA, soccer, and NASCAR outcomes from engineered pre-match features and live sportsbook odds, with every prediction logged to PostgreSQL and graded against the real settled result. Runs autonomously on daily GitHub Actions workflows with full profit-and-loss tracking.",
    metrics: ["+16.5% ROI · Grade-A NBA picks", "66.3% moneyline win rate (1,064 games)", "4,084+ predictions tracked"],
    tags: ["XGBoost", "LightGBM", "Ridge", "Python", "PostgreSQL", "GitHub Actions"],
    repo: "https://github.com/iampreetdave-max/football-predictions",
  },
  {
    title: "CodeTransform",
    sub: "Python ↔ JavaScript Converter",
    category: "Developer Tools",
    program: "GTU state-level · Project Lead",
    blurb:
      "A web-based code converter between Python and JavaScript built on 122+ tested conversion rules, with automatic source-language detection and color-coded confidence scoring. Zero build tools; a FastAPI backend with a vanilla-JS and Tailwind frontend.",
    metrics: ["122+ rules", "auto-detect", "confidence scoring"],
    tags: ["FastAPI", "Python", "JavaScript", "Tailwind"],
    repo: "https://github.com/iampreetdave-max/code-convertor",
  },
];

const EXPERIENCE = [
  {
    role: "AI/ML Software Engineer",
    company: "Agility",
    period: "Mar 2026 – Present",
    location: "Gujarat, India · On-site",
    active: true,
    bullets: [
      "Develop and deploy machine-learning models in direct collaboration with clients, translating business needs into production features that enhance existing software.",
      "Lead delivery on client ML projects at a fast-moving startup, owning problems from data and modelling through deployment.",
      "Promoted from intern to full-time engineer over a 10-month tenure on the strength of real-world delivery.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Agility",
    period: "Sep 2025 – Mar 2026",
    location: "Gujarat, India · On-site",
    bullets: [
      "Collaborated on ML projects that enhanced client automation processes, engaging directly with clients to deliver tailored solutions.",
      "Assisted in deploying predictive models that improved operational efficiency for client workflows.",
    ],
  },
  {
    role: "Project Lead",
    company: "Gujarat Technological University (GTU)",
    period: "Oct 2023 – Present",
    location: "Gujarat, India",
    bullets: [
      "Lead development of CodeTransform, a Python ↔ JavaScript code converter, from inception to a GTU state-level Design Engineering presentation.",
      "Designed the system architecture while concurrently building the product, and coordinated cross-functional teams to align goals and deliverables.",
    ],
  },
  {
    role: "Student Intern (AI/ML)",
    company: "Stealth AI Startup",
    period: "Jan 2025 – Aug 2025",
    location: "Remote",
    bullets: [
      "Owned ML models and pipelines, applying reinforcement-learning techniques to the product's core logic.",
      "Built an MVP, pitched it to potential business partners, and helped prepare the project for a Y Combinator application.",
    ],
  },
  {
    role: "Team Lead",
    company: "Smart India Hackathon (SIH)",
    period: "Aug 2024 – Dec 2024",
    location: "India · National",
    bullets: [
      "Directed a team building a virtual herbal garden with detailed 3D models, presented at the national level.",
      "Managed team coordination and execution to deliver a working demo under hackathon deadlines.",
    ],
  },
];

const SKILLS = [
  { group: "Languages", items: ["Python", "C / C++", "JavaScript", "TypeScript", "SQL", "HTML / CSS"] },
  { group: "ML & Deep Learning", items: ["scikit-learn", "XGBoost", "LightGBM", "TensorFlow", "PyTorch", "Keras", "pandas", "NumPy", "feature engineering"] },
  { group: "AI / LLM & Agents", items: ["LLMs", "RAG", "Claude API", "Claude Agent SDK", "Model Context Protocol (MCP)", "Google Gemini ADK", "prompt engineering", "FAISS / ChromaDB"] },
  { group: "Computer Vision", items: ["YOLOv8", "CLIP", "TrOCR", "InsightFace / ArcFace", "OCR"] },
  { group: "Backend & Full-stack", items: ["FastAPI", "Next.js", "React", "Node.js", "REST APIs", "Streamlit"] },
  { group: "Data & Infra", items: ["PostgreSQL / Supabase", "Docker", "GitHub Actions / CI", "Azure", "Google Cloud Run", "Netlify", "Hugging Face"] },
  { group: "Automation", items: ["Make.com", "n8n", "Zapier", "GoHighLevel", "webhooks & API integrations"] },
];

const WRITING = [
  { type: "Research paper", title: "Engineers Fear AI, As Mathematicians Once Feared Calculators", note: "Authored", url: "https://www.linkedin.com/in/preet-dave-452023271/" },
  { type: "Article", title: "Zipf's Law for LLMs", note: "LinkedIn", url: "https://www.linkedin.com/posts/iampreetdave_ai-machinelearning-zipfslaw-ugcPost-7358579994941448193-dETg/" },
  { type: "Article", title: "How GPS Works", note: "LinkedIn", url: "https://www.linkedin.com/posts/iampreetdave_did-you-know-your-phones-gps-finds-you-share-7367498895888732160-unkR/" },
];

/* ═══════════════════════ HELPERS ═══════════════════════ */

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <p className="kicker mb-3">{kicker}</p>
      <h2 className="font-display text-3xl md:text-[40px] font-bold tracking-tight leading-tight">{title}</h2>
      {sub && <p className="mt-3 text-muted text-[15px] max-w-2xl leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

/* ═══════════════════════ PAGE ═══════════════════════ */

export default function Home() {
  return (
    <div className="relative z-10">
      <SiteNav />

      {/* ===== HERO ===== */}
      <section className="relative mx-auto max-w-6xl px-5 sm:px-6 pt-32 md:pt-40 pb-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-muted">Open to AI / ML engineering roles</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-[clamp(2.6rem,7vw,4.5rem)] font-bold leading-[1.02] tracking-tight"
            >
              I build ML systems<br />
              that <span className="text-gradient">actually ship.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-[16px] md:text-[17px] text-muted leading-relaxed max-w-xl"
            >
              I&apos;m Preet Dave, an AI/ML engineer based in Ahmedabad. I build applied
              machine-learning and agentic-AI systems: a national-dataset climate twin,
              offline computer vision, and LLM-driven automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Link href="/#work" className="btn-primary">View projects <ArrowRight size={16} /></Link>
              <a href="/resume.pdf" download="Preet-Dave-Resume.pdf" className="btn-ghost"><FileDown size={16} /> Download résumé</a>
              <Link href="/#contact" className="btn-ghost"><Mail size={16} /> Contact</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 text-[13px] text-faint"
            >
              {TAGLINE.map((t, i) => (
                <span key={t} className="inline-flex items-center">
                  {i > 0 && <Dot size={16} className="text-line-strong" />}
                  <span className="hover:text-muted transition-colors">{t}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* 3D transistor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.11), transparent 68%)" }}
            />
            <div className="relative h-[360px] sm:h-[440px] lg:h-[560px] w-full">
              <Transistor3D />
            </div>
            <p className="text-center font-mono text-[11px] text-faint tracking-wide">
              the transistor · from silicon to systems
            </p>
          </motion.div>
        </div>

        {/* Tech marquee */}
        <div className="mt-16 marquee-mask overflow-hidden">
          <div className="flex w-max gap-3 animate-marquee">
            {[...TECH, ...TECH].map((t, i) => (
              <span key={i} className="chip shrink-0">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="card p-5 h-full">
                <div className="font-display text-[34px] md:text-[40px] font-bold tracking-tight text-paper">
                  <AnimatedCounter target={s.n} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[12.5px] text-muted leading-snug">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 scroll-mt-20">
        <SectionHead
          kicker="Selected work"
          title="Systems I've designed and shipped"
          sub="Each one is real and running. Numbers are stated honestly; where a metric comes from synthetic or demo data, it says so."
        />
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {FEATURED.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <article className="card h-full p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center font-mono text-[11px] px-2.5 py-1 rounded-md border border-accent/30 text-accent bg-accent/[0.08]">
                    {p.category}
                  </span>
                  {p.private && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-faint"><Lock size={11} /> Private</span>
                  )}
                </div>

                <h3 className="font-display text-[20px] font-bold mt-4 tracking-tight">{p.title}</h3>
                <p className="text-[13px] text-accent-soft/90 font-medium">{p.sub}</p>
                {p.program && <p className="mt-1 font-mono text-[11px] text-faint">{p.program}</p>}

                <p className="mt-4 text-[14px] text-muted leading-relaxed flex-grow">{p.blurb}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.metrics.map((m) => (
                    <span key={m} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-2.5 py-1 text-[11px] text-muted">
                      <span className="w-1 h-1 rounded-full bg-accent" /> {m}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-line text-faint">{t}</span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center gap-4">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-paper hover:text-accent transition-colors">
                      <Globe size={14} /> Live demo <ArrowUpRight size={13} />
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-paper transition-colors">
                      <Github size={14} /> Code
                    </a>
                  )}
                  {p.private && !p.repo && (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-faint font-mono">Code available on request</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Link href="/projects" className="btn-ghost">
              View all projects &amp; automations <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 scroll-mt-20">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12">
          <div>
            <SectionHead kicker="About" title="Applied research that has to run in production" />
            <div className="mt-6 space-y-4 text-[15.5px] text-muted leading-relaxed max-w-2xl">
              <p>
                I work full-time at a Gujarat startup, building machine-learning models in direct
                collaboration with clients, translating real operational needs into working software.
                I started there as an intern and moved into the full-time engineering role over roughly
                ten months of hands-on delivery.
              </p>
              <p>
                Most of what I build sits at the intersection of ML and systems engineering: digital
                twins on national climate datasets, computer-vision pipelines that run offline on CPU,
                RAG and agentic workflows over LLMs, and production data pipelines. I care less about
                chasing a single benchmark number and more about architecture, deployment, and whether
                the system holds up when a real user touches it.
              </p>
              <p>
                Alongside that I lead a GTU state-level project, write about how engineers actually work
                with AI, and keep building across the Claude API, MCP, agent SDKs, and the wider Python
                ML stack.
              </p>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="relative h-60 w-full">
                <Image
                  src="https://raw.githubusercontent.com/iampreetdave-max/portfolio/main/images/profile%20picture.jpeg"
                  alt="Preet Dave"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "62% 38%" }}
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/10 to-transparent" />
              </div>
              <div className="p-6">
                <p className="kicker mb-4">Currently</p>
                <ul className="space-y-4 text-[14px]">
                  <li className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-muted"><span className="text-paper font-medium">AI/ML Software Engineer</span> at Agility, Ahmedabad.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-muted">Final-year <span className="text-paper font-medium">B.Tech CSE (AI &amp; ML)</span>, NLJIET, GTU.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-muted">Building for <span className="text-paper font-medium">ISRO BAH</span> &amp; <span className="text-paper font-medium">KANAD S.H.I.E.L.D.</span> hackathons.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-muted">Certified across the <span className="text-paper font-medium">Claude API, MCP &amp; Agent Skills</span> (Anthropic).</span>
                  </li>
                </ul>
                <div className="mt-5 pt-5 border-t border-line flex items-center gap-2 text-[13px] text-muted">
                  <MapPin size={14} className="text-accent" /> Ahmedabad, Gujarat, India
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 scroll-mt-20">
        <SectionHead kicker="Experience" title="Where I've worked" />
        <div className="mt-10 max-w-3xl">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={`${e.company}-${e.role}`} delay={i * 0.04}>
              <div className="relative pl-7 pb-9 border-l border-line last:border-l-transparent last:pb-0">
                <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${e.active ? "bg-accent" : "bg-line-strong"}`} />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-[17px] font-semibold text-paper">{e.role}</h3>
                  {e.active && <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-accent/30 text-accent bg-accent/[0.08]">CURRENT</span>}
                </div>
                <div className="mt-0.5 text-[14px] text-accent-soft">{e.company}</div>
                <div className="mt-0.5 font-mono text-[11px] text-faint">{e.period} · {e.location}</div>
                <ul className="mt-3 space-y-2">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-[14px] text-muted leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-line-strong shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 scroll-mt-20">
        <SectionHead kicker="Toolkit" title="What I build with" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={(i % 3) * 0.05}>
              <div className="card p-5 h-full">
                <h3 className="font-mono text-[12px] tracking-wider uppercase text-accent mb-3">{s.group}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span key={it} className="chip">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== WRITING ===== */}
      <section id="writing" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 scroll-mt-20">
        <SectionHead kicker="Writing" title="Research &amp; notes" sub="A research paper and short technical essays on how AI actually works and how engineers work with it." />
        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {WRITING.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="card group p-5 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-accent">{w.type}</span>
                  <ArrowUpRight size={15} className="text-faint group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display text-[16px] font-semibold mt-3 leading-snug flex-grow">{w.title}</h3>
                <span className="mt-4 font-mono text-[11px] text-faint">{w.note}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="mx-auto max-w-6xl px-5 sm:px-6 py-20 scroll-mt-20">
        <Reveal>
          <div className="card p-8 md:p-12 text-center relative overflow-hidden">
            <p className="kicker mb-4">Contact</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Let&apos;s build something <span className="text-gradient">intelligent.</span>
            </h2>
            <p className="mt-4 text-muted text-[15px] max-w-xl mx-auto leading-relaxed">
              I&apos;m open to AI/ML engineering roles and interesting applied-AI problems.
              The fastest way to reach me is email.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:iampreetdave@gmail.com" className="btn-primary"><Mail size={16} /> iampreetdave@gmail.com</a>
              <a href="/resume.pdf" download="Preet-Dave-Resume.pdf" className="btn-ghost"><FileText size={16} /> Download résumé</a>
              <a href="/cv.pdf" download="Preet-Dave-CV.pdf" className="btn-ghost"><FileText size={16} /> Download CV</a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a href="https://github.com/iampreetdave-max" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid place-items-center w-10 h-10 rounded-lg border border-line text-muted hover:text-paper hover:border-line-strong transition-colors"><Github size={17} /></a>
              <a href="https://www.linkedin.com/in/preet-dave-452023271/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid place-items-center w-10 h-10 rounded-lg border border-line text-muted hover:text-paper hover:border-line-strong transition-colors"><Linkedin size={17} /></a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-line mt-10">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-faint tracking-wider">© 2026 Preet Ghanshyam Dave · Ahmedabad, India</p>
          <div className="flex items-center gap-5 font-mono text-[11px] text-faint">
            <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
            <Link href="/fun" className="hover:text-accent transition-colors">Fun Zone</Link>
            <a href="https://github.com/iampreetdave-max" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            <span className="text-line-strong">Next.js · Tailwind</span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
