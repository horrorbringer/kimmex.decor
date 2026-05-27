import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { serviceDetails } from "@/lib/service-data";
import { services } from "@/lib/homepage-data";
import { ArrowRight, Camera, ClipboardCheck, MapPin, PackageCheck, Ruler, Truck } from "lucide-react";

const quoteSteps = [
  {
    Icon: Camera,
    title: "Share photos or drawings",
    copy: "Send room photos, ceiling references, floor plans, BOQ, or material screenshots."
  },
  {
    Icon: Ruler,
    title: "Confirm size and scope",
    copy: "KMD reviews room size, location, supply-only needs, installation needs, and timing."
  },
  {
    Icon: PackageCheck,
    title: "Receive material direction",
    copy: "Get recommended products, package options, delivery notes, and project quote guidance."
  }
];

const prepareItems = [
  { Icon: Camera, label: "Room or material photo" },
  { Icon: Ruler, label: "Approximate size" },
  { Icon: MapPin, label: "Project location" },
  { Icon: Truck, label: "Supply-only or install" }
];

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-12 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="eyebrow">KMD Services</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Plan ceiling, wall, furniture, and smart-home work with material support.
            </h1>
            <p className="section-copy mt-6">
              Choose the service closest to your project, then send photos, size, and location. Kimmex Decor can connect
              the service scope with recommended products, package options, and quote support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="#service-list">
                View Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-secondary" href="/contact">
                Request Consultation
              </a>
            </div>
          </div>
          <div className="surface-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">Prepare for quote</p>
            <div className="mt-4 grid gap-3">
              {prepareItems.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-md border border-sand-400 bg-sand-50 p-3 text-sm font-semibold text-ink-900">
                  <Icon className="h-4 w-4 text-brand-red" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-10" id="service-list">
        <div className="mb-6 flex flex-col gap-3 border-b border-sand-400 pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Service quote paths</p>
            <h2 className="mt-1 font-serif text-3xl text-ink-900">Choose the work you need</h2>
          </div>
          <a className="w-fit text-sm font-semibold text-bronze-500" href="/products">
            Browse related products
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="surface-card overflow-hidden">
              <a href={service.href}>
                <img alt={service.title} className="h-64 w-full object-cover transition duration-300 hover:scale-105" src={service.imageUrl} />
              </a>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">Service</p>
                <h2 className="font-serif text-3xl text-ink-900">
                  <a className="transition hover:text-brand-red" href={service.href}>
                    {service.title}
                  </a>
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{service.description}</p>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <ServiceList title="Scope" items={serviceDetails[service.id]?.scope ?? ["Consultation", "Material recommendation", "Quote support"]} />
                  <ServiceList title="Related materials" items={serviceDetails[service.id]?.materials ?? ["Project materials", "Accessories", "Delivery support"]} />
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-sand-400 pt-5 sm:flex-row">
                  <a className="action-commerce flex-1" href={service.href}>
                    View Details
                  </a>
                  <a className="action-secondary flex-1" href={`/contact?service=${encodeURIComponent(service.id)}`}>
                    {serviceDetails[service.id]?.cta ?? "Request Service Quote"}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand-200/60">
        <div className="section-shell">
          <p className="eyebrow">Service Process</p>
          <h2 className="section-title">How service quotes work</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {quoteSteps.map(({ Icon, copy, title }, index) => (
              <div key={title} className="surface-card p-6">
                <div className="text-sm font-semibold text-bronze-500">Step {index + 1}</div>
                <Icon className="mt-5 h-6 w-6 text-brand-red" />
                <h3 className="mt-4 font-serif text-2xl text-ink-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InquirySection />
      <SiteFooter />
    </main>
  );
}

function ServiceList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="rounded-lg border border-sand-400 bg-sand-100 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">{title}</div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-ink-700">
            <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-brand-red" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
