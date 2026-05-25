import { projects } from "@/lib/homepage-data";

export function FeaturedProjectsSection() {
  const [lead, ...supporting] = projects;

  return (
    <section id="portfolio" className="section-shell">
      <p className="eyebrow">Featured Projects</p>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="surface-card overflow-hidden">
          <img alt={lead.title} className="h-[430px] w-full object-cover" src={lead.imageUrl} />
          <div className="p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-700">{lead.projectType}</p>
            <h2 className="mt-3 font-serif text-4xl text-ink-900">{lead.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">{lead.caption}</p>
          </div>
        </article>
        <div className="grid gap-6">
          {supporting.map((project) => (
            <article key={project.id} className="surface-card grid overflow-hidden md:grid-cols-[0.95fr_1.05fr]">
              <img alt={project.title} className="h-full min-h-64 w-full object-cover" src={project.imageUrl} />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-700">{project.projectType}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink-900">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-700">{project.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
