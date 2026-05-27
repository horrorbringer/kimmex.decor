import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MapPin,
  Ruler,
} from "lucide-react";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ResourceDirectory } from "@/components/resources/resource-directory";
import { ResourceFaq } from "@/components/resources/resource-faq";

const quoteChecklist = [
  { Icon: Camera, title: "Photos or drawings", copy: "Room photos, ceiling references, wall photos, floor plans, BOQ, or material screenshots." },
  { Icon: Ruler, title: "Approximate size", copy: "Width, length, height, quantity, number of rooms, or estimated square meters." },
  { Icon: MapPin, title: "Project location", copy: "Delivery address, city, site access, and whether truck delivery is required." },
  { Icon: ClipboardCheck, title: "Scope and timing", copy: "Supply-only or installation support, preferred finish, budget direction, and deadline." }
];

const faqItems = [
  {
    question: "When should I use a project package?",
    answer: "Use a project package when you know the goal, such as ceiling, partition, or bathroom work, but need help matching materials, accessories, delivery, and service support."
  },
  {
    question: "Can KMD recommend materials from photos?",
    answer: "Yes. Send a room, ceiling, wall, fixture, or material sample photo. The current website uses guided matching support, and the KMD team can review details before quote confirmation."
  },
  {
    question: "Do I need exact measurements before contacting KMD?",
    answer: "Exact measurements are helpful, but not required for the first discussion. Start with approximate size, photos, location, and the result you want."
  },
  {
    question: "Does KMD support B2B projects?",
    answer: "Yes. KMD Decor focuses on business and commercial decoration projects, including offices, hotels, restaurants, retailers, developers, and construction firms."
  }
];

const resourcePaths = [
  "Material selection",
  "Project quantity review",
  "Stock and delivery questions",
  "Installation and service scope",
  "B2B quote preparation",
  "Commercial fit-out planning"
];

export default function ResourcesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-12 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="eyebrow">Resources</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Practical guides for material, service, and project quote decisions.
            </h1>
            <p className="section-copy mt-6 max-w-3xl">
              Use these resources to prepare the right project details before choosing products, requesting a package
              quote, or discussing installation support with KMD Decor.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="#guides">
                View Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-secondary" href="#quote-checklist">
                Quote Checklist
              </a>
            </div>
          </div>

          <aside className="surface-card p-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-brand-red" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Best for buyers who need</p>
                <p className="text-xs text-ink-700">Clearer decisions before quote request</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2">
              {resourcePaths.map((path) => (
                <div key={path} className="flex items-center gap-2 rounded-md border border-sand-400 bg-sand-50 p-3 text-sm font-semibold text-ink-900">
                  <CheckCircle2 className="h-4 w-4 text-brand-red" />
                  {path}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell" id="guides">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Resource Directory</p>
            <h2 className="section-title">Filter guides by project need.</h2>
          </div>
          <a className="text-sm font-semibold text-bronze-500" href="/products">
            Browse products
          </a>
        </div>

        <ResourceDirectory />
      </section>

      <section className="bg-sand-200/60" id="quote-checklist">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="eyebrow">Quote Preparation</p>
              <h2 className="section-title">What to send before asking for price.</h2>
              <p className="section-copy mt-4">
                A better quote starts with context. You do not need perfect technical drawings, but these details help
                KMD recommend materials, delivery, and service scope faster.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {quoteChecklist.map(({ Icon, copy, title }) => (
                <article key={title} className="surface-card p-5">
                  <Icon className="h-6 w-6 text-brand-red" />
                  <h3 className="mt-4 font-serif text-2xl text-ink-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow">Common Questions</p>
            <h2 className="section-title">Quick answers before contacting KMD.</h2>
            <ResourceFaq items={faqItems} />
          </div>

          <aside className="surface-card overflow-hidden">
            <img
              alt="Commercial interior planning desk"
              className="h-64 w-full object-cover"
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">Need a faster path?</p>
              <h3 className="mt-2 font-serif text-3xl text-ink-900">Send your project details directly.</h3>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                Share photos, size, location, and whether you need supply-only or service support. KMD can recommend the
                next step.
              </p>
              <a className="action-commerce mt-6 w-full" href="/contact?topic=project-advice">
                Ask KMD for Advice
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-3xl text-ink-900">Still not sure where to start?</h2>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              For commercial and B2B projects, start with project type, approximate size, timeline, and photos. KMD can
              guide you toward products, services, or a package quote.
            </p>
          </div>
          <a className="action-commerce" href="/contact">
            Contact KMD Decor
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
