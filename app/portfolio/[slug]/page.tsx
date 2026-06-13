import { ProductCard } from "@/components/home/product-card";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { projects } from "@/lib/homepage-data";
import {
  getProjectBySlug,
  getProjectDetail,
  getProjectProducts,
  getProjectServices
} from "@/lib/project-data";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Layers3,
  Lightbulb,
  Target
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";

type PortfolioDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found | Decor" };
  }

  return {
    title: `${project.title} | Decor Portfolio`,
    description: project.caption
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const detail = getProjectDetail(slug);

  if (!project || !detail) notFound();

  const relatedServices = getProjectServices(slug);
  const relatedProducts = getProjectProducts(slug);
  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const contactHref = `/contact?project=${encodeURIComponent(project.id)}`;

  return (
    <main className="page-shell">
      <SiteHeader />

      <div className="border-b border-sand-400 bg-sand-50">
        <div className="content-shell flex min-w-0 items-center gap-2 overflow-x-auto py-4 text-xs text-ink-700 sm:text-sm">
          <a className="inline-flex shrink-0 items-center gap-2 font-semibold transition hover:text-brand-red" href="/portfolio">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </a>
          <span className="text-sand-400">/</span>
          <span className="truncate text-ink-900">{project.title}</span>
        </div>
      </div>

      <section className="commerce-band overflow-hidden">
        <div className="content-shell grid gap-8 py-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:py-12 xl:gap-12">
          <div className="flex flex-col justify-center py-2 lg:py-6">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-700">
              <span className="text-brand-red">Project Reference</span>
              <span className="h-1 w-1 rounded-full bg-sand-400" />
              <span>{project.projectType}</span>
            </div>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.03] text-ink-900 md:text-6xl xl:text-7xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-700 md:text-lg">{project.caption}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="action-commerce gap-2" href={contactHref}>
                Plan Similar Work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="action-secondary gap-2" href="#project-story">
                Explore Case Study
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-sand-400 bg-sand-400 sm:grid-cols-3">
              <ProjectFact label="Setting" value={detail.setting} />
              <ProjectFact label="Focus" value={detail.focus} />
              <ProjectFact className="col-span-2 sm:col-span-1" label="Approach" value="Product + service" />
            </dl>
          </div>

          <div className="relative min-h-[470px] overflow-hidden rounded-lg border border-sand-400 bg-sand-100 shadow-panel md:min-h-[620px]">
            <img alt={project.title} className="absolute inset-0 h-full w-full object-cover" src={detail.gallery[0].imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">Design intention</p>
              <p className="mt-2 max-w-xl font-serif text-2xl leading-tight md:text-3xl">{detail.goal}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell scroll-mt-32 py-12 lg:py-16" id="project-story">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start xl:gap-16">
          <div>
            <p className="eyebrow">Project Story</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">From design intention to practical direction.</h2>
          </div>
          <div>
            <p className="text-xl leading-9 text-ink-900 md:text-2xl md:leading-10">{detail.overview}</p>
            <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-sand-400 md:grid-cols-2">
              <StoryPanel Icon={Target} copy={detail.challenge} title="The challenge" />
              <StoryPanel Icon={Lightbulb} copy={detail.response} title="The response" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--text)] text-white">
        <div className="content-shell grid gap-10 py-12 lg:grid-cols-[0.62fr_1.38fr] lg:items-start lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/50">Project Scope</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">The work behind the visual direction.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">
              Each project starts with the result, then connects spatial planning, suitable materials, and service requirements.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2">
            {detail.scope.map((item, index) => (
              <div key={item} className="bg-[var(--text)] p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <ClipboardCheck className="h-5 w-5 text-brand-red" />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-white/35">0{index + 1}</span>
                </div>
                <p className="mt-6 font-serif text-2xl leading-tight">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-start xl:gap-16">
          <div>
            <p className="eyebrow">Working Method</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">A considered path from space to finish.</h2>
            <div className="mt-7 grid gap-3">
              {detail.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-center gap-3 text-sm font-semibold text-ink-900">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-red" />
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          <ol className="overflow-hidden rounded-lg border border-sand-400 bg-white">
            {detail.process.map((step, index) => (
              <li key={step.title} className="grid gap-4 border-b border-sand-400 p-6 last:border-b-0 sm:grid-cols-[56px_1fr] md:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red/10 text-xs font-semibold text-brand-red">0{index + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-700">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-sand-400 bg-sand-200/55">
        <div className="content-shell py-12 lg:py-16">
          <div className="mb-7 max-w-3xl">
            <p className="eyebrow">Visual Study</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">Details that define the project direction.</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {detail.gallery.map((visual, index) => (
              <article
                key={visual.title}
                className={`group relative min-h-[360px] overflow-hidden rounded-lg border border-sand-400 bg-sand-100 ${
                  index === 0 ? "lg:row-span-2 lg:min-h-[740px]" : "lg:min-h-[358px]"
                }`}
              >
                <img alt={visual.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={visual.imageUrl} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">View 0{index + 1}</span>
                  <h3 className="mt-2 font-serif text-2xl md:text-3xl">{visual.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">{visual.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start xl:gap-16">
          <div>
            <p className="eyebrow">Connected Capabilities</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">Services that support this direction.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-ink-700">
              Project outcomes depend on more than one visual idea. These service areas connect planning, materials, and execution.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-lg border border-sand-400 bg-white sm:grid-cols-2">
            {relatedServices.map((service, index) => (
              <a
                key={service.id}
                className="group border-b border-sand-400 p-6 transition hover:bg-sand-100 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                href={service.href}
              >
                <div className="flex items-start justify-between gap-4">
                  <Layers3 className="h-5 w-5 text-brand-red" />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-ink-700">0{index + 1}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl text-ink-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-700">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition group-hover:text-brand-red">
                  Explore service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="border-t border-sand-400 bg-sand-50">
          <div className="content-shell py-12 lg:py-16">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Material Direction</p>
                <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">Products relevant to this project.</h2>
              </div>
              <a className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/products">
                Browse products
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="content-shell py-10 lg:py-14">
        <div className="grid overflow-hidden rounded-lg bg-[var(--text)] text-white lg:grid-cols-[1fr_0.42fr]">
          <div className="p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Plan Your Version</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">Use this reference to start a project shaped around your own space.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Send photos, approximate dimensions, location, and the parts of this direction you want to explore.
            </p>
            <a className="action-commerce mt-7 w-fit gap-2" href={contactHref}>
              Plan Similar Work
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <a className="group relative min-h-[300px] overflow-hidden border-t border-white/15 lg:border-l lg:border-t-0" href={nextProject.href}>
            <img alt={nextProject.title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-50" src={nextProject.imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Next project</p>
              <p className="mt-2 font-serif text-2xl leading-tight">{nextProject.title}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                View case study
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ProjectFact({ className = "", label, value }: { className?: string; label: string; value: string }) {
  return (
    <div className={`bg-white p-4 ${className}`}>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-700">{label}</dt>
      <dd className="mt-2 text-sm font-semibold leading-5 text-ink-900">{value}</dd>
    </div>
  );
}

function StoryPanel({ Icon, copy, title }: { Icon: LucideIcon; copy: string; title: string }) {
  return (
    <div className="bg-white p-6 md:p-7">
      <Icon className="h-5 w-5 text-brand-red" />
      <h3 className="mt-5 font-serif text-2xl text-ink-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink-700">{copy}</p>
    </div>
  );
}
