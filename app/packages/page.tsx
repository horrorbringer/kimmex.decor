import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { projectPackages } from "@/lib/homepage-data";
import { ArrowRight, CheckCircle2, ClipboardList, PackageCheck, Sparkles, Truck, Wrench } from "lucide-react";

const packageBenefits = [
  {
    Icon: PackageCheck,
    title: "Materials grouped by job",
    copy: "Start from a ceiling, partition, or bathroom goal instead of picking every item manually."
  },
  {
    Icon: Wrench,
    title: "Service advice included",
    copy: "KMD can review supply-only needs, installation needs, and material compatibility before quoting."
  },
  {
    Icon: Truck,
    title: "Delivery planning support",
    copy: "Package quotes can include delivery notes, stock checks, and project quantity review."
  }
];

const quoteSteps = [
  "Choose the closest project package",
  "Send photos, location, size, and timeline",
  "KMD reviews materials, delivery, and service needs",
  "Receive package quote direction"
];

const packageRecommendations = [
  {
    packageId: "ceiling-package",
    title: "For ceiling and lighting finish",
    recommendation: "Ceiling Installation Package",
    bestFor: "Office ceilings, shop ceilings, room refreshes, LED details, and finished board work.",
    send: ["Room width and length", "Ceiling height", "Ceiling photo or drawing", "LED or spotlight plan"]
  },
  {
    packageId: "partition-package",
    title: "For dividing rooms or work areas",
    recommendation: "Partition Wall Package",
    bestFor: "Office partitions, shop back rooms, meeting rooms, acoustic walls, and fast space separation.",
    send: ["Wall length and height", "Door or glass position", "Privacy or sound-control need", "Site photos"]
  },
  {
    packageId: "bathroom-package",
    title: "For bathroom product upgrades",
    recommendation: "Bathroom Upgrade Package",
    bestFor: "Bathroom fixture refreshes, sanitaryware selection, commercial bathrooms, and delivery planning.",
    send: ["Bathroom photos", "Fixture quantity", "Preferred product style", "Delivery location"]
  }
];

export default function PackagesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="eyebrow">Project Packages</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Material + service packages for your project.
            </h1>
            <p className="section-copy mt-6">
              Choose a package when you need materials, accessories, delivery, and service advice together. It is useful
              when you know the project goal but not every product or quantity yet.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="#packages">
                View Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-secondary" href="/contact?type=package">
                Ask KMD to Recommend
              </a>
            </div>
          </div>
          <div className="surface-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">What is included?</p>
            <div className="mt-4 grid gap-3">
              {["Product materials", "Fixing accessories", "Delivery support", "Service/installation advice"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-sand-400 bg-sand-50 p-3 text-sm font-semibold text-ink-900">
                  <CheckCircle2 className="h-4 w-4 text-brand-red" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {packageBenefits.map(({ Icon, copy, title }) => (
            <article key={title} className="surface-card p-6">
              <Icon className="h-6 w-6 text-brand-red" />
              <h2 className="mt-4 font-serif text-2xl text-ink-900">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Recommended Packages</p>
            <h2 className="section-title">Choose by project need.</h2>
          </div>
          <a className="w-fit text-sm font-semibold text-bronze-500" href="/contact?type=package">
            Ask for a custom recommendation
          </a>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {packageRecommendations.map((item) => (
            <article key={item.packageId} className="surface-card p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-red text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">{item.title}</p>
                  <h3 className="mt-2 font-serif text-2xl text-ink-900">{item.recommendation}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-700">{item.bestFor}</p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">Send these details</p>
                <div className="mt-3 grid gap-2">
                  {item.send.map((detail) => (
                    <div key={detail} className="flex items-center gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-red" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
              <a className="action-secondary mt-6 w-full" href={`/contact?type=package&package=${encodeURIComponent(item.packageId)}`}>
                Request this package
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-8" id="packages">
        <div className="mb-5 flex flex-col gap-3 border-b border-sand-400 pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Available Packages</p>
            <h2 className="mt-1 font-serif text-3xl text-ink-900">Choose the closest project goal</h2>
          </div>
          <a className="w-fit text-sm font-semibold text-bronze-500" href="/contact?type=package">
            Send project details
          </a>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projectPackages.map((item) => (
            <article key={item.id} className="surface-card overflow-hidden">
              <img alt={item.title} className="h-56 w-full object-cover" src={item.imageUrl} />
              <div className="p-6">
                <p className="promo-chip w-fit">Materials + Service Support</p>
                <h2 className="font-serif text-3xl text-ink-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{item.summary}</p>
                <div className="mt-4 text-lg font-semibold text-brand-red">From ${item.startingPrice.toFixed(2)}</div>
                <p className="mt-1 text-xs text-ink-700">Starting reference only. Final pricing depends on quantity, delivery, and service scope.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.includes.map((include) => (
                    <span key={include} className="rounded-md border border-sand-400 bg-sand-100 px-2 py-1 text-xs text-ink-700">
                      {include}
                    </span>
                  ))}
                </div>
                <a className="action-commerce mt-6 w-full" href={`/contact?type=package&package=${encodeURIComponent(item.id)}`}>
                  Request Package Quote
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand-200/60">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="eyebrow">Quote Flow</p>
              <h2 className="section-title">How package quoting works</h2>
            </div>
            <div className="grid gap-3">
              {quoteSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-lg border border-sand-400 bg-white p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-red text-sm font-semibold text-white">{index + 1}</div>
                  <div className="text-sm font-semibold text-ink-900">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="surface-card grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-brand-red" />
              <h2 className="font-serif text-3xl text-ink-900">Not sure which package fits?</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-700">
              Send KMD your room photo, project size, location, and goal. The team can recommend a package or create a
              quote path from your material list.
            </p>
          </div>
          <a className="action-commerce" href="/contact?type=package">
            Ask KMD to Recommend
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
