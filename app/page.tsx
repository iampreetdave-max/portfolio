"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import TypewriterText from "@/components/TypewriterText";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/components/ProjectCard";
import {
  Brain, Eye, Cpu, Code2, Github, Linkedin, Mail, Phone,
  Send, MapPin, Calendar, ArrowRight, Award, BookOpen,
  FileText, PenTool, ChevronDown,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Enterprise Sports Analytics Platform",
    category: "Full-Stack / ML Engineering",
    description:
      "Production-grade sports analytics platform with custom ML prediction models, live data pipelines, and real-time game tracking across 7+ professional sports leagues.",
    longDescription:
      "I architected and delivered a comprehensive real-time sports analytics platform for a leading betting company, covering NBA, NCAAB, MLB, NHL, Soccer, F1, and UFC. This project is the umbrella for all the individual prediction models and scrapers I built:\n\n\u2022 Football Prediction System \u2014 Ridge Regression with 21+ features, automated daily pipeline, Streamlit dashboard (7 GitHub stars)\n\u2022 CTMCL Predictions \u2014 Novel consensus goals line method with Random Forest, 6 Premier League seasons\n\u2022 Goal Prediction Model \u2014 6-algorithm regression benchmark for match outcome forecasting\n\u2022 NBA Prediction Model \u2014 Pre-match feature engineering, odds integration, ML predictions with validation\n\u2022 NBA Analytics & Odds Scraper \u2014 Full data pipeline: odds scraping, database building, ensemble models\n\u2022 Multi-Sport Scraper Suite \u2014 Custom scrapers for NHL, MLB, and NCAAB with dashboards and validation\n\nThe full stack spans Go REST APIs, React frontends, Azure VM infrastructure, Docker containers, Redis caching, and PostgreSQL databases. If you need someone who can own the entire pipeline from data ingestion and ML model design through production deployment and infrastructure management, this project demonstrates exactly that capability at enterprise scale.",
    tech_tags: ["Go", "React", "Ridge Regression", "Random Forest", "Azure", "Docker", "Redis", "PostgreSQL", "GitHub Actions", "Streamlit"],
  },
  {
    id: "2",
    title: "TalkToNotes",
    category: "Computer Vision / NLP",
    description:
      "Intelligent OCR system that converts handwritten notes into searchable, queryable knowledge bases using TrOCR transformers and neural embeddings.",
    longDescription:
      "I developed an intelligent document processing pipeline that transforms handwritten notes into structured, searchable knowledge bases. Using the TrOCR transformer for high-accuracy optical character recognition, neural embeddings for semantic understanding, and a chatbot interface for natural language querying. If you need someone who understands computer vision pipelines, transformer architectures, and NLP systems \u2014 and can turn them into products real users interact with \u2014 this is the kind of end-to-end AI engineering I specialize in.",
    tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search", "Python"],
    repo_url: "https://github.com/iampreetdave/TalkNotes",
  },
  {
    id: "3",
    title: "StudBud",
    category: "Web / Full-Stack",
    description:
      "Full-stack academic management platform with ML-powered study recommendations and adaptive scheduling algorithms.",
    longDescription:
      "I designed and built a full-stack student management platform that uses machine learning to provide personalized study recommendations and adaptive scheduling. Built with TypeScript for type-safe, maintainable code. This demonstrates my ability to combine solid web engineering with practical AI features \u2014 the same approach I bring to any product that needs intelligent capabilities in a polished user experience.",
    tech_tags: ["TypeScript", "Full-Stack", "Machine Learning", "Data Analysis"],
    repo_url: "https://github.com/iampreetdave/STUDBUD",
  },
  {
    id: "4",
    title: "Find Ranks",
    category: "Web / Streamlit",
    description:
      "Analytics tool that automates mark extraction from PDF mark sheets, calculates cumulative performance, and generates institutional rankings.",
    longDescription:
      "I built a practical data processing tool that automates the entire workflow of extracting marks from multiple PDF mark sheets, calculating cumulative student performance, and generating ranked analytics. The Streamlit-based interface makes it immediately accessible to non-technical staff. If you have manual, data-heavy workflows that need to be streamlined, this is exactly the kind of solution I deliver.",
    tech_tags: ["Streamlit", "PDF Processing", "Python", "Data Analytics"],
    repo_url: "https://github.com/iampreetdave-max/Find-Ranks",
  },
];

const skills = [
  { title: "Deep Learning & Neural Networks", Icon: Brain, items: ["TensorFlow", "PyTorch", "Keras", "CNNs", "Transformers", "Neural Network Optimization"] },
  { title: "Computer Vision & NLP", Icon: Eye, items: ["TrOCR", "Image Processing", "NLP", "Vector Embeddings & Search"] },
  { title: "Machine Learning", Icon: Cpu, items: ["Scikit-Learn", "Pandas", "NumPy", "Regression & Classification", "Feature Engineering"] },
  { title: "Development & Deployment", Icon: Code2, items: ["Python (Advanced)", "C++", "JavaScript", "Full-Stack", "API Development", "ML Pipeline Automation"] },
];

const experience = [
  {
    role: "Trainee Software Engineer",
    period: "Sep 2025 \u2013 Present",
    company: "Agility Innovations Pvt. Ltd., Ahmedabad",
    description: "Building AI-powered product pipelines, deploying ML solutions in production environments, full-stack development with neural network integration.",
    active: true,
  },
  {
    role: "Machine Learning Intern",
    period: "2025",
    company: "Oasis Infobyte, Remote",
    description: "Developed ML projects across neural network architectures, built end-to-end ML pipelines from data ingestion to deployment.",
    active: false,
  },
  {
    role: "AI Research Lead",
    period: "2024 \u2013 2025",
    company: "Smart India Hackathon & Rotaract Club Hackathon",
    description: "Led AI research teams in computer vision and TrOCR systems. Designed architectures for real-world document processing challenges.",
    active: false,
  },
];

const certifications = [
  { title: "C, C++, C Advanced", detail: "Foundational programming courses completed in 2023", icon: Code2 },
  { title: "Python (4-Phase Mastery)", detail: "Ranked 1st in the last three phases of the Python course series", icon: Award },
  { title: "Machine Learning with Python", detail: "Comprehensive ML course covering algorithms, pipelines, and deployment", icon: Cpu },
  { title: "ML Engineering by Saikat Dutta", detail: "Currently studying advanced ML engineering practices and system design", icon: Brain },
  { title: "Natural Language Processing", detail: "Dedicated NLP course covering text processing, embeddings, and language models", icon: BookOpen },
];

const stats = [
  { value: "14+", label: "Projects" },
  { value: "8+",  label: "Automations" },
  { value: "2",   label: "Internships" },
  { value: "1",   label: "Hackathon Won" },
];

const sectionIds = ["home", "about", "skills", "projects", "experience", "certifications", "contact"];
const navItems   = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

// ── Custom Cursor ─────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let shown = false;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 2.5}px, ${my - 2.5}px)`;
      if (!shown) { shown = true; setVisible(true); }
    };

    const tick = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.transform = `translate(${rx - 15}px, ${ry - 15}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [role='button'], input, textarea");
      setHovering(!!el);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: visible ? 1 : 0 }} />
      <div ref={ringRef} className={`cursor-ring${hovering ? " hovering" : ""}`} style={{ opacity: visible ? 1 : 0 }} />
    </>
  );
}

// ── Mouse Spotlight ───────────────────────────────────────────────────────────

function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(0,255,65,0.028), transparent 40%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="fixed inset-0 pointer-events-none z-[1]" />;
}

// ── Scroll Progress ───────────────────────────────────────────────────────────

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#00FF41] to-[#00D4FF]"
        style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
      />
    </div>
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/50 to-transparent" />
      <span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">{text}</span>
    </div>
  );
}

// ── GlassCard ─────────────────────────────────────────────────────────────────

function GlassCard({ children, className = "", hover = true }: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`
        bg-white/[0.025] backdrop-blur-xl rounded-xl border border-white/[0.07]
        ${hover ? "hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-[0_0_40px_rgba(0,255,65,0.04)] transition-all duration-500" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen,        setMenuOpen]        = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [activeSection,   setActiveSection]   = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", key); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveSection(id); } },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <CustomCursor />
      <MouseSpotlight />
      <ScrollProgress />

      {/* Texture overlays */}
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines"     aria-hidden="true" />

      <NeuralNetwork paused={false} />

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background:          scrolled ? "rgba(5,5,5,0.92)" : "transparent",
          borderBottom:        scrolled ? "1px solid rgba(0,255,65,0.06)" : "1px solid transparent",
          backdropFilter:      scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter:scrolled ? "blur(24px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-1 font-mono text-sm font-black tracking-tight">
            <span className="text-white group-hover:text-[#00FF41] transition-colors duration-300">PD</span>
            <span className="text-[#00FF41]/60 animate-pulse">_</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                  activeSection === item.toLowerCase() ? "active text-[#00FF41]" : "text-gray-600 hover:text-gray-300"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-sm border border-white/10 w-10 h-10 flex items-center justify-center hover:border-[#00FF41]/30 hover:text-[#00FF41] transition-all duration-300 rounded-lg"
            aria-label="Toggle menu"
          >
            {menuOpen ? "\u00d7" : "\u2261"}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/[0.05] bg-[#050505]/98 backdrop-blur-3xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`font-mono text-sm tracking-wider transition-colors ${
                      activeSection === item.toLowerCase() ? "text-[#00FF41]" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section id="home" className="min-h-[100dvh] flex items-center justify-center px-6 pt-16 relative overflow-hidden">
          {/* Ambient orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00FF41]/[0.022] blur-[130px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#00D4FF]/[0.016] blur-[100px] pointer-events-none" />

          <div className="max-w-5xl w-full relative">
            {/* Status badge */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#00FF41]/70 border border-[#00FF41]/20 bg-[#00FF41]/[0.05] px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                Available for AI / ML Roles
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-8"
            >
              <h1
                className="font-black leading-[0.88] tracking-[-0.04em]"
                style={{ fontSize: "clamp(72px, 11vw, 120px)" }}
              >
                <span className="hero-name glitch-wrapper" data-text="Preet">Preet</span>
                <br />
                <span style={{ color: "rgba(255,255,255,0.15)", WebkitTextFillColor: "rgba(255,255,255,0.15)" }}>
                  Dave
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="mb-8 h-8">
              <TypewriterText />
            </motion.div>

            {/* Tagline */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="mb-10 max-w-xl">
              <p className="text-gray-400 text-[15px] leading-[1.85]">
                Building intelligent systems with deep learning, computer vision, and advanced ML algorithms.
                B.Tech CS (AI-ML) student &middot; Trainee SWE at Agility Innovations.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="flex flex-wrap gap-3 items-center">
              <a
                href="#contact"
                className="group font-mono text-[11px] tracking-[0.15em] border border-[#00FF41]/60 text-[#00FF41] px-7 py-3.5 hover:bg-[#00FF41] hover:text-black transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                Contact Me
                <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/iampreetdave-max"
                target="_blank" rel="noopener noreferrer"
                className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.08] px-7 py-3.5 text-gray-500 hover:border-white/20 hover:text-white transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                <Github size={13} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/preet-dave-452023271/"
                target="_blank" rel="noopener noreferrer"
                className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.08] px-7 py-3.5 text-gray-500 hover:border-white/20 hover:text-white transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-gray-700 uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={16} className="text-gray-700" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section id="about" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="About" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Who I Am</motion.h2>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Bio — spans 2 cols */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <GlassCard className="p-8 h-full" hover={false}>
                  <p className="text-gray-300 leading-[1.9] text-[15px] mb-5">
                    I&apos;m an AI-ML Engineer passionate about building intelligent systems that solve real-world problems. With expertise in deep learning, computer vision, and NLP, I develop end-to-end ML pipelines &mdash; from data preprocessing and feature engineering to model deployment and optimization.
                  </p>
                  <p className="text-gray-500 leading-[1.9] text-[14px] mb-7">
                    Currently pursuing B.Tech in Computer Science (AI-ML) while gaining hands-on industry experience as a Trainee Software Engineer, bridging cutting-edge research with production-ready solutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Deep Learning", "Computer Vision", "NLP", "MLOps", "Full-Stack"].map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-[#00FF41]/15 text-[#00FF41]/70 bg-[#00FF41]/[0.04]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Photo — spans 2 rows */}
              <motion.div variants={fadeUp} className="md:row-span-2">
                <GlassCard className="p-5 h-full flex flex-col" hover={false}>
                  <div className="relative flex-1 min-h-[220px] rounded-lg overflow-hidden mb-4">
                    <Image
                      src="https://raw.githubusercontent.com/iampreetdave-max/portfolio/main/images/profile%20picture.jpeg"
                      alt="Preet Dave"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 to-transparent" />
                  </div>
                  <div className="space-y-2 px-1">
                    <div className="font-bold text-sm text-white">Preet Dave</div>
                    <div className="font-mono text-[11px] text-[#00FF41]/70 tracking-wider">AI-ML Engineer</div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-600">
                      <MapPin size={11} /> Ahmedabad, India
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00FF41]/60 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse flex-shrink-0" />
                      Open to opportunities
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Stats — spans 2 cols */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <div className="grid grid-cols-4 gap-3">
                  {stats.map((s) => (
                    <GlassCard key={s.label} className="p-4 text-center">
                      <div className="font-mono text-2xl font-black text-[#00FF41] leading-none mb-2">{s.value}</div>
                      <div className="font-mono text-[9px] text-gray-600 tracking-[0.12em] uppercase leading-tight">{s.label}</div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────────────── */}
        <section id="skills" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Skills" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Technical Expertise</motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <motion.div key={cat.title} variants={fadeUp}>
                  <GlassCard className="p-7 group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0 group-hover:bg-[#00FF41]/[0.13] group-hover:border-[#00FF41]/[0.28] transition-all duration-500">
                        <cat.Icon size={20} className="text-[#00FF41]/60 group-hover:text-[#00FF41] transition-colors duration-500" />
                      </div>
                      <h3 className="font-mono text-[13px] font-bold text-white tracking-wide">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[11px] px-3 py-1.5 border border-white/[0.06] text-gray-500 rounded-lg group-hover:border-white/[0.14] group-hover:text-gray-300 transition-all duration-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────── */}
        <section id="projects" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Projects" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Featured Work</motion.h2>

            <div className="space-y-3">
              {featuredProjects.map((p, i) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <div
                    className="group relative border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 md:p-8 hover:border-white/[0.12] hover:bg-white/[0.035] transition-all duration-500 overflow-hidden"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedProject(p)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedProject(p); }}
                  >
                    {/* Left glow accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-xl bg-gradient-to-b from-transparent via-[#00FF41]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Ghost number */}
                    <div className="project-num absolute right-5 top-1/2 -translate-y-1/2 text-[90px] leading-none hidden md:block">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="relative md:pr-28">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-[#00FF41]/60 border border-[#00FF41]/15 bg-[#00FF41]/[0.05] px-3 py-1 rounded-full uppercase">
                          {p.category}
                        </span>
                        <span className="font-mono text-[10px] text-gray-700">#{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="text-[17px] font-bold mb-2 group-hover:text-white transition-colors">{p.title}</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed mb-4 max-w-2xl">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech_tags.slice(0, 5).map((tag) => (
                          <span key={tag} className="font-mono text-[10px] px-2.5 py-1 border border-white/[0.06] text-gray-600 rounded-md group-hover:text-gray-400 transition-colors duration-300">
                            {tag}
                          </span>
                        ))}
                        {p.tech_tags.length > 5 && (
                          <span className="font-mono text-[10px] px-2.5 py-1 text-gray-700">+{p.tech_tags.length - 5}</span>
                        )}
                      </div>
                    </div>

                    <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                      <ArrowRight size={15} className="text-[#00FF41]/60" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8 text-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] border border-white/[0.08] px-8 py-3.5 text-gray-500 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition-all duration-300 rounded-xl uppercase"
              >
                View All Projects
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────────── */}
        <section id="experience" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Experience" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Work History</motion.h2>

            <div className="relative">
              <div className="absolute left-[6px] top-4 bottom-16 w-px bg-gradient-to-b from-[#00FF41]/25 via-white/[0.05] to-transparent hidden sm:block" />
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <motion.div key={i} variants={fadeUp} className="relative sm:pl-12">
                    {/* Dot */}
                    <div
                      className={`absolute left-0 top-6 w-3 h-3 rounded-full border-2 transition-all duration-500 hidden sm:block ${
                        exp.active
                          ? "bg-[#00FF41] border-[#00FF41] shadow-[0_0_16px_rgba(0,255,65,0.6)]"
                          : "bg-[#050505] border-white/20"
                      }`}
                    />
                    {exp.active && (
                      <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-[#00FF41] animate-ping opacity-25 hidden sm:block" />
                    )}
                    <GlassCard className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-mono text-[11px] text-gray-600 flex items-center gap-1.5">
                          <Calendar size={11} />{exp.period}
                        </span>
                        {exp.active && (
                          <span className="font-mono text-[9px] tracking-[0.2em] text-[#00FF41]/70 border border-[#00FF41]/20 bg-[#00FF41]/[0.05] px-2.5 py-0.5 rounded-full uppercase">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-[17px] font-bold mb-1">{exp.role}</h3>
                      <div className="font-mono text-[11px] text-gray-500 mb-3 flex items-center gap-1.5">
                        <MapPin size={11} />{exp.company}
                      </div>
                      <p className="text-gray-400 text-[13px] leading-relaxed">{exp.description}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── CERTIFICATIONS ────────────────────────────────────────────── */}
        <section id="certifications" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Certifications" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Certificates &amp; Learnings</motion.h2>

            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
              {certifications.map((cert) => (
                <motion.div key={cert.title} variants={fadeUp}>
                  <GlassCard className="p-6 group h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0 group-hover:bg-[#00FF41]/[0.14] group-hover:border-[#00FF41]/[0.28] transition-all duration-300">
                        <cert.icon size={15} className="text-[#00FF41]/60 group-hover:text-[#00FF41] transition-colors duration-300" />
                      </div>
                      <h3 className="font-mono text-[12px] font-bold text-white tracking-wide leading-snug">{cert.title}</h3>
                    </div>
                    <p className="text-gray-500 text-[12px] leading-relaxed">{cert.detail}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Publications */}
            <motion.div variants={fadeUp}><SectionLabel text="Publications" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Research &amp; Writing</motion.h2>

            <motion.div variants={stagger} className="space-y-4">
              <motion.div variants={fadeUp}>
                <GlassCard className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0">
                      <FileText size={17} className="text-[#00FF41]/60" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#00FF41]/60 tracking-[0.2em] uppercase mb-2">Research Paper</div>
                      <h3 className="font-bold text-[15px] mb-2">&ldquo;Engineers Fear AI, As Mathematicians Once Feared Calculators&rdquo;</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed">A perspective on how engineering professionals can embrace AI as a tool for amplification rather than replacement, drawing historical parallels with the adoption of calculators in mathematics.</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp}>
                <GlassCard className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0">
                      <PenTool size={17} className="text-[#00FF41]/60" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#00FF41]/60 tracking-[0.2em] uppercase mb-2">LinkedIn Research Blogs</div>
                      <h3 className="font-bold text-[15px] mb-2">Technical Deep-Dives</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed mb-4">
                        Published deep-dives including <span className="text-gray-300">How GPS Works</span>, <span className="text-gray-300">Zipf&apos;s Law for LLMs</span>, and other explorations at the intersection of math, physics, and AI.
                      </p>
                      <a
                        href="https://www.linkedin.com/in/preet-dave-452023271/"
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#00FF41]/60 hover:text-[#00FF41] transition-colors"
                      >
                        <Linkedin size={12} /> Follow on LinkedIn
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────────── */}
        <section id="contact" className="py-28 px-6 relative overflow-hidden">
          {/* Ghost text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span
              className="font-black text-white/[0.016] tracking-tighter leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(80px, 18vw, 200px)" }}
            >
              HELLO
            </span>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto relative">
            <motion.div variants={fadeUp}><SectionLabel text="Contact" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-4 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Get In Touch</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-[15px] mb-12 max-w-md">
              Open to AI/ML engineering roles, research collaborations, and interesting projects.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Links */}
              <motion.div variants={fadeUp}>
                <div className="space-y-3">
                  {[
                    { Icon: Mail,     label: "Email",    href: "mailto:iampreetdave@gmail.com",                     text: "iampreetdave@gmail.com" },
                    { Icon: Phone,    label: "Phone",    href: "tel:+919081025277",                                 text: "+91 90810 25277" },
                    { Icon: Github,   label: "GitHub",   href: "https://github.com/iampreetdave-max",               text: "iampreetdave-max" },
                    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/preet-dave-452023271/", text: "preet-dave" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 text-gray-500 hover:text-white transition-all duration-300"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.025] border border-white/[0.07] shrink-0 group-hover:border-[#00FF41]/25 group-hover:bg-[#00FF41]/[0.06] transition-all duration-300">
                        <link.Icon size={16} className="group-hover:text-[#00FF41] transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-gray-700 tracking-[0.15em] uppercase mb-0.5">{link.label}</div>
                        <div className="text-sm">{link.text}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Form */}
              <motion.div variants={fadeUp}>
                <form name="contact" method="POST" data-netlify="true" action="/success" className="space-y-5">
                  <input type="hidden" name="form-name" value="contact" />
                  {[
                    { label: "Name",  type: "text",  name: "name",  placeholder: "Your name" },
                    { label: "Email", type: "email", name: "email", placeholder: "your@email.com" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        required
                        placeholder={f.placeholder}
                        className="w-full bg-white/[0.025] border border-white/[0.07] p-4 text-white text-sm rounded-xl transition-all duration-300 placeholder-gray-800"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="What&apos;s on your mind?"
                      className="w-full bg-white/[0.025] border border-white/[0.07] p-4 text-white text-sm rounded-xl transition-all duration-300 resize-none placeholder-gray-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-mono text-[11px] tracking-[0.15em] border border-[#00FF41]/60 text-[#00FF41] px-6 py-4 hover:bg-[#00FF41] hover:text-black transition-all duration-300 uppercase rounded-xl flex items-center justify-center gap-2"
                  >
                    <Send size={13} /> Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="border-t border-white/[0.04] py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-gray-600 tracking-widest">\u00a9 2026 PREET GHANSHYAM DAVE</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/30" />
              <p className="font-mono text-[10px] text-gray-700 tracking-widest">NEXT.JS + TAILWIND + FRAMER MOTION</p>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
