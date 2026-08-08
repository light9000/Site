import Image from "next/image";
import { Project } from "@/lib/types";
import { colorForCategory } from "@/lib/palette";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const primaryCategory = project.categories[0];
  const color = primaryCategory ? colorForCategory(primaryCategory) : null;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-card ${
        featured ? "aspect-4/3 md:col-span-2 md:row-span-2" : "aspect-4/3"
      }`}
    >
      <Image
        src={project.image_url}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-3 bottom-3 flex translate-y-1 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {color && (
          <span className="tri" style={{ color: color.hex }} aria-hidden="true" />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{project.title}</p>
          {primaryCategory && (
            <p className="truncate text-xs text-white/70">{primaryCategory}</p>
          )}
        </div>
      </div>
    </div>
  );
}
