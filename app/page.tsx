"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeuralNetwork from "@/components/NeuralNetwork";
import TypewriterText from "@/components/TypewriterText";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import {
  Brain, Eye, Cpu, Code2, Github, Linkedin, Mail, Phone,
  Send, MapPin, ArrowDown, Calendar,
} from "lucide-react";

/* ─── DATA ─── */

const projects: Project[] = [
  {
    id: "1",
    title: "TalkToNotes",
    category: "Computer Vision / NLP",
    description:
      "OCR system using TrOCR transformer, neural embeddings, chatbot KB integration. Converts handwritten notes to searchable, queryable knowledge bases.",
    tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search"],
    repo_url: "https://github.com/iampreetdave/TalkNotes",
  },
  {
    id: "2",
    title: "Goal Prediction Model",
    category: "ML / Predictive Analytics",
    description:
      "6-algorithm regression benchmark pipeline with comprehensive feature engineering and statistical analysis for predictive modeling.",
    tech_tags: ["Machine Learning", "Regression", "Statistical Modeling", "Python"],
  },
  {
    id: "3",
    title: "StudBud",
    category: "Web / AI",
    description:
      "Student academic management platform with ML-powered recommendations and adaptive scheduling algorithms.",
    tech_tags: ["Web Development", "Machine Learning", "Data Analysis"],
  },
  {
    id: "4",
    title: "Neural Chat System",
    category: "Network / AI",
    description:
      "Real-time socket communication system with AI integration potential. Low-latency message routing with neural network\u2013assisted responses.",
    tech_tags: ["Python", "Socket Programming", "Network Architecture"],
  },
];

const skills = [
  {
    title: "Deep Learning & Neural Networks",
    Icon: Brain,
    items: ["TensorFlow", "PyTorch", "Keras", "CNNs", "Transformers", "Neural Network Optimization"],
  },
  {
    title: "Computer Vision & NLP",
    Icon: Eye,
    items: ["TrOCR", "Image Processing", "NLP", "Vector Embeddings & Search"],
  },
  {
    title: "Machine Learning",
    Icon: Cpu,
    items: ["Scikit-Learn", "Pandas", "NumPy", "Regression & Classification", "Feature Engineering"],
  },
  {
    title: "Development & Deployment",
    Icon: Code2,
    items: ["Python (Advanced)", "C++", "JavaScript", "Full-Stack", "API Development", "ML Pipeline Automation"],
  },
];

const experience = [
  {
    role: "Trainee Software Engineer",
    period: "Sep 2025 \u2013 Present",
    company: "Agility Innovations Pvt. Ltd., Ahmedabad",
    description:
      "Building AI-powered product pipelines, deploying ML solutions in production environments, full-stack development with neural network integration.",
    active: true,
  },
  {
    role: "Machine Learning Intern",
    period: "2025",
    company: "Oasis Infobyte, Remote",
    description:
      "Developed ML projects across neural network architectures, built end-to-end ML pipelines from data ingestion to deployment.",
    active: false,
  },
  {
    role: "AI Research Lead",
    period: "2024 \u2013 2025",
    company: "Smart India Hackathon & Rotaract Club Hackathon",
    description:
      "Led AI research teams in computer vision and TrOCR systems. Designed architectures for real-world document processing challenges.",
    active: false,
  },
];

const stats = [
  { value: "3", label: "ML Projects", sublabel: "shipped" },
  { value: "3+", label: "Automations", sublabel: "built" },
  { value: "2", label: "Internships", sublabel: "completed" },
  { value: "1", label: "Hackathon", sublabel: "won" },
];

const filterMap: Record<string, string[]> = {
  "ML Models": ["ML", "Machine Learning", "Predictive Analytics", "Computer Vision", "NLP"],
  Automation: ["Automation", "Pipeline", "Socket"],
  Research: ["Research", "AI", "Neural"],
  Web: ["Web"],
};

const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];

/* ─── HELPERS ─── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/40 to-transparent" />
      <span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">
        {text}
      </span>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] ${
        hover
          ? "hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_0_30px_rgba(0,255,65,0.04)]"
          : ""
      } transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── PAGE ─── */

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => {
          const keywords = filterMap[filter] || [];
          return keywords.some(
            (kw) =>
              p.category.toLowerCase().includes(kw.toLowerCase()) ||
              p.tech_tags.some((t) => t.toLowerCase().includes(kw.toLowerCase()))
          );
        });

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <>
      <NeuralNetwork paused={false} />

      {/* NAV */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(5, 5, 5, 0.85)" : "rgba(5, 5, 5, 0.4)",
          borderBottom: scrolled
            ? "1px solid rgba(0, 255, 65, 0.08)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="group flex items-center gap-1 font-mono text-base font-bold tracking-tight"
          >
            <span className="text-white group-hover:text-[#00FF41] transition-colors duration-300">
              PD
            </span>
            <span className="text-[#00FF41]/50 animate-pulse">_</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link font-mono text-[11px] tracking-[0.15em] transition-colors duration-300 uppercase cursor-pointer ${
                  activeSection === item.toLowerCase()
                    ? "active text-[#00FF41]"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-xs border border-white/10 w-10 h-10 flex items-center justify-center hover:border-[#00FF41]/30 hover:text-[#00FF41] transition-all duration-300 cursor-pointer"
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
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden border-t border-white/[0.06] bg-[#050505]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={handleNavClick}
                    className={`font-mono text-sm transition-colors cursor-pointer ${
                      activeSection === item.toLowerCase()
                        ? "text-[#00FF41]"
                        : "text-gray-400 hover:text-white"
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
        {/* \u2500\u2500\u2500 HERO \u2500\u2500\u2500 */}
        <section
          id="home"
          className="min-h-[100dvh] flex items-center justify-center px-6 pt-16"
        >
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="mb-8"
            >
              <span className="font-mono text-[11px] tracking-[0.35em] text-gray-600 uppercase inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF41]/60 animate-pulse" />
                Portfolio / 2025
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="hero-name text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.04em] leading-[0.85]"
            >
              Preet
              <br />
              <span className="text-gray-500">Dave</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-10 h-8"
            >
              <TypewriterText />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <GlassCard className="p-6 md:p-8 mb-10 max-w-2xl rounded-lg" hover={false}>
                <p className="text-gray-300 text-[15px] leading-[1.8]">
                  Building intelligent systems with deep learning, computer vision,
                  and advanced ML algorithms. Currently pursuing B.Tech in Computer
                  Science (AI-ML) while working as a Trainee Software Engineer at
                  Agility Innovations.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="group font-mono text-[11px] tracking-wider border border-[#00FF41]/60 text-[#00FF41] px-7 py-3.5 hover:bg-[#00FF41] hover:text-black transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer"
              >
                CONTACT ME
                <Send size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/iampreetdave"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-mono text-[11px] tracking-wider border border-white/10 px-7 py-3.5 text-gray-400 hover:border-white/30 hover:text-white transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer"
              >
                <Github size={13} />
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/preet-dave-452023271/"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-mono text-[11px] tracking-wider border border-white/10 px-7 py-3.5 text-gray-400 hover:border-white/30 hover:text-white transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer"
              >
                <Linkedin size={13} />
                LINKEDIN
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-24 flex items-center gap-3"
            >
              <ArrowDown size={14} className="text-gray-700 animate-bounce" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-700 uppercase">
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </section>

        {/* \u2500\u2500\u2500 ABOUT \u2500\u2500\u2500 */}
        <section id="about" className="py-32 px-6">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel text="About" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-12 tracking-[-0.03em]"
            >
              Who I Am
            </motion.h2>
            <div className="grid md:grid-cols-[2fr_1fr] gap-12">
              <motion.div variants={fadeUp}>
                <p className="text-gray-300 leading-[1.9] text-[15px] mb-6">
                  I am an AI-ML Engineer passionate about building intelligent systems
                  that solve real-world problems. With expertise in deep learning,
                  computer vision, and natural language processing, I develop
                  end-to-end machine learning pipelines \u2014 from data preprocessing and
                  feature engineering to model deployment and optimization.
                </p>
                <p className="text-gray-500 leading-[1.9] text-[15px]">
                  Currently pursuing my B.Tech in Computer Science (AI-ML) while
                  gaining hands-on industry experience as a Trainee Software Engineer,
                  I bridge the gap between cutting-edge research and production-ready
                  solutions.
                </p>
              </motion.div>
              <motion.div variants={stagger} className="space-y-3">
                {stats.map((stat) => (
                  <motion.div key={stat.label} variants={fadeUp}>
                    <GlassCard className="p-5 rounded-lg">
                      <div className="text-3xl font-black font-mono leading-none text-gradient-green">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[10px] text-gray-500 mt-2 tracking-[0.15em] uppercase">
                        {stat.label} {stat.sublabel}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* \u2500\u2500\u2500 SKILLS \u2500\u2500\u2500 */}
        <section id="skills" className="py-32 px-6">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel text="Skills" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-12 tracking-[-0.03em]"
            >
              Technical Expertise
            </motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <motion.div key={cat.title} variants={fadeUp}>
                  <GlassCard className="p-6 rounded-lg group">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-[#00FF41]/[0.08] border border-[#00FF41]/[0.15] flex items-center justify-center group-hover:bg-[#00FF41]/[0.12] group-hover:border-[#00FF41]/[0.25] transition-all duration-500">
                        <cat.Icon
                          size={18}
                          className="text-[#00FF41]/70 group-hover:text-[#00FF41] transition-colors duration-500"
                        />
                      </div>
                      <h3 className="font-mono text-[13px] font-semibold tracking-wide text-white">
                        {cat.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[10px] px-2.5 py-1 border border-white/[0.06] text-gray-500 rounded-sm group-hover:border-white/[0.12] group-hover:text-gray-300 transition-all duration-500"
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

        {/* \u2500\u2500\u2500 PROJECTS \u2500\u2500\u2500 */}
        <section id="projects" className="py-32 px-6">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel text="Projects" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-12 tracking-[-0.03em]"
            >
              Featured Work
            </motion.h2>
            <motion.div variants={fadeUp}>
              <ProjectFilter active={filter} onChange={setFilter} />
            </motion.div>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeUp}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
            {filteredProjects.length === 0 && (
              <GlassCard className="py-16 text-center rounded-lg">
                <p className="text-gray-600 font-mono text-xs tracking-wider">
                  NO PROJECTS MATCH THIS FILTER
                </p>
              </GlassCard>
            )}
          </motion.div>
        </section>

        {/* \u2500\u2500\u2500 EXPERIENCE \u2500\u2500\u2500 */}
        <section id="experience" className="py-32 px-6">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel text="Experience" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-12 tracking-[-0.03em]"
            >
              Work History
            </motion.h2>
            <div className="space-y-0">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative pl-10 pb-12 border-l border-white/[0.06] last:pb-0 group"
                >
                  <div
                    className={`absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-[5.5px] rounded-full transition-all duration-500 ${
                      exp.active
                        ? "bg-[#00FF41] shadow-[0_0_12px_rgba(0,255,65,0.4)]"
                        : "bg-white/20 group-hover:bg-white/60"
                    }`}
                  />
                  {exp.active && (
                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-[5.5px] rounded-full bg-[#00FF41] animate-ping opacity-20" />
                  )}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] text-gray-600 tracking-wider flex items-center gap-1.5">
                      <Calendar size={11} />
                      {exp.period}
                    </span>
                    {exp.active && (
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#00FF41]/70 border border-[#00FF41]/20 bg-[#00FF41]/[0.05] px-2.5 py-0.5 uppercase rounded-sm">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">
                    {exp.role}
                  </h3>
                  <div className="font-mono text-[11px] text-gray-500 mb-3 tracking-wide flex items-center gap-1.5">
                    <MapPin size={11} />
                    {exp.company}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* \u2500\u2500\u2500 CONTACT \u2500\u2500\u2500 */}
        <section id="contact" className="py-32 px-6">
          <div className="section-divider max-w-4xl mx-auto mb-32" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel text="Contact" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-12 tracking-[-0.03em]"
            >
              Get In Touch
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div variants={fadeUp}>
                <div className="space-y-4 mb-10">
                  {[
                    {
                      Icon: Mail,
                      label: "Email",
                      href: "mailto:preetdave@gmail.com",
                      text: "preetdave@gmail.com",
                    },
                    {
                      Icon: Phone,
                      label: "Phone",
                      href: "tel:+919081025277",
                      text: "+91 90810 25277",
                    },
                    {
                      Icon: Github,
                      label: "GitHub",
                      href: "https://github.com/iampreetdave",
                      text: "iampreetdave",
                    },
                    {
                      Icon: Linkedin,
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/preet-dave-452023271/",
                      text: "preet-dave",
                    },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4 text-gray-500 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] shrink-0 group-hover:border-[#00FF41]/20 group-hover:bg-[#00FF41]/[0.05] transition-all duration-300">
                        <link.Icon
                          size={16}
                          className="group-hover:text-[#00FF41] transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-gray-700 tracking-[0.15em] uppercase mb-0.5">
                          {link.label}
                        </div>
                        <div className="text-sm">{link.text}</div>
                      </div>
                    </a>
                  ))}
                </div>
                <GlassCard className="p-5 rounded-lg inline-block" hover={false}>
                  <p className="font-mono text-[11px] text-gray-500 tracking-wide leading-relaxed">
                    Open to AI/ML engineering opportunities
                    <br />
                    and research collaborations.
                  </p>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp}>
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  action="/success"
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  {[
                    { label: "Name", type: "text", name: "name" },
                    { label: "Email", type: "email", name: "email" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        className="w-full bg-white/[0.02] border border-white/[0.06] p-3.5 text-white text-sm rounded-sm transition-all duration-300 placeholder-gray-800"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-white/[0.02] border border-white/[0.06] p-3.5 text-white text-sm rounded-sm transition-all duration-300 resize-none placeholder-gray-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-mono text-[11px] tracking-wider border border-[#00FF41]/60 text-[#00FF41] px-6 py-3.5 hover:bg-[#00FF41] hover:text-black transition-all duration-300 uppercase rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={13} />
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* \u2500\u2500\u2500 FOOTER \u2500\u2500\u2500 */}
        <footer className="border-t border-white/[0.04] py-10 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-gray-500 tracking-wider">
              \u00a9 2025 PREET GHANSHYAM DAVE
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/40" />
              <p className="font-mono text-[10px] text-gray-600 tracking-wider">
                BUILT WITH NEXT.JS + TAILWIND
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
