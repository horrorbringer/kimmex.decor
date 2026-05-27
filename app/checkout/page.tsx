import { CheckoutForm } from "@/components/cart/checkout-form";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ArrowRight, CheckCircle2, CreditCard, PackageCheck, Truck } from "lucide-react";

const confirmationSteps = [
  "KMD checks stock and substitutions",
  "Delivery and site access are confirmed",
  "Payment or invoice instruction is sent"
];

export default function CheckoutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="eyebrow">Checkout</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">Prepare your order request.</h1>
            <p className="section-copy mt-6">
              Add delivery address, delivery preference, contact details, and notes. KMD confirms stock, delivery cost,
              and payment direction before the order is final.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="#checkout-form">
                Start Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-secondary" href="/cart">
                Back to Cart
              </a>
            </div>
          </div>

          <aside className="surface-card p-5">
            <div className="flex items-center gap-3">
              <PackageCheck className="h-6 w-6 text-brand-red" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Recommended checkout model</p>
                <p className="text-xs text-ink-700">Order request first, payment after confirmation</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2">
              {confirmationSteps.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md border border-sand-400 bg-sand-50 p-3 text-sm font-semibold text-ink-900">
                  <CheckCircle2 className="h-4 w-4 text-brand-red" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell" id="checkout-form">
        <CheckoutForm />
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface-card p-5">
            <PackageCheck className="h-6 w-6 text-brand-red" />
            <h2 className="mt-4 font-serif text-2xl text-ink-900">Stock review</h2>
            <p className="mt-2 text-sm leading-6 text-ink-700">KMD checks availability, alternatives, and quantity needs.</p>
          </div>
          <div className="surface-card p-5">
            <Truck className="h-6 w-6 text-brand-red" />
            <h2 className="mt-4 font-serif text-2xl text-ink-900">Delivery quote</h2>
            <p className="mt-2 text-sm leading-6 text-ink-700">Address, map link, and site access help confirm delivery cost.</p>
          </div>
          <div className="surface-card p-5">
            <CreditCard className="h-6 w-6 text-brand-red" />
            <h2 className="mt-4 font-serif text-2xl text-ink-900">Payment later</h2>
            <p className="mt-2 text-sm leading-6 text-ink-700">KMD sends payment or invoice details after confirming the request.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
