import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  PackageCheck,
  Phone,
  Ruler
} from "lucide-react";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { services } from "@/lib/homepage-data";

const companyFacts = [
  { value: "2020", label: "Established" },
  { value: "Phnom Penh", label: "Based in" },
  { value: "B2B", label: "Project focus" }
];

const sectors = ["Commercial offices", "Developers", "Hotels", "Restaurants", "Retail spaces", "Construction firms"];

const principles = [
  {
    Icon: Ruler,
    title: "Plan with clarity",
    copy: "We review the space, measurements, material direction, schedule, and budget before defining the work."
  },
  {
    Icon: PackageCheck,
    title: "Connect product and service",
    copy: "Material supply and interior execution are considered together so the selected products suit the project."
  },
  {
    Icon: ClipboardCheck,
    title: "Deliver professionally",
    copy: "Clear scope, practical coordination, and finish quality guide our work from quotation through completion."
  }
];

const projectReferences = [
  { name: "Ministry of Economy and Finance", shortName: "MEF", scope: "Finishing decor" },
  { name: "Ministry of Justice", shortName: "MOJ", scope: "Finishing decor" },
  { name: "CGMC Commercial Building", shortName: "CGMC", scope: "Finishing decor" },
  { name: "General Commissariat of National Police", shortName: "GCNP", scope: "Finishing decor and doors" }
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">About Decor</p>
            <h1 className="font-serif text-5xl leading-[1.05] text-ink-900 md:text-6xl xl:text-7xl">
              Spaces designed for how business works.
            </h1>
            <p className="mt-6 text-base leading-8 text-ink-700 md:text-lg">
              Established in Cambodia in 2020, Decor provides construction materials and interior solutions for
              commercial, residential, and institutional projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="action-commerce" href="/contact">
                Discuss a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-secondary" href="/portfolio">
                View Our Work
              </a>
            </div>
          </div>

          <div className="relative min-h-[480px] overflow-hidden rounded-lg border border-sand-400 bg-ink-900 shadow-panel md:min-h-[580px]">
            <img
              alt="Modern commercial interior"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-white/20 bg-black/35 backdrop-blur-sm">
              {companyFacts.map((fact) => (
                <div key={fact.label} className="border-r border-white/20 p-4 text-white last:border-r-0 md:p-5">
                  <div className="font-serif text-xl md:text-2xl">{fact.value}</div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/65">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Our Approach</p>
            <h2 className="section-title">One partner from material selection to finished space.</h2>
          </div>
          <div>
            <p className="text-xl leading-9 text-ink-900 md:text-2xl">
              We combine product knowledge, interior planning, and practical project coordination to create spaces that
              are functional, durable, and visually considered.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-ink-700">
              Our work supports decision makers who need more than a product catalog. We help connect the intended
              result with suitable materials, realistic scope, delivery needs, and service execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <span key={sector} className="rounded-full border border-sand-400 bg-white px-4 py-2 text-sm font-medium text-ink-700">
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-200/55">
        <div className="section-shell">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2 className="section-title">What we bring to a project.</h2>
            </div>
            <a className="text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/services">
              Explore all services
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </a>
          </div>

          <div className="grid overflow-hidden rounded-lg border border-sand-400 bg-white md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <a
                key={service.id}
                className="group border-b border-sand-400 p-6 transition hover:bg-sand-100 md:border-r md:[&:nth-child(2)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2)]:border-r xl:last:border-r-0"
                href={service.href}
              >
                <span className="text-xs font-semibold text-brand-red">0{index + 1}</span>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-ink-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-700">{service.description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-ink-900 transition group-hover:text-brand-red">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="eyebrow">How We Work</p>
            <h2 className="section-title">Professional by design, practical by default.</h2>
          </div>
          <div className="grid overflow-hidden rounded-lg border border-sand-400 bg-white md:grid-cols-3">
            {principles.map(({ Icon, copy, title }) => (
              <div key={title} className="border-b border-sand-400 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <Icon className="h-5 w-5 text-brand-red" />
                <h3 className="mt-5 font-serif text-2xl text-ink-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 text-white">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Selected Experience</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Experience across public and commercial spaces.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
                Our project references reflect experience coordinating decoration work for institutions and commercial buildings in Phnom Penh.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2">
              {projectReferences.map((project) => (
                <div key={project.shortName} className="bg-ink-900 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <Building2 className="h-5 w-5 text-brand-red" />
                    <span className="text-xs font-semibold tracking-[0.16em] text-white/50">{project.shortName}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl leading-tight">{project.name}</h3>
                  <p className="mt-3 flex items-center gap-2 text-sm text-white/65">
                    <CheckCircle2 className="h-4 w-4 text-brand-red" />
                    {project.scope}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-16">
        <div className="grid gap-8 rounded-lg border border-sand-400 bg-white p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold text-brand-red">
              <MapPin className="h-4 w-4" />
              Toul Kork, Phnom Penh
            </div>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink-900">Let’s discuss what your space needs.</h2>
            <a className="mt-4 inline-flex items-center gap-2 text-sm text-ink-700 transition hover:text-brand-red" href="tel:+85516927683">
              <Phone className="h-4 w-4" />
              +855 16 92 76 83
            </a>
          </div>
          <a className="action-commerce w-fit whitespace-nowrap" href="/contact">
            Start a Conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
