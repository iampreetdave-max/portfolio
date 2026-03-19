"use client";

import { motion } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech_tags: string[];
  repo_url?: string | null;
  demo_url?: string | null;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const linkUrl = project.repo_url || "https://github.com/iampreetdave";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group border border-[#222] p-6 bg-black/40 backdrop-blur-sm hover:border-white/40 transition-all duration-500 hover:bg-white/[0.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <span className="font-mono text-[10px] tracking-wider text-gray-600 mt-1">
          0{project.id}
        </span>
      </div>
      <span className="inline-block font-mono text-[11px] px-2.5 py-1 border border-[#333] text-gray-500 mb-4 tracking-wide">
        {project.category}
      </span>
      <p className="text-gray-400 text-sm mb-5 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech_tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 border border-[#1a1a1a] text-gray-600 group-hover:border-[#333] group-hover:text-gray-500 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-mono text-xs border border-[#333] px-4 py-1.5 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        View Source →
      </a>
    </motion.div>
  );
}
