import { ClipboardCheck, PackageCheck, Ruler, Store, Truck, UsersRound } from "lucide-react";

import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

const strengths = [
  {
    Icon: Store,
    title: "Material marketplace",
    copy: "Ceiling, partition, decor, sanitaryware, smart-home, and installation products in one buying path.",
  },
  {
    Icon: PackageCheck,
    title: "Project packages",
    copy: "Bundled options help customers move from product browsing to project-ready planning.",
  },
  {
    Icon: UsersRound,
    title: "B2B and retail support",
    copy: "Structured for homeowners, contractors, developers, and commercial buyers.",
  },
];

const process = [
  {
    Icon: ClipboardCheck,
    title: "Share requirements",
    copy: "Send product needs, BOQ, drawings, delivery location, or room details.",
  },
  {
    Icon: Ruler,
    title: "Match materials",
    copy: "Kimmex Decor recommends suitable products, packages, and service options.",
  },
  {
    Icon: Truck,
    title: "Quote and support",
    copy: "Receive pricing, delivery coordination, and project support before purchase.",
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">About Kimmex Decor</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              A construction decor partner for materials, packages, and project-ready support.
            </h1>
            <p className="section-copy mt-6">
              Kimmex Decor helps customers source interior construction materials and decor solutions with a clearer
              path from product discovery to quotation, delivery, and service guidance.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="/contact">
                Request Quote
              </a>
              <a className="action-secondary" href="/products">
                Browse Products
              </a>
            </div>
          </div>
          <div className="surface-card grid gap-4 p-5 sm:grid-cols-2">
            {["Ceiling systems", "Partition walls", "Decor boards", "Sanitaryware", "Smart home", "Project packages"].map((item) => (
              <div key={item} className="rounded-xl border border-sand-400 bg-sand-50 p-4 text-sm font-semibold text-ink-900">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {strengths.map(({ Icon, title, copy }) => (
            <article key={title} className="surface-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand-100 text-bronze-500">
                <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
              </div>
              <h2 className="mt-5 font-serif text-2xl text-ink-900">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-700">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">How We Help</p>
            <h2 className="section-title">Built for buyers who need more than a simple product page.</h2>
            <p className="section-copy mt-4">
              Construction purchases often depend on quantity, delivery, technical fit, and installation context. The
              KMD flow supports direct cart buying and quote-based project buying.
            </p>
          </div>
          <div className="grid gap-4">
            {process.map(({ Icon, title, copy }, index) => (
              <article key={title} className="surface-card grid gap-4 p-5 sm:grid-cols-[56px_1fr]">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sand-100 text-bronze-500">
                  <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Step {index + 1}</div>
                  <h3 className="mt-1 font-serif text-2xl text-ink-900">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-700">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InquirySection />
      <SiteFooter />
    </main>
  );
}
