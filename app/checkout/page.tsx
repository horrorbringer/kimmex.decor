import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function CheckoutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell">
        <p className="eyebrow">Checkout</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Checkout flow placeholder for address, delivery, payment, and confirmation.
        </h1>
        <div className="surface-card mt-8 p-6">
          <p className="text-sm leading-7 text-ink-700">
            This route is prepared for the workbook checkout scope. It should become active after cart state and payment
            integration are implemented.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
