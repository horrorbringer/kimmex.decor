import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { services } from "@/lib/homepage-data";

const serviceDetails = [
  "Site consultation and material recommendation",
  "Ceiling, wall, furniture, and smart-control scope planning",
  "Project-ready quotation support for residential and commercial spaces"
];

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell pb-10">
        <p className="eyebrow">Services</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Interior decor services for finished spaces, technical materials, and project execution.
        </h1>
        <p className="section-copy mt-6">
          Kimmex Decor services should lead with clear outcomes: better interiors, better material choices, and better
          delivery coordination for construction and decor projects.
        </p>
      </section>

      <section className="section-shell pt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="surface-card overflow-hidden">
              <img alt={service.title} className="h-72 w-full object-cover" src={service.imageUrl} />
              <div className="p-6">
                <h2 className="font-serif text-3xl text-ink-900">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{service.description}</p>
                <div className="mt-6 border-t border-sand-400 pt-5">
                  <a className="action-secondary" href="/contact">
                    Request Service Advice
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
          <div className="grid gap-4 md:grid-cols-3">
            {serviceDetails.map((detail, index) => (
              <div key={detail} className="surface-card p-6">
                <div className="text-sm font-semibold text-bronze-500">Step {index + 1}</div>
                <p className="mt-4 text-lg leading-7 text-ink-900">{detail}</p>
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
