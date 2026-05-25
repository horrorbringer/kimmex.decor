import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function CartPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell">
        <p className="eyebrow">Cart</p>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">Your material cart is ready for checkout flow.</h1>
        <div className="surface-card mt-8 grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-ink-700">
            Cart storage is the next functional step. This page is prepared so product actions point to a real shopping
            route instead of an inquiry placeholder.
          </p>
          <a className="action-primary" href="/products">
            Continue Shopping
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
