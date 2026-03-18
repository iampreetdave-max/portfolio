"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NeuralNetwork from "@/components/NeuralNetwork";
import MatrixRain from "@/components/MatrixRain";
import TypewriterText from "@/components/TypewriterText";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import type { Project } from "@/lib/supabase-server";
import { getSupabase } from "@/lib/supabase";

const skills = [
  {
    title: "Deep Learning & Neural Networks",
    items: [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "CNNs",
      "Transformers",
      "Neural Network Optimization",
    ],
  },
  {
    title: "Computer Vision & NLP",
    items: [
      "TrOCR",
      "Image Processing",
      "NLP",
      "Vector Embeddings & Search",
    ],
  },
  {
    title: "Machine Learning",
    items: [
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Regression & Classification",
      "Feature Engineering",
    ],
  },
  {
    title: "Development & Deployment",
    items: [
      "Python (Advanced)",
      "C++",
      "JavaScript",
      "Full-Stack",
      "API Development",
      "ML Pipeline Automation",
    ],
  },
];

const experience = [
  {
    role: "Trainee Software Engineer",
    period: "Sep 2025 – Present",
    company: "Agility Innovations Pvt. Ltd., Ahmedabad",
    description:
      "AI-powered product pipelines, ML solutions in production, full-stack with neural network integration",
  },
  {
    role: "Machine Learning Intern",
    period: "2025",
    company: "Oasis Infobyte, Remote",
    description:
      "ML projects, neural network architectures, end-to-end ML pipeline development",
  },
  {
    role: "AI Research Lead",
    period: "2024–2025",
    company: "Smart India Hackathon & Rotaract Club Hackathon",
    description:
      "Computer vision, TrOCR systems, led AI research teams",
  },
];

const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "TalkToNotes",
    category: "Computer Vision / NLP",
    description:
      "OCR system using TrOCR transformer, neural embeddings, chatbot KB integration",
    tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search"],
    demo_url: null,
    repo_url: "https://github.com/iampreetdave/TalkNotes",
    image_url: null,
    is_featured: true,
    display_order: 1,
    created_at: "",
  },
  {
    id: "2",
    title: "Goal Prediction Model",
    category: "ML / Predictive Analytics",
    description:
      "6-algorithm regression benchmark pipeline, feature engineering, statistical analysis",
    tech_tags: [
      "Machine Learning",
      "Regression",
      "Statistical Modeling",
      "Python",
    ],
    demo_url: null,
    repo_url: null,
    image_url: null,
    is_featured: false,
    display_order: 2,
    created_at: "",
  },
  {
    id: "3",
    title: "StudBud",
    category: "Web / AI",
    description:
      "Student academic management with ML recommendations, adaptive scheduling",
    tech_tags: ["Web Development", "Machine Learning", "Data Analysis"],
    demo_url: null,
    repo_url: null,
    image_url: null,
    is_featured: false,
    display_order: 3,
    created_at: "",
  },
  {
    id: "4",
    title: "Neural Chat System",
    category: "Network / AI",
    description:
      "Real-time socket communication system with AI integration potential",
    tech_tags: ["Python", "Socket Programming", "Network Architecture"],
    demo_url: null,
    repo_url: null,
    image_url: null,
    is_featured: false,
    display_order: 4,
    created_at: "",
  },
];

const filterMap: Record<string, string[]> = {
  "ML Models": ["ML", "Machine Learning", "Predictive Analytics", "Computer Vision", "NLP"],
  Automation: ["Automation", "Pipeline"],
  Research: ["Research", "AI"],
  Web: ["Web"],
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-mono text-sm text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [matrixOn, setMatrixOn] = useState(false);
  const [neuralPaused, setNeuralPaused] = useState(false);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await getSupabase()
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true });
        if (!error && data && data.length > 0) {
          setProjects(data);
        }
      } catch {
        // Use fallback projects
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => {
          const keywords = filterMap[filter] || [];
          return keywords.some(
            (kw) =>
              p.category.toLowerCase().includes(kw.toLowerCase()) ||
              p.tech_tags.some((t) =>
                t.toLowerCase().includes(kw.toLowerCase())
              )
          );
        });

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const navLinks = (
    <>
      <NavLink href="#home">Home</NavLink>
      <NavLink href="#about">About</NavLink>
      <NavLink href="#skills">Skills</NavLink>
      <NavLink href="#projects">Projects</NavLink>
      <NavLink href="#experience">Experience</NavLink>
      <NavLink href="#contact">Contact</NavLink>
    </>
  );

  return (
    <>
      <NeuralNetwork paused={neuralPaused} />
      {matrixOn && <MatrixRain />}

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#home" className="font-mono text-lg font-bold tracking-tight">
            PD
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
            <button
              onClick={() => {
                setNeuralPaused(!neuralPaused);
                setMatrixOn(!matrixOn);
              }}
              className="font-mono text-xs border border-border px-2 py-1 text-gray-500 hover:text-white hover:border-white transition-colors"
              title="Toggle matrix rain"
            >
              {matrixOn ? "⏸" : "▶"} Matrix
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-sm border border-border px-2 py-1"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-black/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3">
            {navLinks}
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
            >
              Preet Ghanshyam Dave
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6"
            >
              <TypewriterText />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="border border-border bg-black/60 backdrop-blur-sm p-6 mb-8 text-left"
            >
              <p className="text-gray-400 text-sm leading-relaxed">
                Building intelligent systems with deep learning, computer vision,
                and advanced ML algorithms. Currently pursuing B.Tech in Computer
                Science (AI-ML) while working as a Trainee Software Engineer at
                Agility Innovations Pvt. Ltd., Ahmedabad.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="#contact"
                className="font-mono text-sm border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
              >
                Contact
              </a>
              <a
                href="https://github.com/iampreetdave"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-border px-6 py-2 text-gray-400 hover:border-white hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/preet-dave-452023271/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-border px-6 py-2 text-gray-400 hover:border-white hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="font-mono text-xs text-gray-500 mb-2 tracking-widest uppercase">
              About
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Who I Am</h3>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl">
              I am an AI-ML Engineer passionate about building intelligent systems
              that solve real-world problems. With expertise in deep learning,
              computer vision, and natural language processing, I develop
              end-to-end machine learning pipelines — from data preprocessing and
              feature engineering to model deployment and optimization. Currently
              pursuing my B.Tech in Computer Science (AI-ML) while gaining
              hands-on industry experience as a Trainee Software Engineer, I
              bridge the gap between cutting-edge research and production-ready
              solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: "3", label: "ML Projects" },
                { num: "3+", label: "Automations" },
                { num: "2", label: "Internships" },
                { num: "1", label: "Hackathon Win" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border p-4 text-center"
                >
                  <div className="text-2xl font-bold font-mono">{stat.num}</div>
                  <div className="font-mono text-xs text-gray-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-24 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="font-mono text-xs text-gray-500 mb-2 tracking-widest uppercase">
              Skills
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Technical Expertise
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.title} className="border border-border p-6">
                  <h4 className="font-mono text-sm font-semibold mb-4">
                    {cat.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs px-2 py-1 border border-border/50 text-gray-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="font-mono text-xs text-gray-500 mb-2 tracking-widest uppercase">
              Projects
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Featured Work
            </h3>
            <ProjectFilter active={filter} onChange={setFilter} />
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <p className="text-gray-500 font-mono text-sm text-center py-12">
                No projects match this filter.
              </p>
            )}
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-24 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="font-mono text-xs text-gray-500 mb-2 tracking-widest uppercase">
              Experience
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Work History
            </h3>
            <div className="space-y-0">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-8 pb-10 border-l border-border last:pb-0"
                >
                  <div className="absolute left-0 top-1 w-2 h-2 bg-white -translate-x-[4.5px]" />
                  <div className="font-mono text-xs text-gray-500 mb-1">
                    {exp.period}
                  </div>
                  <h4 className="text-lg font-semibold mb-1">{exp.role}</h4>
                  <div className="font-mono text-xs text-gray-400 mb-2">
                    {exp.company}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="font-mono text-xs text-gray-500 mb-2 tracking-widest uppercase">
              Contact
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Get In Touch</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="space-y-4 mb-8">
                  <a
                    href="mailto:preetdave&#64;gmail.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <span className="font-mono text-xs border border-border w-8 h-8 flex items-center justify-center">
                      @
                    </span>
                    Email
                  </a>
                  <a
                    href="tel:+919081025277"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <span className="font-mono text-xs border border-border w-8 h-8 flex items-center justify-center">
                      #
                    </span>
                    +91 90810 25277
                  </a>
                  <a
                    href="https://github.com/iampreetdave"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <span className="font-mono text-xs border border-border w-8 h-8 flex items-center justify-center">
                      GH
                    </span>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/preet-dave-452023271/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <span className="font-mono text-xs border border-border w-8 h-8 flex items-center justify-center">
                      IN
                    </span>
                    LinkedIn
                  </a>
                </div>
                <p className="font-mono text-xs text-gray-500 border border-border inline-block px-3 py-1.5">
                  Open to AI/ML engineering opportunities and collaborations
                </p>
              </div>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-black border border-border p-3 text-white text-sm focus:border-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-black border border-border p-3 text-white text-sm focus:border-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-black border border-border p-3 text-white text-sm focus:border-white outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="font-mono text-sm border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border py-8 px-6 text-center">
          <p className="font-mono text-xs text-gray-600">
            © 2025 Preet Ghanshyam Dave. Built with Next.js.
          </p>
        </footer>
      </main>
    </>
  );
}
