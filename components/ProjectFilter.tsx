"use client";

const filters = ["All", "ML Models", "Automation", "Research", "Web"];

export default function ProjectFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (filter: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
            active === filter
              ? "bg-white text-black border-white"
              : "border-border text-gray-400 hover:border-white/50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
