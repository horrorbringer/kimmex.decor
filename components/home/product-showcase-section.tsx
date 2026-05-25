import { ProductCard } from "@/components/home/product-card";
import { products } from "@/lib/homepage-data";

export function ProductShowcaseSection() {
  return (
    <section id="products" className="bg-sand-200/65">
      <div className="section-shell">
        <p className="eyebrow">Products</p>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Shop project-ready materials by category, brand, and availability.</h2>
            <p className="section-copy mt-4">
              The homepage now shows price signals, SKU, stock state, and add-to-cart intent so the site reads as a
              commerce experience from the first visit.
            </p>
          </div>
          <a className="action-primary w-fit" href="/products">
            Browse Catalog
          </a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="surface-card p-4">
            <div className="text-2xl font-semibold text-ink-900">4</div>
            <div className="mt-1 text-sm text-ink-700">starter categories</div>
          </div>
          <div className="surface-card p-4">
            <div className="text-2xl font-semibold text-ink-900">B2B</div>
            <div className="mt-1 text-sm text-ink-700">quote-ready catalog</div>
          </div>
          <div className="surface-card p-4">
            <div className="text-2xl font-semibold text-ink-900">USD</div>
            <div className="mt-1 text-sm text-ink-700">display pricing</div>
          </div>
          <div className="surface-card p-4">
            <div className="text-2xl font-semibold text-ink-900">Stock</div>
            <div className="mt-1 text-sm text-ink-700">availability signals</div>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
