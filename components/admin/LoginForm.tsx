"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Não foi possível entrar.");
      return;
    }
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-ink/10 bg-white/40 p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="tri" style={{ color: "var(--terracotta)" }} aria-hidden="true" />
          <h1 className="font-display text-lg font-semibold text-ink">
            área reservada
          </h1>
        </div>
        <label className="mb-1 block text-sm text-ink-soft" htmlFor="password">
          palavra-passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-terracotta"
          autoFocus
        />
        {error && <p className="mb-4 text-sm text-terracotta">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity disabled:opacity-50"
        >
          {loading ? "a entrar…" : "entrar"}
        </button>
      </form>
    </main>
  );
}
