"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeuralNetwork from "@/components/NeuralNetwork";
import TypewriterText from "@/components/TypewriterText";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";

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
      "Real-time socket communication system with AI integration potential. Low-latency message routing with neural network–assisted responses.",
    tech_tags: ["Python", "Socket Programming", "Network Architecture"],
  },
];

const skills = [
  {
    title: "Deep Learning & Neural Networks",
    icon: "⟁",
    items: ["TensorFlow", "PyTorch", "Keras", "CNNs", "Transformers", "Neural Network Optimization"],
  },
  {
    title: "Computer Vision & NLP",
    icon: "◎",
    items: ["TrOCR", "Image Processing", "NLP", "Vector Embeddings & Search"],
  },
  {
    title: "Machine Learning",
    icon: "◇",
    items: ["Scikit-Learn", "Pandas", "NumPy", "Regression & Classification", "Feature Engineering"],
  },
  {
    title: "Development & Deployment",
    icon: "⬡",
    items: ["Python (Advanced)", "C++", "JavaScript", "Full-Stack", "API Development", "ML Pipeline Automation"],
  },
];

const experience = [
  {
    role: "Trainee Software Engineer",
    period: "Sep 2025 – Present",
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
    period: "2024 – 2025",
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

/* ─── COMPONENTS ─── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-[1px] bg-[#333]" />
      <span className="font-mono text-[11px] text-gray-400 tracking-[0.2em] uppercase">
        {text}
      </span>
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

  // Outside click + Escape to close mobile menu
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

  // Nav scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback((item: string) => {
    setMenuOpen(false);
  }, []);

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

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <>
      <NeuralNetwork paused={false} />

      {/* NAV */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(0, 0, 0, 0.97)" : "rgba(0, 0, 0, 0.7)",
          borderBottom: scrolled
            ? "1px solid rgba(0, 255, 65, 0.25)"
            : "1px solid #111",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="font-mono text-base font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            PD<span className="text-gray-600">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link font-mono text-[11px] tracking-wider transition-colors uppercase ${
                  activeSection === item.toLowerCase()
                    ? "active text-[#00ff41]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-xs border border-[#222] w-10 h-10 flex items-center justify-center hover:border-white/40 transition-colors"
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#111] bg-black/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => handleNavClick(item)}
                    className={`font-mono text-sm transition-colors ${
                      activeSection === item.toLowerCase()
                        ? "text-[#00ff41]"
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
        {/* ─── HERO ─── */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-16">
          <div className="max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-6"
            >
              <span className="font-mono text-[11px] tracking-[0.3em] text-gray-600 uppercase">
                Portfolio / 2025
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="hero-name text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[0.9]"
            >
              Preet
              <br />
              <span className="text-gray-400">Ghanshyam</span>
              <br />
              Dave
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8 h-8"
            >
              <TypewriterText />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="border border-[#1a1a1a] bg-black/60 backdrop-blur-md p-6 mb-10 max-w-xl"
            >
              <p className="text-gray-300 text-sm leading-relaxed">
                Building intelligent systems with deep learning, computer vision,
                and advanced ML algorithms. Currently pursuing B.Tech in Computer
                Science (AI-ML) while working as a Trainee Software Engineer at
                Agility Innovations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="font-mono text-[11px] tracking-wider border border-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
              >
                CONTACT ME
              </a>
              <a
                href="https://github.com/iampreetdave"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-wider border border-[#333] px-6 py-3 text-gray-500 hover:border-white hover:text-white transition-all duration-300"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/preet-dave-452023271/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-wider border border-[#333] px-6 py-3 text-gray-500 hover:border-white hover:text-white transition-all duration-300"
              >
                LINKEDIN
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-20 flex items-center gap-3"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
              <span className="font-mono text-[10px] tracking-widest text-gray-700 uppercase">
                Scroll
              </span>
            </motion.div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="py-32 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <SectionLabel text="About" />
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
              Who I Am
            </h2>
            <div className="grid md:grid-cols-[2fr_1fr] gap-12">
              <div>
                <p className="text-gray-300 leading-[1.8] text-[15px] mb-6">
                  I am an AI-ML Engineer passionate about building intelligent systems
                  that solve real-world problems. With expertise in deep learning,
                  computer vision, and natural language processing, I develop
                  end-to-end machine learning pipelines — from data preprocessing and
                  feature engineering to model deployment and optimization.
                </p>
                <p className="text-gray-400 leading-[1.8] text-[15px]">
                  Currently pursuing my B.Tech in Computer Science (AI-ML) while gaining
                  hands-on industry experience as a Trainee Software Engineer, I
                  bridge the gap between cutting-edge research and production-ready
                  solutions.
                </p>
              </div>
              <div className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="border border-[#2a2a2a] bg-black/80 backdrop-blur-sm p-4 hover:border-[#444] transition-colors">
                    <div className="text-3xl font-black font-mono leading-none">{stat.value}</div>
                    <div className="font-mono text-[10px] text-gray-400 mt-2 tracking-wider uppercase">
                      {stat.label} {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── SKILLS ─── */}
        <section id="skills" className="py-32 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <SectionLabel text="Skills" />
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              Technical Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group border border-[#2a2a2a] bg-black/75 backdrop-blur-sm p-6 hover:border-[#444] transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-lg text-gray-600">{cat.icon}</span>
                    <h3 className="font-mono text-[13px] font-semibold tracking-wide text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[10px] px-2.5 py-1 border border-[#2a2a2a] text-gray-400 group-hover:border-[#444] group-hover:text-gray-200 transition-all duration-500"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" className="py-32 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <SectionLabel text="Projects" />
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              Featured Work
            </h2>
            <ProjectFilter active={filter} onChange={setFilter} />
            <div className="grid md:grid-cols-2 gap-4">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="border border-[#1a1a1a] py-16 text-center">
                <p className="text-gray-600 font-mono text-xs tracking-wider">
                  NO PROJECTS MATCH THIS FILTER
                </p>
              </div>
            )}
          </motion.div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section id="experience" className="py-32 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <SectionLabel text="Experience" />
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              Work History
            </h2>
            <div className="space-y-0">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-10 pb-12 border-l border-[#1a1a1a] last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-2 h-2 -translate-x-[4.5px] transition-colors ${
                      exp.active ? "bg-white" : "bg-[#333] group-hover:bg-white"
                    }`}
                  />
                  {exp.active && (
                    <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-[4.5px] bg-white animate-ping opacity-30" />
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] text-gray-600 tracking-wider">
                      {exp.period}
                    </span>
                    {exp.active && (
                      <span className="font-mono text-[9px] tracking-widest text-gray-500 border border-[#333] px-2 py-0.5 uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{exp.role}</h3>
                  <div className="font-mono text-[11px] text-gray-500 mb-3 tracking-wide">
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

        {/* ─── CONTACT ─── */}
        <section id="contact" className="py-32 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <SectionLabel text="Contact" />
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: "@", label: "Email", href: "mailto:preetdave@gmail.com", text: "preetdave@gmail.com" },
                    { icon: "#", label: "Phone", href: "tel:+919081025277", text: "+91 90810 25277" },
                    { icon: "GH", label: "GitHub", href: "https://github.com/iampreetdave", text: "iampreetdave" },
                    { icon: "IN", label: "LinkedIn", href: "https://www.linkedin.com/in/preet-dave-452023271/", text: "preet-dave" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 text-gray-500 hover:text-white transition-all duration-300"
                    >
                      <span className="font-mono text-[10px] border border-[#222] w-10 h-10 flex items-center justify-center group-hover:border-white/40 transition-colors shrink-0">
                        {link.icon}
                      </span>
                      <div>
                        <div className="font-mono text-[10px] text-gray-700 tracking-wider uppercase mb-0.5">
                          {link.label}
                        </div>
                        <div className="text-sm">{link.text}</div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="border border-[#1a1a1a] p-4 inline-block">
                  <p className="font-mono text-[11px] text-gray-600 tracking-wide">
                    Open to AI/ML engineering opportunities
                    <br />
                    and research collaborations.
                  </p>
                </div>
              </div>
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
                    <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-wider uppercase">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      className="w-full bg-transparent border border-[#222] p-3.5 text-white text-sm placeholder-gray-800 transition-colors duration-300"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-wider uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-transparent border border-[#222] p-3.5 text-white text-sm placeholder-gray-800 transition-colors duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-mono text-[11px] tracking-wider border border-white px-6 py-3.5 hover:bg-white hover:text-black transition-all duration-300 uppercase"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-[#111] py-10 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-gray-400 tracking-wider">
              © 2025 PREET GHANSHYAM DAVE
            </p>
            <p className="font-mono text-[10px] text-gray-500 tracking-wider">
              BUILT WITH NEXT.JS + TAILWIND
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
