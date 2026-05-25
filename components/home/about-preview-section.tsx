export function AboutPreviewSection() {
  return (
    <section className="section-shell">
      <div className="grid gap-8 rounded-2xl border border-sand-400 bg-white p-6 shadow-soft lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-8">
        <div>
          <p className="eyebrow">About Kimmex Decor</p>
          <h2 className="section-title">Material supply, decor solutions, and project support in one place.</h2>
          <p className="section-copy mt-4">
            Kimmex Decor helps homeowners, contractors, and commercial buyers source ceiling systems, partition
            materials, decor boards, sanitaryware, smart-home products, and service support with a clearer buying flow.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["B2B + Retail", "Support for project buyers and home upgrades."],
            ["Project Packages", "Bundles for ceiling, partition, and bathroom work."],
            ["Service Ready", "Product selection can connect into consultation."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-xl border border-sand-400 bg-sand-50 p-5">
              <div className="font-serif text-2xl text-ink-900">{title}</div>
              <p className="mt-2 text-sm leading-6 text-ink-700">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
