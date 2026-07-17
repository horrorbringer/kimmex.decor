import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ProjectItem } from "@/lib/homepage-data";

type FeaturedProjectsSectionProps = {
  projects: ProjectItem[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section className="section-shell" id="portfolio">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Selected Work</p>
          <h2 className="section-title max-w-3xl">See how materials and services come together.</h2>
          <p className="section-copy mt-4">
            Browse project references across residential interiors, commercial fit-outs, and smart living upgrades.
          </p>
        </div>
        <Link className="action-secondary w-fit" href="/portfolio">
          View Portfolio
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={`group relative overflow-hidden rounded-lg border border-sand-400 bg-ink-900 ${
              index === 0 ? "min-h-[520px] lg:col-span-2" : "min-h-[360px]"
            }`}
          >
            <Link className="absolute inset-0" href={project.href} aria-label={`View ${project.title}`}>
              <img
                alt={project.title}
                className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                src={project.imageUrl}
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{project.projectType}</p>
              <h3 className={`mt-2 font-serif leading-tight ${index === 0 ? "text-4xl md:text-5xl" : "text-3xl"}`}>
                {project.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">{project.caption}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link className="project-card-action is-primary" href={project.href}>
                  Case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link className="project-card-action" href={`/contact?project=${encodeURIComponent(project.id)}#request-form`}>
                  Use as reference
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
