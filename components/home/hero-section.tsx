export function HeroSection() {
  return (
    <section className="section-shell grid gap-10 pb-24 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <p className="eyebrow">Kimmex Decor</p>
        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-ink-900 md:text-7xl">
          Bright interiors, curated materials, and project-ready decor solutions.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink-700">
          Kimmex Decor brings together shoppable construction materials, decor services, and smart living solutions for
          homes, commercial spaces, and project teams.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a className="action-primary" href="#services">
            Explore Services
          </a>
          <a className="action-secondary" href="/products">
            Shop Products
          </a>
        </div>
        <div className="mt-10 grid gap-4 border-t border-sand-400 pt-6 text-sm text-ink-700 sm:grid-cols-3">
          <div>Multi-brand materials</div>
          <div>Custom decor solutions</div>
          <div>Project support</div>
        </div>
      </div>
      <div className="surface-card overflow-hidden">
        <img
          alt="Modern Kimmex Decor interior"
          className="h-[420px] w-full object-cover md:h-[560px]"
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
        />
      </div>
    </section>
  );
}
