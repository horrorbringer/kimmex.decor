import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

const resources = [
  "Ceiling material buying guide",
  "Partition wall planning checklist",
  "Sanitaryware selection guide",
  "Smart home starter FAQ",
  "Delivery and installation questions",
  "B2B contractor account guide"
];

export default function ResourcesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell pb-10">
        <p className="eyebrow">Resources</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Guides, FAQs, and technical content for better material decisions.
        </h1>
        <p className="section-copy mt-6">
          This maps to the workbook content pages: blog, FAQ, project gallery support, and product education.
        </p>
      </section>
      <section className="section-shell pt-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((item) => (
            <a key={item} className="surface-card p-6 transition hover:border-bronze-500" href="/resources">
              <div className="font-serif text-2xl text-ink-900">{item}</div>
              <p className="mt-3 text-sm leading-6 text-ink-700">Draft resource page prepared for future content.</p>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
