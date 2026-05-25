import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function WishlistPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell">
        <p className="eyebrow">Saved Products</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Saved products and project materials for later review.
        </h1>
        <div className="surface-card mt-8 p-6">
          <p className="text-sm leading-7 text-ink-700">
            This page is ready for wishlist state. Saved products from catalog and project packages should appear here.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
