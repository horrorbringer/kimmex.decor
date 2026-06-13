import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { projects } from "@/lib/homepage-data";
import { projectDetails } from "@/lib/project-data";
import { ArrowRight, Camera, CheckCircle2, ClipboardCheck, Ruler } from "lucide-react";

const planningSteps = [
  {
    Icon: Camera,
    title: "Share a reference",
    copy: "Send photos of your space and examples of the style or result you prefer."
  },
  {
    Icon: Ruler,
    title: "Confirm dimensions",
    copy: "Provide approximate measurements, location, and site access information."
  },
  {
    Icon: ClipboardCheck,
    title: "Define the work",
    copy: "Clarify materials, installation needs, finish level, timeline, and budget direction."
  }
];

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:py-14">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-ink-900 md:text-6xl">
              Interior references for residential and commercial projects.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-700 md:text-lg">
              Explore ceiling, partition, fit-out, and smart-living directions to help define your own project.
            </p>
          </div>
          <a className="action-commerce w-fit" href="/contact?topic=portfolio-reference">
            Discuss Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="section-shell pt-10" id="project-gallery">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Project Gallery</p>
            <h2 className="section-title">Case studies organized by space and project goal.</h2>
          </div>
          <a className="text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/services">
            Explore our services
            <ArrowRight className="ml-2 inline h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const detail = projectDetails[project.id];

            return (
              <article
                key={project.id}
                className={`group overflow-hidden rounded-lg border border-sand-400 bg-white transition hover:-translate-y-1 hover:shadow-panel ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className={index === 0 ? "grid lg:grid-cols-[1.35fr_0.65fr]" : ""}>
                  <a className="relative block min-h-[360px] overflow-hidden md:min-h-[440px]" href={project.href}>
                    <img
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      src={project.imageUrl}
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-900">
                      {project.projectType}
                    </span>
                  </a>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <h2 className={`font-serif leading-tight text-ink-900 ${index === 0 ? "text-4xl md:text-5xl" : "text-3xl"}`}>
                      <a className="transition hover:text-brand-red" href={project.href}>
                        {project.title}
                      </a>
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-ink-700">{project.caption}</p>
                    <div className="mt-6 grid gap-3 border-t border-sand-400 pt-5">
                      {detail.scope.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-center gap-3 text-sm font-medium text-ink-900">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-red" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <a className="mt-7 inline-flex items-center text-sm font-semibold text-brand-red" href={project.href}>
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-sand-200/55">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="eyebrow">From Reference to Plan</p>
              <h2 className="section-title">Use inspiration to define a practical scope.</h2>
              <p className="mt-4 text-sm leading-7 text-ink-700">
                A reference image is a starting point. Site details determine the right materials, service, and budget.
              </p>
            </div>
            <div className="grid overflow-hidden rounded-lg border border-sand-400 bg-white md:grid-cols-3">
              {planningSteps.map(({ Icon, copy, title }) => (
                <div key={title} className="border-b border-sand-400 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <Icon className="h-5 w-5 text-brand-red" />
                  <h3 className="mt-5 font-serif text-2xl text-ink-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-16">
        <div className="grid gap-6 rounded-lg bg-ink-900 p-7 text-white md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">Your Project</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight">Have a space or reference you want to develop?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
              Send the image, approximate size, location, and expected timeline for service and material guidance.
            </p>
          </div>
          <a className="action-commerce w-fit whitespace-nowrap" href="/contact?topic=portfolio-reference">
            Send Your Reference
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
