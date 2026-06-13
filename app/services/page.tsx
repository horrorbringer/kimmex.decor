import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { serviceDetails } from "@/lib/service-data";
import { services } from "@/lib/homepage-data";
import { ArrowRight, Camera, CheckCircle2, ClipboardCheck, Ruler } from "lucide-react";

const processSteps = [
  {
    Icon: Camera,
    title: "Share your project",
    copy: "Send photos, drawings, or a reference for the result you want."
  },
  {
    Icon: Ruler,
    title: "Confirm the scope",
    copy: "Provide approximate size, location, timing, and installation needs."
  },
  {
    Icon: ClipboardCheck,
    title: "Review the proposal",
    copy: "Receive service direction, recommended materials, and quote details."
  }
];

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:py-14">
          <div>
            <p className="eyebrow">Interior Services</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Practical interior solutions for homes and commercial spaces.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-700 md:text-lg">
              Explore ceiling, partition, furniture, and smart-home services supported by suitable materials and
              project planning.
            </p>
          </div>
          <a className="action-commerce w-fit" href="/contact">
            Request Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="section-shell pt-10" id="service-list">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">What We Do</p>
            <h2 className="section-title">Choose a service for your space.</h2>
          </div>
          <a className="text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/portfolio">
            View completed work
            <ArrowRight className="ml-2 inline h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const detail = serviceDetails[service.id];

            return (
              <article key={service.id} className="group overflow-hidden rounded-lg border border-sand-400 bg-white transition hover:-translate-y-1 hover:shadow-panel">
                <a className="relative block overflow-hidden" href={service.href}>
                  <img
                    alt={service.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    src={service.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <h2 className="absolute inset-x-0 bottom-0 p-6 font-serif text-3xl text-white md:text-4xl">
                    {service.title}
                  </h2>
                </a>

                <div className="p-6">
                  <p className="text-sm leading-7 text-ink-700">{service.description}</p>
                  <div className="mt-5 grid gap-2">
                    {(detail?.scope ?? []).slice(0, 3).map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm font-medium text-ink-900">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-sand-400 pt-5">
                    <a className="inline-flex items-center text-sm font-semibold text-brand-red" href={service.href}>
                      Explore Service
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-sand-200/55">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="eyebrow">Simple Process</p>
              <h2 className="section-title">From project idea to clear next steps.</h2>
              <p className="mt-4 text-sm leading-7 text-ink-700">
                Exact drawings are helpful but not required for the first conversation.
              </p>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-sand-400 bg-white md:grid-cols-3">
              {processSteps.map(({ Icon, copy, title }, index) => (
                <div key={title} className="border-b border-sand-400 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-brand-red" />
                    <span className="text-xs font-semibold text-ink-700">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-ink-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-16">
        <div className="grid gap-6 rounded-lg bg-ink-900 p-7 text-white md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">Start a Project</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight">Not sure which service fits your space?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
              Send a photo, approximate size, and location. The team can recommend the right service and materials.
            </p>
          </div>
          <a className="action-commerce w-fit whitespace-nowrap" href="/contact">
            Discuss Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
