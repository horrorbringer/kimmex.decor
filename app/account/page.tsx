import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function AccountPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell">
        <p className="eyebrow">Account</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Customer account area for orders, saved items, addresses, and inquiries.
        </h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Order History", "Saved Products", "Service Inquiries"].map((item) => (
            <div key={item} className="surface-card p-6">
              <div className="font-serif text-2xl text-ink-900">{item}</div>
              <p className="mt-3 text-sm leading-6 text-ink-700">Placeholder module for the account workflow.</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
