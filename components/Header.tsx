import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-10">
      <Link
        href="/"
        className="font-display text-lg font-bold tracking-tight text-ink"
      >
        Cláudia Vieira
      </Link>
      <nav className="flex items-center gap-6 text-sm text-ink-soft">
        <a href="#sobre" className="transition-colors hover:text-ink">
          About
        </a>
        <a href="#contacto" className="transition-colors hover:text-ink">
          Contact
        </a>
      </nav>
    </header>
  );
}
