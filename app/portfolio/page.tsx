import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { projects } from "@/lib/homepage-data";
import { projectDetails } from "@/lib/project-data";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ClipboardCheck,
  Ruler
} from "lucide-react";

const planningSteps = [
  {
    Icon: Camera,
    title: "Show us the space",
    copy: "Share site photos and references that communicate the result you have in mind."
  },
  {
    Icon: Ruler,
    title: "Set the project context",
    copy: "Add approximate dimensions, location, access conditions, and expected timing."
  },
  {
    Icon: ClipboardCheck,
    title: "Define a practical scope",
    copy: "KMD connects the visual direction with suitable materials, services, and quotation requirements."
  }
];

export default function PortfolioPage() {
  const featuredProject = projects[0];
  const featuredDetail = projectDetails[featuredProject.id];

  return (
    <main className="page-shell bg-white">
      <SiteHeader />

      <section className="relative isolate min-h-[540px] overflow-hidden bg-ink-900 md:min-h-[680px]">
        <img
          alt={featuredProject.title}
          className="absolute inset-0 h-full w-full object-cover"
          src={featuredDetail.gallery[0].imageUrl}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="content-shell relative flex min-h-[540px] items-end py-10 text-white md:min-h-[680px] md:py-16">
          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">KMD Project Portfolio</p>
              <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Interiors shaped by clear decisions.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">
                Residential, commercial, and smart-living references showing how space planning, materials, and execution work together.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="action-commerce justify-center gap-2" href="/contact?topic=portfolio-reference">
                  Discuss Your Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/45 px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-ink-900" href="#projects">
                  View Projects
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>

            <a className="group border-l border-white/30 pl-5 text-white lg:justify-self-end" href={featuredProject.href}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Featured reference</span>
              <span className="mt-2 block font-serif text-2xl leading-tight">{featuredProject.title}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                Open case study
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <nav aria-label="Portfolio projects" className="border-b border-sand-400 bg-white" id="projects">
        <div className="content-shell flex snap-x overflow-x-auto">
          {projects.map((project, index) => (
            <a
              key={project.id}
              className="group flex min-h-20 min-w-[230px] flex-1 snap-start items-center gap-4 border-r border-sand-400 px-4 text-ink-900 transition first:border-l hover:bg-sand-100 hover:text-brand-red md:px-6"
              href={`#${project.id}`}
            >
              <span className="text-xs font-semibold text-ink-700/65">0{index + 1}</span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-700">{project.projectType}</span>
                <span className="mt-1 block text-sm font-semibold">{project.title}</span>
              </span>
            </a>
          ))}
        </div>
      </nav>

      <section className="bg-white">
        <div className="content-shell py-12 lg:py-20">
          <div className="grid gap-5 border-b border-sand-400 pb-9 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">Three spaces. Three different priorities.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-ink-700 md:text-base lg:justify-self-end">
              Each case study starts with the intended result, then connects layout, material selection, technical requirements, and finish direction.
            </p>
          </div>

          <div>
            {projects.map((project, index) => {
              const detail = projectDetails[project.id];
              const imageFirst = index % 2 === 0;

              return (
                <article
                  key={project.id}
                  className="grid scroll-mt-28 border-b border-sand-400 py-10 last:border-b-0 last:pb-0 lg:grid-cols-2 lg:items-stretch lg:py-16"
                  id={project.id}
                >
                  <a
                    aria-label={`View ${project.title}`}
                    className={`group relative min-h-[360px] overflow-hidden bg-sand-100 sm:min-h-[480px] lg:min-h-[620px] ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                    href={project.href}
                  >
                    <img
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      loading={index === 0 ? "eager" : "lazy"}
                      src={detail.gallery[0].imageUrl}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-black/55 p-4 text-white backdrop-blur-sm sm:p-5">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">Project 0{index + 1}</span>
                        <span className="mt-1 block text-sm font-semibold">{detail.setting}</span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </a>

                  <div className={`flex flex-col justify-center bg-sand-50 p-6 sm:p-9 lg:p-12 xl:p-16 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                      <span>{project.projectType}</span>
                      <span className="h-px w-10 bg-brand-red/45" />
                      <span>{detail.focus}</span>
                    </div>
                    <h2 className="mt-5 font-serif text-3xl leading-tight text-ink-900 sm:text-4xl xl:text-5xl">
                      {project.title}
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-ink-700 md:text-base">{detail.overview}</p>

                    <dl className="mt-8 grid grid-cols-2 border-y border-sand-400 py-5">
                      <ProjectFact label="Setting" value={detail.setting} />
                      <ProjectFact label="Primary focus" value={detail.focus} />
                    </dl>

                    <div className="mt-7 grid gap-3">
                      {detail.outcomes.slice(0, 3).map((outcome) => (
                        <div key={outcome} className="flex items-start gap-3 text-sm font-medium text-ink-900">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" strokeWidth={2.4} />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>

                    <a className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 border-b border-brand-red text-sm font-semibold text-brand-red" href={project.href}>
                      Explore Case Study
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-sand-400 bg-sand-200/55">
        <div className="content-shell grid gap-10 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:py-20">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">From Reference to Scope</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">Bring the idea. We will help make it practical.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-ink-700">
              A reference establishes direction. Measurements, location, material requirements, and site conditions define the actual work.
            </p>
          </div>

          <ol className="border-t border-sand-400">
            {planningSteps.map(({ Icon, copy, title }, index) => (
              <li key={title} className="grid gap-5 border-b border-sand-400 py-7 sm:grid-cols-[72px_minmax(0,1fr)] sm:py-9">
                <div className="flex items-center justify-between sm:block">
                  <span className="text-xs font-semibold text-ink-700">0{index + 1}</span>
                  <Icon className="h-5 w-5 text-brand-red sm:mt-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-ink-900 md:text-3xl">{title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-ink-700">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink-900 text-white">
        <div className="content-shell grid gap-7 py-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Start a Conversation</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">Have a space or reference you want to develop?</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Send photos, approximate dimensions, project location, and your expected timeline.
            </p>
          </div>
          <a className="action-commerce w-fit gap-2 whitespace-nowrap" href="/contact?topic=portfolio-reference">
            Send Your Reference
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-sand-400 pr-4 last:border-r-0 last:pl-5">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">{label}</dt>
      <dd className="mt-2 text-sm font-semibold leading-5 text-ink-900">{value}</dd>
    </div>
  );
}
