import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { brands, products } from "@/lib/homepage-data";

export default function BrandsPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell pb-10">
        <p className="eyebrow">Brands</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Multi-brand material sourcing for decor and construction projects.
        </h1>
        <p className="section-copy mt-6">
          The workbook highlights multi-brand supply. This page prepares brand storefronts and supplier credibility.
        </p>
      </section>
      <section className="section-shell pt-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => {
            const count = products.filter((product) => product.brand === brand.name || brand.name === "Multi-brand").length;
            return (
              <a key={brand.id} className="surface-card p-6 transition hover:border-bronze-500" href="/products">
                <div className="font-serif text-3xl text-ink-900">{brand.name}</div>
                <p className="mt-3 text-sm leading-6 text-ink-700">{count} catalog items and project-ready product options.</p>
              </a>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
