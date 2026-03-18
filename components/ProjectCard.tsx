"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/supabase-server";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-border p-6 bg-black/50 backdrop-blur-sm hover:border-white/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{project.title}</h3>
      </div>
      <span className="inline-block font-mono text-xs px-2 py-1 border border-border text-gray-400 mb-3">
        {project.category}
      </span>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech_tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-0.5 border border-border/50 text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>
      {(project.repo_url || project.demo_url) && (
        <div className="flex gap-3">
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs border border-border px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
            >
              GitHub →
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs border border-border px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
            >
              Demo →
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
