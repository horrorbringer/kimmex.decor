import { trustPoints } from "@/lib/homepage-data";

export function TrustHighlightsSection() {
  return (
    <section className="section-shell">
      <p className="eyebrow">Why Choose Us</p>
      <div className="grid gap-6 md:grid-cols-3">
        {trustPoints.map((point) => (
          <article key={point} className="surface-card p-6">
            <div className="mb-4 h-10 w-10 rounded-full border border-sand-400 bg-sand-100" />
            <h3 className="font-serif text-2xl text-ink-900">{point}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              Position this section as high-trust proof rather than generic marketing copy. Keep each claim concrete and
              supported by project or catalog depth.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
