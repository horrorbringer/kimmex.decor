import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Hammer,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";

import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

const companyFacts = [
  { Icon: BadgeCheck, label: "Established", value: "Since 2020" },
  { Icon: Building2, label: "Business focus", value: "B2B decoration and fit-out" },
  { Icon: MapPin, label: "Location", value: "Toul Kork, Phnom Penh" },
  { Icon: Phone, label: "Contact", value: "+855 16 92 76 83" }
];

const services = [
  {
    title: "Finished Ceiling Decor",
    items: [
      "Stretch ceiling with white paint",
      "Stretch moisture ceiling with white paint",
      "Reflect ceiling with white paint",
      "Reflect eco block ceiling",
      "Decor reflect ceiling with LED light",
      "Decor reflect eco block ceiling with LED light"
    ]
  },
  {
    title: "Partition and Wall Decor",
    items: ["Room division", "Wall finishing", "Commercial interior partition", "Decor wall surface planning"]
  },
  {
    title: "Furniture Decor",
    items: ["Doors", "Counters", "Cabinets", "Desks", "Shelves", "Built-in commercial furniture"]
  },
  {
    title: "Smart Home Control",
    items: ["Smart access", "Lighting control", "Modern room control", "Project-ready smart integration"]
  }
];

const partnerReasons = [
  "Professional B2B project experience",
  "Customized solutions for business needs",
  "Reliable quality and material standards",
  "On-time project delivery",
  "Competitive pricing and cost control",
  "Skilled technical and design team",
  "Long-term business partnership approach"
];

const projects = [
  {
    name: "Ministry of Economy and Finance (MEF)",
    location: "Phnom Penh",
    scope: "Finishing decor"
  },
  {
    name: "Ministry of Justice (MOJ)",
    location: "Phnom Penh",
    scope: "Finishing decor"
  },
  {
    name: "CGMC Commercial Building",
    location: "Phnom Penh",
    scope: "Finishing decor"
  },
  {
    name: "General Commissariat of National Police (GCNP)",
    location: "Phnom Penh",
    scope: "Finishing decor and doors",
    status: "Ongoing project"
  }
];

const sectors = ["Developers", "Retailers", "Restaurants", "Hotels", "Offices", "Construction firms"];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-12 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <p className="eyebrow">About KMD Decor</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Commercial decoration and fit-out solutions for business spaces.
            </h1>
            <p className="section-copy mt-6 max-w-3xl">
              KIM MEX Decor has been established since 2020 and is a duly registered company in accordance with the
              regulations and laws of the Kingdom of Cambodia. KMD Decor specializes in complete interior and exterior
              decoration solutions for business and commercial sectors.
            </p>
            <p className="mt-5 text-lg font-semibold text-bronze-500">
              Designing beauty, creating comfort.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="/contact">
                Discuss a Project
              </a>
              <a className="action-secondary" href="/services">
                View Services
              </a>
            </div>
          </div>

          <aside className="surface-card overflow-hidden">
            <img
              alt="Modern commercial interior decoration reference"
              className="h-56 w-full object-cover"
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="grid gap-3 p-5">
              {companyFacts.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-md border border-sand-400 bg-sand-50 p-3">
                  <Icon className="h-5 w-5 shrink-0 text-brand-red" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">{label}</p>
                    <p className="text-sm font-semibold text-ink-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Company Profile</p>
            <h2 className="section-title">A trusted partner for commercial decoration solutions.</h2>
            <p className="section-copy mt-4">
              We partner with companies, developers, retailers, restaurants, hotels, offices, and construction firms to
              deliver modern, functional, and high-quality decorative environments.
            </p>
            <p className="mt-4 text-base leading-7 text-ink-700">
              With a strong focus on the B2B market, KMD Decor understands the importance of brand image, project
              timelines, cost efficiency, and professional execution. Our team combines creative design expertise with
              practical project management so each commercial space supports both aesthetic and operational goals.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {sectors.map((sector) => (
              <div key={sector} className="surface-card flex items-center gap-3 p-4">
                <UsersRound className="h-5 w-5 text-brand-red" />
                <span className="text-sm font-semibold text-ink-900">{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="surface-card p-6">
            <Sparkles className="h-7 w-7 text-brand-red" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-bronze-500">Our Vision</p>
            <h2 className="mt-2 font-serif text-3xl text-ink-900">Trusted business fit-out partner</h2>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              To become a trusted decoration and fit-out partner for businesses by delivering innovative design
              solutions, quality craftsmanship, and professional project execution.
            </p>
          </article>
          <article className="surface-card p-6">
            <ShieldCheck className="h-7 w-7 text-brand-red" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-bronze-500">Our Mission</p>
            <h2 className="mt-2 font-serif text-3xl text-ink-900">Better spaces for better business</h2>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              To help businesses create attractive, functional, and inspiring commercial spaces that strengthen brand
              identity and improve customer experience.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Our Services</p>
            <h2 className="section-title">Interior, exterior, and project-ready decor work.</h2>
          </div>
          <a className="text-sm font-semibold text-bronze-500" href="/services">
            Explore service details
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="surface-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-red text-white">
                  <Hammer className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl text-ink-900">{service.title}</h3>
              </div>
              <div className="mt-5 grid gap-2">
                {service.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm leading-6 text-ink-700">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-red" />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Why Partner With KMD Decor</p>
            <h2 className="section-title">Built for commercial decision makers.</h2>
            <p className="section-copy mt-4">
              Business projects need dependable planning, clear cost control, and finish quality that supports the
              customer experience.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {partnerReasons.map((reason) => (
              <div key={reason} className="surface-card flex items-start gap-3 p-4 text-sm font-semibold text-ink-900">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                {reason}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-6">
          <p className="eyebrow">Project References</p>
          <h2 className="section-title">Commercial and government project experience.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.name} className="surface-card p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl text-ink-900">{project.name}</h3>
                {project.status ? (
                  <span className="rounded-md bg-brand-red px-3 py-1 text-xs font-semibold text-white">{project.status}</span>
                ) : null}
              </div>
              <div className="mt-4 grid gap-2 text-sm text-ink-700">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-red" />
                  Location: {project.location}
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-brand-red" />
                  Scope: {project.scope}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="surface-card grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-red">
              <Clock3 className="h-4 w-4" />
              Project consultation
            </div>
            <h2 className="mt-2 font-serif text-3xl text-ink-900">KMD Decor, your trusted partner in commercial decoration solutions.</h2>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              Address: #54, St.590, Sangkat Boeung Kok II, Khan Toul Kork, Phnom Penh, Cambodia.
            </p>
          </div>
          <a className="action-commerce" href="/contact">
            Contact KMD Decor
          </a>
        </div>
      </section>

      <InquirySection />
      <SiteFooter />
    </main>
  );
}
