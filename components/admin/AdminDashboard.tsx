"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";

export function AdminDashboard({
  initialProjects,
  supabaseConfigured,
}: {
  initialProjects: Project[];
  supabaseConfigured: boolean;
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "escolhe uma imagem." });
      return;
    }
    setSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("categories", categories);
    formData.set("image", file);

    const res = await fetch("/api/admin/projects", { method: "POST", body: formData });
    const body = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setMessage({ type: "error", text: body.error || "algo correu mal." });
      return;
    }

    setProjects((prev) => [body.project, ...prev]);
    setTitle("");
    setDescription("");
    setCategories("");
    setFile(null);
    setMessage({ type: "ok", text: "trabalho adicionado." });
  }

  async function handleDelete(id: string) {
    if (!confirm("remover este trabalho?")) return;
    const res = await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-paper px-6 py-10 md:px-10">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="tri" style={{ color: "var(--terracotta)" }} aria-hidden="true" />
          <h1 className="font-display text-lg font-semibold text-ink">gerir trabalhos</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-ink-soft">
          <Link href="/" className="hover:text-ink">
            ver site
          </Link>
          <button onClick={handleLogout} className="hover:text-ink">
            sair
          </button>
        </div>
      </div>

      {!supabaseConfigured && (
        <div className="mb-8 rounded-md border border-amber bg-amber/10 px-4 py-3 text-sm text-ink">
          o Supabase ainda não está configurado — a lista abaixo mostra os
          trabalhos de exemplo. Segue o README para ligar a base de dados
          real antes de adicionares trabalhos.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-12 max-w-xl rounded-xl border border-ink/10 bg-white/40 p-6"
      >
        <h2 className="font-display mb-4 text-sm font-semibold text-ink">
          novo trabalho
        </h2>

        <label className="mb-1 block text-sm text-ink-soft" htmlFor="title">
          título
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
          required
        />

        <label className="mb-1 block text-sm text-ink-soft" htmlFor="description">
          descrição (opcional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="mb-3 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
        />

        <label className="mb-1 block text-sm text-ink-soft" htmlFor="categories">
          categorias (separadas por vírgula — ex: infantil, editorial)
        </label>
        <input
          id="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="infantil, familiar"
          className="mb-3 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
          required
        />

        <label className="mb-1 block text-sm text-ink-soft" htmlFor="image">
          imagem
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full text-sm"
          required
        />

        {message && (
          <p
            className={`mb-3 text-sm ${
              message.type === "ok" ? "text-teal" : "text-terracotta"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity disabled:opacity-50"
        >
          {submitting ? "a adicionar…" : "adicionar trabalho"}
        </button>
      </form>

      <h2 className="font-display mb-4 text-sm font-semibold text-ink">
        trabalhos existentes
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {projects.map((project) => (
          <div key={project.id} className="overflow-hidden rounded-lg bg-card">
            <div className="relative aspect-square">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-2 py-2">
              <p className="truncate text-xs text-white">{project.title}</p>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-xs text-terracotta hover:underline"
              >
                remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
