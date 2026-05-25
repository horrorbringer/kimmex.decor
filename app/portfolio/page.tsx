import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { projects } from "@/lib/homepage-data";

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell pb-10">
        <p className="eyebrow">Portfolio</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
          Project references for interiors, commercial fit-outs, and smart living upgrades.
        </h1>
        <p className="section-copy mt-6">
          Replace these placeholders with real Kimmex Decor project photos once the project image folder is confirmed.
        </p>
      </section>

      <section className="section-shell pt-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="surface-card overflow-hidden">
              <img alt={project.title} className="h-80 w-full object-cover" src={project.imageUrl} />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-700">{project.projectType}</p>
                <h2 className="mt-3 font-serif text-3xl text-ink-900">{project.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{project.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InquirySection />
      <SiteFooter />
    </main>
  );
}
