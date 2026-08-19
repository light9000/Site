export function AboutContact() {
  return (
    <>
      <section id="sobre" className="px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex items-start">
            <span className="tri" style={{ color: "var(--maroon)" }} aria-hidden="true" />
            <h2 className="font-display ml-3 text-base font-semibold text-ink">
              About
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink-soft">
            Illustrator and designer with a style based on solid colors and geometric shapes. Works across children's, family, and editorial themes, always seeking the story behind each piece.
          </p>
        </div>
      </section>

      <section
        id="contacto"
        className="px-6 py-16 md:px-10 md:py-24"
        style={{ background: "var(--paper-dim)" }}
      >
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex items-start">
            <span className="tri" style={{ color: "var(--teal)" }} aria-hidden="true" />
            <h2 className="font-display ml-3 text-base font-semibold text-ink">
              Contact
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">
              Available for freelance work. If you have a project in mind or just want to say hello, feel free to reach out!
            </p>
            <a
              href="mailto:claudiaaribeiroo94@gmail.com"
              className="font-display mt-4 inline-block text-2xl font-bold text-ink underline decoration-terracotta decoration-2 underline-offset-4 md:text-3xl"
            >
              Let's work together 💻
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-6 text-xs text-ink-soft md:px-10">
      <span>HugoVieira© {new Date().getFullYear()}</span>
      <a href="/admin" className="transition-colors hover:text-ink">
        Reserved Area
      </a>
    </footer>
  );
}
