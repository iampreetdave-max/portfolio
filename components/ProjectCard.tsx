"use client";

import Image from "next/image";
import GitHubBadge from "@/components/GitHubBadge";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech_tags: string[];
  image_url?: string;
  repo_url?: string | null;
  demo_url?: string | null;
}

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="card group cursor-pointer h-full flex flex-col overflow-hidden"
    >
      {project.image_url && (
        <div className="relative w-full h-40 shrink-0 overflow-hidden">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <span className="chip self-start mb-3">{project.category}</span>
        <h3 className="font-display text-[16px] font-semibold text-paper mb-2 leading-snug group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-[13.5px] text-muted leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech_tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-line text-faint group-hover:text-muted group-hover:border-line-strong transition-colors"
            >
              {tag}
            </span>
          ))}
          {project.tech_tags.length > 4 && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 text-faint">
              +{project.tech_tags.length - 4}
            </span>
          )}
        </div>
        <GitHubBadge repoUrl={project.repo_url} />
      </div>
    </div>
  );
}
