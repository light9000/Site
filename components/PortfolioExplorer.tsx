"use client";

import { useMemo, useState } from "react";
import { Project } from "@/lib/types";
import { colorForCategory } from "@/lib/palette";
import { ProjectCard } from "./ProjectCard";

export function PortfolioExplorer({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const project of projects) {
      for (const category of project.categories) set.add(category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "pt"));
  }, [projects]);

  const [active, setActive] = useState<string>("All");

  const visibleCategories =
    active === "All" ? categories : categories.filter((c) => c === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-ink/10 px-6 pb-6 md:px-10">
        <FilterPill
          label="All"
          active={active === "All"}
          onClick={() => setActive("All")}
        />
        {categories.map((category) => (
          <FilterPill
            key={category}
            label={category}
            color={colorForCategory(category).hex}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>

      <div className="px-6 md:px-10">
        {visibleCategories.length === 0 && (
          <p className="py-16 text-center text-sm text-ink-soft">
            ainda não há trabalhos nesta categoria.
          </p>
        )}
        {visibleCategories.map((category) => {
          const items = projects.filter((p) => p.categories.includes(category));
          if (items.length === 0) return null;
          const color = colorForCategory(category);
          return (
            <section key={category} className="py-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="tri" style={{ color: color.hex }} aria-hidden="true" />
                <h2 className="font-display text-base font-semibold text-ink">
                  {category}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:auto-rows-[1fr]">
                {items.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={index === 0 && items.length > 1}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border px-3.5 py-1.5 text-sm capitalize transition-colors"
      style={
        active
          ? {
              background: color ?? "var(--ink)",
              borderColor: color ?? "var(--ink)",
              color: "var(--paper)",
            }
          : {
              background: "transparent",
              borderColor: "color-mix(in oklab, var(--ink) 20%, transparent)",
              color: "var(--ink-soft)",
            }
      }
    >
      {label}
    </button>
  );
}
