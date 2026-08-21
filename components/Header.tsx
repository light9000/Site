import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { BehanceIcon, PinterestIcon, RedbubbleIcon, CaraIcon } from "./SocialIcons";

export function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
      <Link
        href="/"
        className="font-display text-lg font-bold tracking-tight text-ink"
      >
        Cláudia Vieira
      </Link>
      <nav className="flex flex-wrap items-center gap-6 text-sm text-ink-soft">
        <a href="#sobre" className="transition-colors hover:text-ink">
          About
        </a>
        <a href="#contacto" className="transition-colors hover:text-ink">
          Contact
        </a>
        <div className="flex items-center gap-3 border-l border-[#d28203] pl-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="transition-opacity hover:opacity-80"
            >
              {link.name === "Redbubble" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink">
                  <RedbubbleIcon className="h-3.5 w-3.5" />
                </span>
              )}
              {link.name === "Cara" && <CaraIcon className="h-7 w-7" />}
              {link.name === "Behance" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink">
                  <BehanceIcon className="h-3.5 w-3.5" />
                </span>
              )}
              {link.name === "Pinterest" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink">
                  <PinterestIcon className="h-3.5 w-3.5" />
                </span>
              )}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}