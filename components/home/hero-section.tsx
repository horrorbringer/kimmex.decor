import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="commerce-band">
      <div className="content-shell grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Materials. Interiors. Project support.</p>
          <h1 className="font-serif text-5xl leading-[1.05] text-ink-900 md:text-6xl xl:text-7xl">
            Build better interiors with the right products and team.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink-700 md:text-lg">
            Explore construction materials, interior decor services, and completed project references from Kimmex
            Decor in Phnom Penh.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="action-commerce" href="/products">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a className="action-secondary" href="/services">
              Explore Services
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-sand-400 pt-6 text-sm font-medium text-ink-700">
            {["Multi-brand supply", "Interior solutions", "Residential and commercial"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-red" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-sand-400 bg-sand-100 shadow-panel md:min-h-[560px]">
          <img
            alt="Modern interior ceiling and living space"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent p-6 pt-24 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">One connected offering</p>
            <p className="mt-2 max-w-lg font-serif text-2xl leading-tight md:text-3xl">
              Products for the build. Services for the finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
