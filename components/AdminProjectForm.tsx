"use client";

import { useState } from "react";

interface ProjectFormData {
  id?: string;
  title: string;
  category: string;
  description: string;
  tech_tags: string;
  demo_url: string;
  repo_url: string;
  image_url: string;
  is_featured: boolean;
  display_order: number;
}

export default function AdminProjectForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProjectFormData>(
    initial || {
      title: "",
      category: "",
      description: "",
      tech_tags: "",
      demo_url: "",
      repo_url: "",
      image_url: "",
      is_featured: false,
      display_order: 0,
    }
  );

  const inputClass =
    "w-full bg-white/[0.02] border border-white/[0.08] p-2.5 text-white font-mono text-sm rounded-md focus:border-white/40 outline-none";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block font-mono text-xs text-white/45 mb-1">
          Title
        </label>
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block font-mono text-xs text-white/45 mb-1">
          Category
        </label>
        <input
          className={inputClass}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block font-mono text-xs text-white/45 mb-1">
          Description
        </label>
        <textarea
          className={inputClass + " h-24 resize-none"}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block font-mono text-xs text-white/45 mb-1">
          Tech Tags (comma separated)
        </label>
        <input
          className={inputClass}
          value={form.tech_tags}
          onChange={(e) => setForm({ ...form, tech_tags: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs text-white/45 mb-1">
            Demo URL
          </label>
          <input
            className={inputClass}
            value={form.demo_url}
            onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-white/45 mb-1">
            Repo URL
          </label>
          <input
            className={inputClass}
            value={form.repo_url}
            onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block font-mono text-xs text-white/45 mb-1">
          Image URL
        </label>
        <input
          className={inputClass}
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs text-white/45 mb-1">
            Display Order
          </label>
          <input
            type="number"
            className={inputClass}
            value={form.display_order}
            onChange={(e) =>
              setForm({ ...form, display_order: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 font-mono text-xs text-white/65 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) =>
                setForm({ ...form, is_featured: e.target.checked })
              }
              className="accent-white"
            />
            Featured
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="font-mono text-sm px-4 py-2 bg-white text-black hover:bg-white/85 rounded-md transition-colors"
        >
          {initial?.id ? "Update" : "Create"} Project
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="font-mono text-sm px-4 py-2 border border-white/[0.12] text-white/65 hover:border-white/40 hover:text-white rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
