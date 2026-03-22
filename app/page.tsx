"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import TypewriterText from "@/components/TypewriterText";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import {
  Brain, Eye, Cpu, Code2, Github, Linkedin, Mail, Phone,
  Send, MapPin, Calendar, ArrowRight, ExternalLink,
} from "lucide-react";

const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Enterprise Sports Analytics Platform",
    category: "Full-Stack / ML Engineering",
    description: "Production-grade sports analytics platform with custom ML prediction models, live data pipelines, and real-time game tracking across 7+ professional sports leagues.",
    longDescription: "I architected and delivered a comprehensive real-time sports analytics platform for a leading betting company, covering NBA, NCAAB, MLB, NHL, Soccer, F1, and UFC. This project is the umbrella for all the individual prediction models and scrapers I built:\n\n\u2022 Football Prediction System \u2014 Ridge Regression with 21+ features, automated daily pipeline, Streamlit dashboard (7 GitHub stars)\n\u2022 CTMCL Predictions \u2014 Novel consensus goals line method with Random Forest, 6 Premier League seasons\n\u2022 Goal Prediction Model \u2014 6-algorithm regression benchmark for match outcome forecasting\n\u2022 NBA Prediction Model \u2014 Pre-match feature engineering, odds integration, ML predictions with validation\n\u2022 NBA Analytics & Odds Scraper \u2014 Full data pipeline: odds scraping, database building, ensemble models\n\u2022 Multi-Sport Scraper Suite \u2014 Custom scrapers for NHL, MLB, and NCAAB with dashboards and validation\n\nThe full stack spans Go REST APIs, React frontends, Azure VM infrastructure, Docker containers, Redis caching, and PostgreSQL databases. If you need someone who can own the entire pipeline from data ingestion and ML model design through production deployment and infrastructure management, this project demonstrates exactly that capability at enterprise scale.",
    tech_tags: ["Go", "React", "Ridge Regression", "Random Forest", "Azure", "Docker", "Redis", "PostgreSQL", "GitHub Actions", "Streamlit"],
  },
  {
    id: "2",
    title: "TalkToNotes",
    category: "Computer Vision / NLP",
    description: "Intelligent OCR system that converts handwritten notes into searchable, queryable knowledge bases using TrOCR transformers and neural embeddings.",
    longDescription: "I developed an intelligent document processing pipeline that transforms handwritten notes into structured, searchable knowledge bases. Using the TrOCR transformer for high-accuracy optical character recognition, neural embeddings for semantic understanding, and a chatbot interface for natural language querying. If you need someone who understands computer vision pipelines, transformer architectures, and NLP systems \u2014 and can turn them into products real users interact with \u2014 this is the kind of end-to-end AI engineering I specialize in.",
    tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search", "Python"],
    repo_url: "https://github.com/iampreetdave/TalkNotes",
  },
  {
    id: "3",
    title: "StudBud",
    category: "Web / Full-Stack",
    description: "Full-stack academic management platform with ML-powered study recommendations and adaptive scheduling algorithms.",
    longDescription: "I designed and built a full-stack student management platform that uses machine learning to provide personalized study recommendations and adaptive scheduling. Built with TypeScript for type-safe, maintainable code. This demonstrates my ability to combine solid web engineering with practical AI features \u2014 the same approach I bring to any product that needs intelligent capabilities in a polished user experience.",
    tech_tags: ["TypeScript", "Full-Stack", "Machine Learning", "Data Analysis"],
    repo_url: "https://github.com/iampreetdave/STUDBUD",
  },
  {
    id: "4",
    title: "Find Ranks",
    category: "Web / Streamlit",
    description: "Analytics tool that automates mark extraction from PDF mark sheets, calculates cumulative performance, and generates institutional rankings.",
    longDescription: "I built a practical data processing tool that automates the entire workflow of extracting marks from multiple PDF mark sheets, calculating cumulative student performance, and generating ranked analytics. The Streamlit-based interface makes it immediately accessible to non-technical staff. If you have manual, data-heavy workflows that need to be streamlined, this is exactly the kind of solution I deliver.",
    tech_tags: ["Streamlit", "PDF Processing", "Python", "Data Analytics"],
    repo_url: "https://github.com/iampreetdave-max/Find-Ranks",
  },
];

const skills = [
  { title: "Deep Learning & Neural Networks", Icon: Brain, slug: "deep-learning", items: ["TensorFlow", "PyTorch", "Keras", "CNNs", "Transformers", "Neural Network Optimization"] },
  { title: "Computer Vision & NLP", Icon: Eye, slug: "cv-nlp", items: ["TrOCR", "Image Processing", "NLP", "Vector Embeddings & Search"] },
  { title: "Machine Learning", Icon: Cpu, slug: "machine-learning", items: ["Scikit-Learn", "Pandas", "NumPy", "Regression & Classification", "Feature Engineering"] },
  { title: "Development & Deployment", Icon: Code2, slug: "dev-deploy", items: ["Python (Advanced)", "C++", "JavaScript", "Full-Stack", "API Development", "ML Pipeline Automation"] },
];

const experience = [
  { role: "Trainee Software Engineer", period: "Sep 2025 \u2013 Present", company: "Agility Innovations Pvt. Ltd., Ahmedabad", description: "Building AI-powered product pipelines, deploying ML solutions in production environments, full-stack development with neural network integration.", active: true },
  { role: "Machine Learning Intern", period: "2025", company: "Oasis Infobyte, Remote", description: "Developed ML projects across neural network architectures, built end-to-end ML pipelines from data ingestion to deployment.", active: false },
  { role: "AI Research Lead", period: "2024 \u2013 2025", company: "Smart India Hackathon & Rotaract Club Hackathon", description: "Led AI research teams in computer vision and TrOCR systems. Designed architectures for real-world document processing challenges.", active: false },
];

const stats = [
  { value: "14+", label: "Projects" },
  { value: "8+", label: "Automations" },
  { value: "2", label: "Internships" },
  { value: "1", label: "Hackathon Won" },
];

const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];

function SectionLabel({ text }: { text: string }) {
  return (<div className="flex items-center gap-3 mb-4"><div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/40 to-transparent" /><span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">{text}</span></div>);
}

function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (<div className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] ${hover ? "hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_0_30px_rgba(0,255,65,0.04)]" : ""} transition-all duration-500 ${className}`}>{children}</div>);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const h1 = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false); };
    const h2 = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", h1); document.addEventListener("keydown", h2);
    return () => { document.removeEventListener("mousedown", h1); document.removeEventListener("keydown", h2); };
  }, []);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    for (const id of sectionIds) { const el = document.getElementById(id); if (!el) continue; const o = new IntersectionObserver((entries) => { for (const e of entries) { if (e.isIntersecting) setActiveSection(id); } }, { threshold: 0.3 }); o.observe(el); obs.push(o); }
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } };
  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <>
      <NeuralNetwork paused={false} />
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? "rgba(5,5,5,0.85)" : "rgba(5,5,5,0.4)", borderBottom: scrolled ? "1px solid rgba(0,255,65,0.08)" : "1px solid transparent", backdropFilter: scrolled ? "blur(20px)" : "blur(8px)", WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-1 font-mono text-base font-bold tracking-tight"><span className="text-white group-hover:text-[#00FF41] transition-colors duration-300">PD</span><span className="text-[#00FF41]/50 animate-pulse">_</span></a>
          <div className="hidden md:flex items-center gap-8">{navItems.map((item) => (<a key={item} href={`#${item.toLowerCase()}`} className={`nav-link font-mono text-[11px] tracking-[0.15em] transition-colors duration-300 uppercase cursor-pointer ${activeSection === item.toLowerCase() ? "active text-[#00FF41]" : "text-gray-500 hover:text-gray-300"}`}>{item}</a>))}</div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden font-mono text-xs border border-white/10 w-10 h-10 flex items-center justify-center hover:border-[#00FF41]/30 hover:text-[#00FF41] transition-all duration-300 cursor-pointer" aria-label="Toggle menu">{menuOpen ? "\u00d7" : "\u2261"}</button>
        </div>
        <AnimatePresence>{menuOpen && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden border-t border-white/[0.06] bg-[#050505]/95 backdrop-blur-2xl overflow-hidden"><div className="px-6 py-6 flex flex-col gap-4">{navItems.map((item) => (<a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className={`font-mono text-sm transition-colors cursor-pointer ${activeSection === item.toLowerCase() ? "text-[#00FF41]" : "text-gray-400 hover:text-white"}`}>{item}</a>))}</div></motion.div>)}</AnimatePresence>
      </nav>

      <main className="relative z-10">
        <section id="home" className="min-h-[100dvh] flex items-center justify-center px-6 pt-16">
          <div className="max-w-4xl w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-6"><span className="font-mono text-[11px] tracking-[0.3em] text-gray-600 uppercase inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00FF41]/60 animate-pulse" />Portfolio / 2025</span></motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="hero-name text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-[-0.03em] leading-[0.9]">Preet<br /><span className="text-gray-500">Dave</span></motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="mb-8 h-8"><TypewriterText /></motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}><GlassCard className="p-6 mb-8 max-w-2xl rounded-lg" hover={false}><p className="text-gray-300 text-[15px] leading-[1.8]">Building intelligent systems with deep learning, computer vision, and advanced ML algorithms. Currently pursuing B.Tech in Computer Science (AI-ML) while working as a Trainee Software Engineer at Agility Innovations.</p></GlassCard></motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.7 }} className="flex flex-wrap gap-3">
              <a href="#contact" className="group font-mono text-[11px] tracking-wider border border-[#00FF41]/60 text-[#00FF41] px-7 py-3.5 hover:bg-[#00FF41] hover:text-black transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer">CONTACT ME <Send size={12} className="group-hover:translate-x-0.5 transition-transform" /></a>
              <a href="https://github.com/iampreetdave-max" target="_blank" rel="noopener noreferrer" className="group font-mono text-[11px] tracking-wider border border-white/10 px-7 py-3.5 text-gray-400 hover:border-white/30 hover:text-white transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer"><Github size={13} /> GITHUB</a>
              <a href="https://www.linkedin.com/in/preet-dave-452023271/" target="_blank" rel="noopener noreferrer" className="group font-mono text-[11px] tracking-wider border border-white/10 px-7 py-3.5 text-gray-400 hover:border-white/30 hover:text-white transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer"><Linkedin size={13} /> LINKEDIN</a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="About" /></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Who I Am</motion.h2>
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
              <motion.div variants={fadeUp}>
                <p className="text-gray-300 leading-[1.8] text-[15px] mb-5">I am an AI-ML Engineer passionate about building intelligent systems that solve real-world problems. With expertise in deep learning, computer vision, and natural language processing, I develop end-to-end machine learning pipelines \u2014 from data preprocessing and feature engineering to model deployment and optimization.</p>
                <p className="text-gray-500 leading-[1.8] text-[15px] mb-8">Currently pursuing my B.Tech in Computer Science (AI-ML) while gaining hands-on industry experience as a Trainee Software Engineer, I bridge the gap between cutting-edge research and production-ready solutions.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{stats.map((s) => (<GlassCard key={s.label} className="p-3 rounded-lg text-center"><div className="text-xl font-black font-mono leading-none text-gradient-green">{s.value}</div><div className="font-mono text-[9px] text-gray-500 mt-1.5 tracking-[0.1em] uppercase">{s.label}</div></GlassCard>))}</div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex justify-center md:justify-end"><div className="relative"><Image src="https://raw.githubusercontent.com/iampreetdave-max/portfolio/main/images/profile%20picture.jpeg" alt="Preet Dave" width={200} height={200} className="rounded-lg object-cover border border-white/[0.06] w-40 h-40 md:w-48 md:h-48" /><div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-[#00FF41]/10 to-transparent -z-10" /></div></motion.div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS - clickable cards link to /projects with skill filter */}
        <section id="skills" className="py-20 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Skills" /></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Technical Expertise</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-sm mb-10 font-mono tracking-wide">Click any skill to see related projects</motion.p>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <motion.div key={cat.title} variants={fadeUp}>
                  <Link href={`/projects?skill=${cat.slug}`} className="block">
                    <GlassCard className="p-6 rounded-lg group cursor-pointer">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#00FF41]/[0.08] border border-[#00FF41]/[0.15] flex items-center justify-center group-hover:bg-[#00FF41]/[0.12] group-hover:border-[#00FF41]/[0.25] transition-all duration-500"><cat.Icon size={18} className="text-[#00FF41]/70 group-hover:text-[#00FF41] transition-colors duration-500" /></div>
                          <h3 className="font-mono text-[13px] font-semibold tracking-wide text-white">{cat.title}</h3>
                        </div>
                        <ExternalLink size={14} className="text-gray-700 group-hover:text-[#00FF41]/60 transition-colors duration-500" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">{cat.items.map((item) => (<span key={item} className="font-mono text-[10px] px-2.5 py-1 border border-white/[0.06] text-gray-500 rounded-sm group-hover:border-white/[0.12] group-hover:text-gray-300 transition-all duration-500">{item}</span>))}</div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="projects" className="py-20 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Projects" /></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Featured Work</motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">{featuredProjects.map((p) => (<motion.div key={p.id} variants={fadeUp}><ProjectCard project={p} onClick={() => setSelectedProject(p)} /></motion.div>))}</motion.div>
            <motion.div variants={fadeUp} className="mt-8 text-center"><Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-wider border border-white/[0.1] px-8 py-3.5 text-gray-400 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition-all duration-300 rounded-sm cursor-pointer">VIEW ALL PROJECTS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link></motion.div>
          </motion.div>
        </section>

        <section id="experience" className="py-20 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Experience" /></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Work History</motion.h2>
            <div className="space-y-0">{experience.map((exp, i) => (<motion.div key={i} variants={fadeUp} className="relative pl-10 pb-10 border-l border-white/[0.06] last:pb-0 group"><div className={`absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-[5.5px] rounded-full transition-all duration-500 ${exp.active ? "bg-[#00FF41] shadow-[0_0_12px_rgba(0,255,65,0.4)]" : "bg-white/20 group-hover:bg-white/60"}`} />{exp.active && <div className="absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-[5.5px] rounded-full bg-[#00FF41] animate-ping opacity-20" />}<div className="flex flex-wrap items-center gap-3 mb-2"><span className="font-mono text-[11px] text-gray-600 tracking-wider flex items-center gap-1.5"><Calendar size={11} />{exp.period}</span>{exp.active && <span className="font-mono text-[9px] tracking-[0.2em] text-[#00FF41]/70 border border-[#00FF41]/20 bg-[#00FF41]/[0.05] px-2.5 py-0.5 uppercase rounded-sm">Current</span>}</div><h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">{exp.role}</h3><div className="font-mono text-[11px] text-gray-500 mb-3 tracking-wide flex items-center gap-1.5"><MapPin size={11} />{exp.company}</div><p className="text-gray-400 text-sm leading-relaxed max-w-lg">{exp.description}</p></motion.div>))}</div>
          </motion.div>
        </section>

        <section id="contact" className="py-20 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Contact" /></motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Get In Touch</motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeUp}>
                <div className="space-y-4 mb-8">{[{ Icon: Mail, label: "Email", href: "mailto:iampreetdave@gmail.com", text: "iampreetdave@gmail.com" }, { Icon: Phone, label: "Phone", href: "tel:+919081025277", text: "+91 90810 25277" }, { Icon: Github, label: "GitHub", href: "https://github.com/iampreetdave-max", text: "iampreetdave-max" }, { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/preet-dave-452023271/", text: "preet-dave" }].map((link) => (<a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 text-gray-500 hover:text-white transition-all duration-300 cursor-pointer"><div className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] shrink-0 group-hover:border-[#00FF41]/20 group-hover:bg-[#00FF41]/[0.05] transition-all duration-300"><link.Icon size={16} className="group-hover:text-[#00FF41] transition-colors duration-300" /></div><div><div className="font-mono text-[10px] text-gray-700 tracking-[0.15em] uppercase mb-0.5">{link.label}</div><div className="text-sm">{link.text}</div></div></a>))}</div>
                <GlassCard className="p-5 rounded-lg inline-block" hover={false}><p className="font-mono text-[11px] text-gray-500 tracking-wide leading-relaxed">Open to AI/ML engineering opportunities<br />and research collaborations.</p></GlassCard>
              </motion.div>
              <motion.div variants={fadeUp}>
                <form name="contact" method="POST" data-netlify="true" action="/success" className="space-y-5"><input type="hidden" name="form-name" value="contact" />{[{ label: "Name", type: "text", name: "name" }, { label: "Email", type: "email", name: "email" }].map((f) => (<div key={f.name}><label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">{f.label}</label><input type={f.type} name={f.name} required className="w-full bg-white/[0.02] border border-white/[0.06] p-3.5 text-white text-sm rounded-sm transition-all duration-300 placeholder-gray-800" /></div>))}<div><label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">Message</label><textarea name="message" required rows={5} className="w-full bg-white/[0.02] border border-white/[0.06] p-3.5 text-white text-sm rounded-sm transition-all duration-300 resize-none placeholder-gray-800" /></div><button type="submit" className="w-full font-mono text-[11px] tracking-wider border border-[#00FF41]/60 text-[#00FF41] px-6 py-3.5 hover:bg-[#00FF41] hover:text-black transition-all duration-300 uppercase rounded-sm flex items-center justify-center gap-2 cursor-pointer"><Send size={13} /> Send Message</button></form>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-white/[0.04] py-8 px-6"><div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><p className="font-mono text-[10px] text-gray-500 tracking-wider">\u00a9 2025 PREET GHANSHYAM DAVE</p><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/40" /><p className="font-mono text-[10px] text-gray-600 tracking-wider">BUILT WITH NEXT.JS + TAILWIND</p></div></div></footer>
      </main>

      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </>
  );
}
