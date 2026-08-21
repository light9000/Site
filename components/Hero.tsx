export function Hero() {
  return (
    <section className="px-6 pb-10 pt-6 md:px-10 md:pb-16 md:pt-10">
      <div className="flex items-end gap-3 md:gap-4">
        <span
          className="tri tri-lg"
          style={{ color: "var(--terracotta)" }}
          aria-hidden="true"
        />
        <span
          className="tri"
          style={{ color: "var(--teal)", marginBottom: "2px" }}
          aria-hidden="true"
        />
        <span
          className="tri"
          style={{ color: "var(--amber)", marginBottom: "5px" }}
          aria-hidden="true"
        />
      </div>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
        Bold colours. Strange ideas. Human stories.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
        Illustration exploring identity, emotions, relationships and imagination.
      </p>
    </section>
  );
}
