import { CartContent } from "@/components/cart/cart-content";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ArrowRight, CheckCircle2, PackageCheck, ShoppingCart } from "lucide-react";

const cartSteps = ["Review materials", "Confirm quantities", "Prepare delivery details", "Submit order request"];

export default function CartPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-12 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="eyebrow">Cart</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Review materials before checkout.
            </h1>
            <p className="section-copy mt-6">
              KMD orders can be simple product purchases or quote-first project requests. Use the cart to prepare item
              details, then move to checkout for delivery and confirmation steps.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="/checkout">
                Go to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-secondary" href="/products">
                Continue Shopping
              </a>
            </div>
          </div>

          <aside className="surface-card p-5">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6 text-brand-red" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Cart status</p>
                <p className="text-xs text-ink-700">Ready for order request flow</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2">
              {cartSteps.map((step) => (
                <div key={step} className="flex items-center gap-2 rounded-md border border-sand-400 bg-sand-50 p-3 text-sm font-semibold text-ink-900">
                  <CheckCircle2 className="h-4 w-4 text-brand-red" />
                  {step}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell">
        <CartContent />
      </section>

      <section className="section-shell pt-0">
        <div className="surface-card grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <PackageCheck className="h-5 w-5 text-brand-red" />
              <h2 className="font-serif text-3xl text-ink-900">Cart is saved on this device.</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              Items are stored locally in the browser. Customers can review quantities here, then send the order request
              so KMD can confirm stock, delivery, and payment direction.
            </p>
          </div>
          <a className="action-commerce" href="/contact?type=order-request">
            Send Order Request
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
