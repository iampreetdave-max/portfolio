"use client";

import { useState, useEffect, useCallback } from "react";
import AdminProjectForm from "@/components/AdminProjectForm";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech_tags: string[];
  demo_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  is_featured: boolean;
  display_order: number;
}

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

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ProjectFormData | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function handleSubmit(data: ProjectFormData) {
    const tags = data.tech_tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const body = {
      ...data,
      tech_tags: tags,
      demo_url: data.demo_url || null,
      repo_url: data.repo_url || null,
      image_url: data.image_url || null,
    };

    const method = data.id ? "PUT" : "POST";
    await fetch("/api/admin/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowForm(false);
    setEditing(undefined);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProjects();
  }

  function startEdit(project: Project) {
    setEditing({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      tech_tags: project.tech_tags.join(", "),
      demo_url: project.demo_url || "",
      repo_url: project.repo_url || "",
      image_url: project.image_url || "",
      is_featured: project.is_featured,
      display_order: project.display_order,
    });
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-mono text-lg font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              setEditing(undefined);
              setShowForm(!showForm);
            }}
            className="font-mono text-sm border border-border px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Project"}
          </button>
        </div>

        {showForm && (
          <div className="border border-border p-6 mb-8">
            <h2 className="font-mono text-sm text-gray-400 mb-4">
              {editing?.id ? "Edit Project" : "New Project"}
            </h2>
            <AdminProjectForm
              initial={editing}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditing(undefined);
              }}
            />
          </div>
        )}

        {loading ? (
          <p className="font-mono text-sm text-gray-500">Loading...</p>
        ) : (
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-mono text-xs text-gray-500 text-left p-3">
                    Title
                  </th>
                  <th className="font-mono text-xs text-gray-500 text-left p-3">
                    Category
                  </th>
                  <th className="font-mono text-xs text-gray-500 text-left p-3">
                    Tags
                  </th>
                  <th className="font-mono text-xs text-gray-500 text-right p-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-border/50 hover:bg-white/5"
                  >
                    <td className="p-3 font-mono text-xs">{project.title}</td>
                    <td className="p-3 font-mono text-xs text-gray-400">
                      {project.category}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {project.tech_tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-1.5 py-0.5 border border-border/50 text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tech_tags.length > 3 && (
                          <span className="font-mono text-[10px] text-gray-600">
                            +{project.tech_tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(project)}
                          className="font-mono text-xs border border-border px-2 py-1 hover:border-white transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="font-mono text-xs border border-border px-2 py-1 text-red-400 hover:border-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-6 text-center font-mono text-xs text-gray-600"
                    >
                      No projects yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
