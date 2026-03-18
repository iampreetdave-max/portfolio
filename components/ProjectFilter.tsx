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
    <div className="flex flex-wrap gap-2 mb-10">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`font-mono text-[11px] tracking-wide px-4 py-2 border transition-all duration-300 ${
            active === filter
              ? "bg-white text-black border-white"
              : "border-[#333] text-gray-500 hover:border-white/40 hover:text-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
