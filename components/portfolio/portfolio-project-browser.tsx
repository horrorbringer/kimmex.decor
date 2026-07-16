"use client";

import { Search, SlidersHorizontal, X, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type PortfolioBrowserProject = {
  id: string;
  title: string;
  projectType: string;
  caption: string;
  href: string;
  imageUrl: string;
  setting: string;
  focus: string;
  outcomes: string[];
};

type PortfolioProjectBrowserProps = {
  projects: PortfolioBrowserProject[];
};

export function PortfolioProjectBrowser({ projects }: PortfolioProjectBrowserProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All projects");

  const projectTypes = useMemo(
    () => ["All projects", ...Array.from(new Set(projects.map((project) => project.projectType).filter(Boolean)))],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesType = type === "All projects" || project.projectType === type;
      const matchesQuery =
        !normalizedQuery ||
        [
          project.title,
          project.projectType,
          project.caption,
          project.setting,
          project.focus,
          ...project.outcomes
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesType && matchesQuery;
    });
  }, [projects, query, type]);

  const reset = () => {
    setQuery("");
    setType("All projects");
  };

  return (
    <section className="border-b border-sand-400 bg-sand-50">
      <div className="content-shell py-10 lg:py-14">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="eyebrow">Find a Reference</p>
            <h2 className="font-serif text-3xl leading-tight text-ink-900 md:text-5xl">
              Browse projects by space, focus, and result.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <label className="control-label">
              Search projects
              <span className="search-group grid-cols-[auto_1fr] items-center px-4">
                <Search className="h-4 w-4 text-ink-700" />
                <input
                  className="field"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Service, material, room, or result..."
                  type="search"
                  value={query}
                />
              </span>
            </label>
            <label className="control-label">
              Project type
              <select className="select-field" onChange={(event) => setType(event.target.value)} value={type}>
                {projectTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <button
              className="action-secondary h-[46px] self-end px-4"
              disabled={!query && type === "All projects"}
              onClick={reset}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-sand-400 py-4">
          <p className="text-sm font-semibold text-ink-900">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} matched
          </p>
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((item) => (
              <button
                key={item}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  type === item
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-sand-400 bg-white text-ink-700 hover:border-brand-red hover:text-brand-red"
                }`}
                onClick={() => setType(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article key={project.id} className="surface-card overflow-hidden">
                <Link className="group relative block h-64 overflow-hidden bg-sand-100" href={project.href}>
                  <img
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={project.imageUrl}
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-900 shadow-soft">
                    {project.projectType}
                  </span>
                </Link>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">{project.focus}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-ink-900">
                    <Link className="transition hover:text-brand-red" href={project.href}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-700">{project.caption}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[project.setting, ...project.outcomes.slice(0, 2)].filter(Boolean).map((item) => (
                      <span key={item} className="rounded-md border border-sand-400 bg-sand-50 px-2.5 py-1 text-xs text-ink-700">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <Link className="action-commerce min-h-10 gap-2 px-3 py-2 text-xs" href={project.href}>
                      Case Study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link className="action-secondary min-h-10 gap-2 px-3 py-2 text-xs" href={`/contact?project=${encodeURIComponent(project.id)}`}>
                      Plan Similar
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="surface-card mt-6 grid min-h-72 place-items-center p-8 text-center">
            <div>
              <SlidersHorizontal className="mx-auto h-10 w-10 text-brand-red" />
              <h3 className="mt-4 font-serif text-3xl text-ink-900">No projects match this search.</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-700">
                Clear the filters or send KMD your reference so the team can suggest the closest project direction.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <button className="action-secondary" onClick={reset} type="button">
                  Clear Filters
                </button>
                <Link className="action-commerce" href="/contact?topic=portfolio-reference">
                  Send Reference
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export type { PortfolioBrowserProject };
