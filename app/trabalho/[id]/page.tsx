import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";
import { colorForCategory } from "@/lib/palette";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-paper px-6 py-10 md:px-10">
      <Link href="/" className="mb-8 inline-block text-sm text-ink-soft hover:text-ink">
        ← back
      </Link>

      <div
        className="relative mx-auto mb-8 w-full max-w-3xl overflow-hidden rounded-xl bg-card"
        style={{ aspectRatio: "4 / 3" }}
      >
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">
          {project.title}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-2 rounded-md border border-ink/15 px-3 py-1 text-sm capitalize text-ink-soft"
            >
              <span className="tri" style={{ color: colorForCategory(cat).hex }} aria-hidden="true" />
              {cat}
            </span>
          ))}
        </div>
        {project.description && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            {project.description}
          </p>
        )}
        
      </div>
    </main>
  );
}