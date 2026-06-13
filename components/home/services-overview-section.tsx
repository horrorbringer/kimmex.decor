import { ArrowRight } from "lucide-react";
import { services } from "@/lib/homepage-data";

export function ServicesOverviewSection() {
  return (
    <section className="bg-sand-200/55" id="services">
      <div className="section-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Service Showcase</p>
            <h2 className="section-title max-w-3xl">Interior services from planning through finishing.</h2>
            <p className="section-copy mt-4">
              KMD connects material selection with practical interior solutions for homes, offices, and commercial spaces.
            </p>
          </div>
          <a className="action-primary w-fit" href="/services">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <a
              key={service.id}
              className="group relative min-h-[380px] overflow-hidden rounded-lg border border-sand-400 bg-ink-900 shadow-soft"
              href={service.href}
            >
              <img
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-65"
                src={service.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">KMD Service</p>
                <h3 className="mt-2 font-serif text-3xl leading-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/80">{service.description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold">
                  Explore service
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
