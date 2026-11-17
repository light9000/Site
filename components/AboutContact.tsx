import { SOCIAL_LINKS } from "@/lib/social-links";


export function AboutContact() {
  return (
    <>
      <section id="sobre" className="px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex items-start">
            <span className="tri" style={{ color: "var(--maroon)" }} aria-hidden="true" />
            <h2 className="font-display ml-3 text-base font-semibold text-ink">
              About me
            </h2>
          <div className="max-w-xl space-y-4 text-base leading-relaxed text-ink-soft">
  <p className="font-display text-lg font-semibold text-ink">
    Welcome to my creative space!
  </p>
  <p>
    I'm an independent artist creating digital illustrations and designs inspired by imagination, colour and everyday moments.
  </p>
  <p>
    My work ranges from expressive artwork and visual concepts to greeting cards and creative designs made to bring a little personality, humour and colour into everyday life.
  </p>
  <p>
    I enjoy exploring different ideas, combining shapes, colours and visual storytelling to create distinctive pieces.
  </p>
  <p>
    Thank you for being here and supporting independent creativity!
  </p>
</div>
      </section>

      <section id="contacto" className="px-6 py-16 md:px-10 md:py-24" style={{ background: "var(--contact-bg)"}}>
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="flex items-start">
            <span className="tri" style={{ color: "var(--amber)" }} aria-hidden="true" />
            <h2 className="font-display ml-3 text-base font-semibold text-[#d28203]">
              Contact
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-paper/80">
              Available for freelance work. If you have a project in mind or just want to say hello, feel free to reach out!
            </p>
            <a
              href="mailto:claudiaaribeiroo94@gmail.com"
                            className="font-display mt-4 inline-block text-2xl font-bold text-[#d28203] md:text-3xl"
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
