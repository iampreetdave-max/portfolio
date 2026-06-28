"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/components/ProjectCard";
import { ArrowUpRight, X, Github } from "lucide-react";
import GitHubBadge from "@/components/GitHubBadge";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl bg-surface border border-line-strong rounded-2xl max-h-[88vh] overflow-y-auto shadow-card"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-lg border border-line text-muted hover:text-paper hover:border-line-strong transition-colors z-10 bg-ink/60 backdrop-blur"
        >
          <X size={15} />
        </button>

        {project.image_url && (
          <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <span className="inline-flex items-center font-mono text-[11px] px-2.5 py-1 rounded-md border border-accent/30 text-accent bg-accent/[0.08] mb-4 tracking-wide">
            {project.category}
          </span>

          <h2 className="font-display text-2xl md:text-[28px] font-bold mb-5 tracking-tight pr-8 leading-tight text-paper">
            {project.title}
          </h2>

          <div className="text-[14px] text-muted leading-[1.85] mb-6 whitespace-pre-line">
            {project.longDescription}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-1">
            {project.tech_tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          <GitHubBadge repoUrl={project.repo_url} />

          <div className="mt-7 flex flex-wrap gap-3">
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live demo <ArrowUpRight size={15} />
              </a>
            )}
            {project.repo_url ? (
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github size={15} /> View repository
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-[12px] text-muted font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Code private · available on request
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
