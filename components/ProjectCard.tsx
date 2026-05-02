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
      className="group rich-card bg-white/[0.025] backdrop-blur-xl border border-white/[0.07] rounded-xl hover:bg-white/[0.045] hover:border-[#C9A86A]/30 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)] transition-all duration-500 cursor-pointer h-full flex flex-col overflow-hidden lift"
    >
      {project.image_url && (
        <div className="relative w-full h-44 shrink-0">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ filter: "saturate(1.04) contrast(1.02)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0908]" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-white/85 group-hover:text-white transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
        </div>
        <span className="inline-block self-start font-mono text-[10px] px-2 py-0.5 border border-white/[0.12] text-white/55 mb-3 tracking-wide rounded-md bg-white/[0.025]">
          {project.category}
        </span>
        <p className="text-white/55 text-[13px] mb-4 leading-relaxed flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {project.tech_tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.07] text-white/45 rounded-md group-hover:border-[#C9A86A]/30 group-hover:text-white/75 transition-all duration-500"
            >
              {tag}
            </span>
          ))}
          {project.tech_tags.length > 4 && (
            <span className="font-mono text-[9px] px-2 py-0.5 text-white/35">+{project.tech_tags.length - 4}</span>
          )}
        </div>
        <GitHubBadge repoUrl={project.repo_url} />
      </div>
    </div>
  );
}
