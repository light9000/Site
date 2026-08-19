"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";



export function AdminDashboard({
  initialProjects,
  supabaseConfigured,
  initialCategories,
}: {
  initialProjects: Project[];
  supabaseConfigured: boolean;
  initialCategories: string[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [printLinks, setPrintLinks] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );
  const router = useRouter();

  async function handleAddCategory() {
  const name = newCategory.trim().toLowerCase();
  if (!name || availableCategories.includes(name)) return;
  const res = await fetch("/api/admin/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (res.ok) {
    setAvailableCategories((prev) => [...prev, name].sort());
    setNewCategory("");
  }
}

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!editingId && !file) {
    setMessage({ type: "error", text: "choose an image." });
    return;
  }
  setSubmitting(true);
  setMessage(null);

  try {
    let uploadFile = file;
    if (uploadFile) {
      uploadFile = await resizeImage(uploadFile);
    }

    const formData = new FormData();
    if (editingId) formData.set("id", editingId);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("categories", categories.join(","));
    formData.set("print_links", printLinks);
    if (uploadFile) formData.set("image", uploadFile);

    const res = await fetch("/api/admin/projects", {
      method: editingId ? "PATCH" : "POST",
      body: formData,
    });

    let body: { project?: Project; error?: string } = {};
    try {
      body = await res.json();
    } catch {
      body = { error: "invalid server response." };
    }

    if (!res.ok) {
      setMessage({ type: "error", text: body.error || "something went wrong." });
      return;
    }

    if (editingId) {
      setProjects((prev) => prev.map((p) => (p.id === editingId ? body.project! : p)));
      setMessage({ type: "ok", text: "work updated." });
    } else {
      setProjects((prev) => [body.project!, ...prev]);
      setMessage({ type: "ok", text: "work added." });
    }
    resetForm();
  } catch {
    setMessage({ type: "error", text: "network error — try again." });
  } finally {
    setSubmitting(false);
  }
}

function resetForm() {
  setEditingId(null);
  setTitle("");
  setDescription("");
  setCategories([]);
  setPrintLinks("");
  setFile(null);
}

function startEdit(project: Project) {
  setEditingId(project.id);
  setTitle(project.title);
  setDescription(project.description || "");
  setCategories(project.categories);
  setPrintLinks((project.print_links || []).join(", "));
  setFile(null);
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  {editingId ? "editar trabalho" : "novo trabalho"}
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
        <div className="mb-2 flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCategory();
              }
            }}
            placeholder="nova categoria"
            className="flex-1 rounded-md border border-ink/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-terracotta"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="rounded-md border border-ink/20 px-3 py-1.5 text-sm text-ink-soft hover:border-ink"
          >
            + adicionar
          </button>
        </div>

        <label className="mb-1 block text-sm text-ink-soft">categorias</label> <div className="mb-3 flex flex-wrap gap-2"> {availableCategories.map((cat) => { const selected = categories.includes(cat); return ( <button type="button" key={cat} onClick={() => setCategories((prev) => selected ? prev.filter((c) => c !== cat) : [...prev, cat] ) } className={`rounded-md border px-3 py-1.5 text-sm capitalize ${ selected ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink-soft" }`} > {cat} </button> ); })} </div>

        <label className="mb-1 block text-sm text-ink-soft" htmlFor="print_links">
          links externos (opcional — separados por vírgula)
        </label>
        <input
          id="print_links"
          value={printLinks}
          onChange={(e) => setPrintLinks(e.target.value)}
          placeholder="https://redbubble.com/..., https://society6.com/..."
          className="mb-3 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
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
          required={!editingId}
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
            <div className="flex items-center justify-between gap-2 px-2 py-2">
  <p className="truncate text-xs text-white">{project.title}</p>
  <div className="flex shrink-0 gap-1.5">
    <button
      onClick={() => startEdit(project)}
      className="rounded border border-white/30 px-2 py-0.5 text-xs text-white hover:bg-white hover:text-ink"
    >
      editar
    </button>
    <button
      onClick={() => handleDelete(project.id)}
      className="rounded border border-terracotta px-2 py-0.5 text-xs text-terracotta hover:bg-terracotta hover:text-white"
    >
      remover
    </button>
  </div>
</div>
          </div>
        ))}
      </div>
    </main>
  );
}

async function resizeImage(file: File, maxDimension = 2000, quality = 0.85): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality)
  );
  if (!blob) return file;

  return new File([blob.slice(0, blob.size, blob.type)], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
    type: "image/jpeg",
  });
}
