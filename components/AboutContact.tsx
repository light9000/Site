export function AboutContact() {
  return (
    <>
      <section id="sobre" className="px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex items-start">
            <span className="tri" style={{ color: "var(--maroon)" }} aria-hidden="true" />
            <h2 className="font-display ml-3 text-base font-semibold text-ink">
              sobre
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink-soft">
            Ilustradora e designer com um estilo assente em cores sólidas e
            formas geométricas. Trabalha entre o infantil, o familiar e o
            editorial, sempre à procura da história por trás de cada peça.
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
              contacto
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">
              Disponível para novos projetos de ilustração e design.
            </p>
            <a
              href="mailto:ola@exemplo.com"
              className="font-display mt-4 inline-block text-2xl font-bold text-ink underline decoration-terracotta decoration-2 underline-offset-4 md:text-3xl"
            >
              ola@exemplo.com
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
      <span>claudia v. © {new Date().getFullYear()}</span>
      <a href="/admin" className="transition-colors hover:text-ink">
        área reservada
      </a>
    </footer>
  );
}
