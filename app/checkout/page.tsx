import { CheckoutForm } from "@/components/cart/checkout-form";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { LockKeyhole, PackageCheck, PhoneCall } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="checkout-heading">
        <div className="content-shell py-9 md:py-12">
          <p className="eyebrow">Secure order request</p>
          <h1 className="max-w-3xl font-serif text-3xl leading-tight text-ink-900 sm:text-4xl md:text-5xl">A simpler way to finish your order.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">
            Tell us where you are and how you want the order. KMD confirms stock, delivery, and final price before you pay.
          </p>
          <div className="checkout-trust-row">
            <span><LockKeyhole /> No payment now</span>
            <span><PackageCheck /> Stock confirmed by KMD</span>
            <span><PhoneCall /> Human follow-up</span>
          </div>
        </div>
      </section>

      <section className="section-shell checkout-section" id="checkout-form">
        <CheckoutForm />
      </section>

      <SiteFooter />
    </main>
  );
}
