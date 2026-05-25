import { services } from "@/lib/homepage-data";

export function ServicesOverviewSection() {
  return (
    <section id="services" className="section-shell">
      <p className="eyebrow">Services</p>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title">Services that turn product selection into finished project work.</h2>
          <p className="section-copy mt-4">
            Use this section to connect shoppers from materials into consultation, quotation, installation guidance,
            and finish planning.
          </p>
        </div>
        <a className="action-commerce w-fit" href="#contact">
          Start an Inquiry
        </a>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="surface-card overflow-hidden transition hover:-translate-y-0.5 hover:border-bronze-500 hover:shadow-panel">
            <div className="relative">
              <img alt={service.title} className="h-64 w-full object-cover" src={service.imageUrl} />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900">
                Service
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl text-ink-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-700">{service.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a className="action-secondary" href={service.href}>
                  Learn More
                </a>
                <a className="inline-flex items-center text-sm font-semibold text-bronze-500 transition hover:text-bronze-600" href="#contact">
                  Ask for quote
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
