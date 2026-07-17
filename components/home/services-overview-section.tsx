import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/lib/homepage-data";
import { blurPlaceholder } from "@/lib/blur-placeholder";

type ServicesOverviewSectionProps = {
  services: ServiceItem[];
};

export function ServicesOverviewSection({ services }: ServicesOverviewSectionProps) {
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
          <Link className="action-primary w-fit" href="/services">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="group overflow-hidden rounded-lg border border-sand-400 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-panel"
            >
              <Link className="relative block h-64 overflow-hidden bg-ink-900" href={service.href}>
                <Image
                  alt={service.title}
                  className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder()}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  src={service.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-md bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-900">
                  KMD Service
                </span>
              </Link>
              <div className="grid min-h-[250px] content-between gap-5 p-5">
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-ink-900">
                    <Link className="transition hover:text-brand-red" href={service.href}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-700">{service.description}</p>
                </div>
                <div className="grid gap-2 border-t border-sand-400 pt-4">
                  <Link className="action-commerce min-h-10 gap-2 px-3 py-2 text-xs" href={`/contact?service=${encodeURIComponent(service.id)}#request-form`}>
                    Request quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link className="action-secondary min-h-10 px-3 py-2 text-xs" href={service.href}>
                    View scope
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
