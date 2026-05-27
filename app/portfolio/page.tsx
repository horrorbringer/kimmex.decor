import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { projects } from "@/lib/homepage-data";
import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, Home, Lightbulb, Ruler, Sparkles } from "lucide-react";

const portfolioStats = [
  { value: "3", label: "Project types" },
  { value: "B2B", label: "Commercial support" },
  { value: "Quote", label: "Material planning" }
];

const projectDetails = {
  "residential-suite": {
    Icon: Home,
    scope: ["Ceiling finish", "Lighting detail", "Reflective surface planning"],
    result: "A cleaner residential ceiling direction with material choices organized before quote review.",
    cta: "/contact?project=residential-suite"
  },
  "workspace-fitout": {
    Icon: Building2,
    scope: ["Partition planning", "Acoustic material direction", "Workspace finish coordination"],
    result: "A practical office fit-out direction focused on room division, sound comfort, and delivery planning.",
    cta: "/contact?project=workspace-fitout"
  },
  "smart-home": {
    Icon: Lightbulb,
    scope: ["Smart access", "Control point planning", "Finish compatibility review"],
    result: "A smart-living upgrade path that connects device selection with installation and finish requirements.",
    cta: "/contact?project=smart-home"
  }
};

const planningNotes = [
  {
    Icon: Ruler,
    title: "Start with size",
    copy: "Send room dimensions, floor plans, or rough measurements so KMD can estimate material direction."
  },
  {
    Icon: ClipboardCheck,
    title: "Confirm scope",
    copy: "Clarify supply-only, installation support, delivery, finish quality, and timeline before final quote."
  },
  {
    Icon: Sparkles,
    title: "Match finish",
    copy: "Use project references to choose ceiling style, partition finish, smart controls, and accessory needs."
  }
];

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Project references for interiors, fit-outs, and smart living upgrades.
            </h1>
            <p className="section-copy mt-6">
              Review project directions by space type, scope, and finish need before requesting a material or service
              quote from KMD Decor.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce" href="#project-gallery">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-secondary" href="/contact?topic=portfolio-reference">
                Discuss Similar Project
              </a>
            </div>
          </div>

          <aside className="surface-card overflow-hidden">
            <img alt="Interior project reference" className="h-64 w-full object-cover" src={projects[0].imageUrl} />
            <div className="grid grid-cols-3 border-t border-sand-400">
              {portfolioStats.map((stat) => (
                <div key={stat.label} className="border-r border-sand-400 p-4 last:border-r-0">
                  <div className="font-serif text-3xl text-ink-900">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell" id="project-gallery">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Project Gallery</p>
            <h2 className="section-title">Reference work by project goal.</h2>
          </div>
          <a className="w-fit text-sm font-semibold text-bronze-500" href="/services">
            Match with services
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => {
            const detail = projectDetails[project.id as keyof typeof projectDetails];
            const Icon = detail.Icon;

            return (
              <article key={project.id} className="surface-card overflow-hidden transition hover:-translate-y-0.5 hover:border-bronze-500 hover:shadow-panel">
                <div className="relative">
                  <img alt={project.title} className="h-80 w-full object-cover" src={project.imageUrl} />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900">
                    <Icon className="h-4 w-4 text-brand-red" />
                    {project.projectType}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-3xl text-ink-900">{project.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-ink-700">{project.caption}</p>
                  <div className="mt-5 grid gap-2">
                    {detail.scope.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-ink-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-red" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-md border border-sand-400 bg-sand-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Project direction</p>
                    <p className="mt-2 text-sm leading-6 text-ink-700">{detail.result}</p>
                  </div>
                  <a className="action-secondary mt-6 w-full" href={detail.cta}>
                    Plan Similar Work
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-sand-200/60">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="eyebrow">Before Quote</p>
              <h2 className="section-title">Turn a reference into a clear scope.</h2>
              <p className="section-copy mt-4">
                A portfolio photo is only the starting point. KMD can recommend materials more accurately when the
                space, measurement, and service expectation are clear.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {planningNotes.map(({ Icon, copy, title }) => (
                <article key={title} className="surface-card p-5">
                  <Icon className="h-6 w-6 text-brand-red" />
                  <h3 className="mt-4 font-serif text-2xl text-ink-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="surface-card grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-3xl text-ink-900">Have a photo or reference style?</h2>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              Send the image with approximate size, location, deadline, and whether you need supply-only or service
              support. KMD can suggest the closest material and package direction.
            </p>
          </div>
          <a className="action-commerce" href="/contact?topic=portfolio-reference">
            Send Reference
          </a>
        </div>
      </section>

      <InquirySection />
      <SiteFooter />
    </main>
  );
}
