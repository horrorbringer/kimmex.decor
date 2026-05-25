import { brands } from "@/lib/homepage-data";

export function BrandsSection() {
  return (
    <section id="brands" className="bg-sand-200/45">
      <div className="section-shell">
        <p className="eyebrow">Brands and Partners</p>
        <div className="surface-card grid gap-4 p-6 md:grid-cols-4">
          {brands.map((brand) => (
            <a
              key={brand.id}
              className="flex min-h-28 items-center justify-center rounded-2xl border border-sand-400 bg-sand-50 px-6 text-center font-serif text-2xl text-ink-900 transition hover:border-bronze-500 hover:text-bronze-500"
              href={brand.href}
            >
              {brand.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
