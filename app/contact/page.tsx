import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function ContactPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell pb-8">
        <p className="eyebrow">Contact</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Talk to Kimmex Decor about materials, services, or project support.
        </h1>
        <p className="section-copy mt-6">
          Use this page for consultation requests, product questions, and early project planning. The form is ready for
          an API endpoint when the backend is connected.
        </p>
      </section>
      <InquirySection />
      <SiteFooter />
    </main>
  );
}
