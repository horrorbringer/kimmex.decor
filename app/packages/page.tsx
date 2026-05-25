import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { projectPackages } from "@/lib/homepage-data";

export default function PackagesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell pb-10">
        <p className="eyebrow">Project Packages</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Product bundles with service support for construction buyers.
        </h1>
        <p className="section-copy mt-6">
          Packages connect the workbook service ideas with ecommerce buying: materials, accessories, delivery, and
          consultation in one quote flow.
        </p>
      </section>
      <section className="section-shell pt-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {projectPackages.map((item) => (
            <article key={item.id} className="surface-card overflow-hidden">
              <img alt={item.title} className="h-56 w-full object-cover" src={item.imageUrl} />
              <div className="p-6">
                <h2 className="font-serif text-3xl text-ink-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{item.summary}</p>
                <div className="mt-4 text-lg font-semibold text-brand-red">From ${item.startingPrice.toFixed(2)}</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.includes.map((include) => (
                    <span key={include} className="rounded-md border border-sand-400 bg-sand-100 px-2 py-1 text-xs text-ink-700">
                      {include}
                    </span>
                  ))}
                </div>
                <a className="action-commerce mt-6 w-full" href="/contact">
                  Request Package Quote
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
