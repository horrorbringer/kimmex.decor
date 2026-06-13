import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  FileText,
  MapPin,
  Phone,
  Ruler,
  ShoppingBag
} from "lucide-react";

import { ContactRequestForm } from "@/components/contact/contact-request-form";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

const requestDetails = [
  {
    Icon: Camera,
    title: "Photos or references",
    copy: "Show the room, finish, product, or design direction you have in mind."
  },
  {
    Icon: Ruler,
    title: "Size and quantity",
    copy: "Approximate measurements or required quantities are enough to begin."
  },
  {
    Icon: MapPin,
    title: "Location and timing",
    copy: "Share the project area, delivery location, and preferred timeline."
  }
];

export default function ContactPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band overflow-hidden">
        <div className="content-shell grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-stretch lg:py-14 xl:gap-14">
          <div className="flex max-w-4xl flex-col justify-center">
            <p className="eyebrow">Contact</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.04] text-ink-900 md:text-6xl xl:text-7xl">
              Start with your space. We’ll help shape the right solution.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-700 md:text-lg">
              Ask about products, interior services, or project planning. A photo, approximate size, and location are
              enough to begin.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-sand-400 pt-5 text-sm font-semibold text-ink-700">
              {["Product sourcing", "Interior services", "Project support"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce gap-2" href="#request-form">
                Start Your Request
                <ArrowDown className="h-4 w-4" />
              </a>
              <a className="action-secondary gap-2" href="tel:+85516927683">
                Call +855 16 92 76 83
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-lg bg-[var(--text)] p-6 text-white shadow-panel md:p-8">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/10" />
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full border border-brand-red/50" />
            <p className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">Direct contact</p>

            <a className="group relative mt-8 block border-b border-white/15 pb-7" href="tel:+85516927683">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-white/55">Phone</p>
                  <p className="mt-2 font-serif text-2xl md:text-3xl">+855 16 92 76 83</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 text-brand-red transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>

            <div className="relative pt-7">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                <div>
                  <p className="text-xs text-white/55">Phnom Penh location</p>
                  <p className="mt-2 text-sm leading-7 text-white/85">
                    #54, St. 590, Sangkat Boeung Kok II, Khan Toul Kork, Phnom Penh, Cambodia
                  </p>
                </div>
              </div>
            </div>

            <p className="relative mt-8 border-t border-white/15 pt-5 text-xs leading-5 text-white/55">
              For faster guidance, include the project location and approximate size when you contact us.
            </p>
          </aside>
        </div>
      </section>

      <section className="content-shell scroll-mt-36 py-12 lg:py-16" id="request-form">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 xl:gap-20">
          <aside className="lg:sticky lg:top-36 lg:self-start">
            <p className="eyebrow">Start a Request</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">One form for products and projects.</h2>
            <p className="mt-5 text-base leading-7 text-ink-700">
              Choose the closest request type and share the essentials. Our team can help clarify materials, service
              scope, quantities, delivery, and installation needs.
            </p>

            <div className="mt-8 grid gap-3 border-t border-sand-400 pt-6">
              <a className="group flex items-center justify-between py-2 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/products">
                <span className="flex items-center gap-3">
                  <ShoppingBag className="h-4 w-4 text-brand-red" />
                  Browse products first
                </span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a className="group flex items-center justify-between py-2 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/services">
                <span className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-brand-red" />
                  Review service scopes
                </span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
          </aside>

          <ContactRequestForm />
        </div>
      </section>

      <section className="border-y border-sand-400 bg-sand-200/55">
        <div className="content-shell py-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
            <div>
              <p className="eyebrow">Helpful Details</p>
              <h2 className="font-serif text-3xl leading-tight text-ink-900 md:text-4xl">A faster first review starts here.</h2>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-sand-400 bg-white md:grid-cols-3">
              {requestDetails.map(({ Icon, copy, title }, index) => (
                <div key={title} className="border-b border-sand-400 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-5 w-5 text-brand-red" />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-ink-700">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-ink-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-700">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
