import { Archive, Lightbulb, Wrench } from "lucide-react";
import { trustPoints } from "@/lib/homepage-data";

const trustIcons = [
  { icon: Archive, description: "40+ brands across ceiling systems, boards, fixtures, and smart home products sourced and verified for quality and availability." },
  { icon: Lightbulb, description: "Each project is unique. We bundle materials, offer finishing services, and create quotes tailored to room dimensions and design goals." },
  { icon: Wrench, description: "From material selection to installation support. Technical teams can advise on specifications, MOQ, lead times, and on-site requirements." }
];

export function TrustHighlightsSection() {
  return (
    <section className="section-shell">
      <p className="eyebrow">Why Choose Us</p>
      <div className="grid gap-6 md:grid-cols-3">
        {trustPoints.map((point, index) => {
          const { icon: Icon, description } = trustIcons[index] || {};
          return (
            <article key={point} className="surface-card p-6">
              {Icon && <Icon className="mb-4 h-10 w-10 text-brand-red" />}
              <h3 className="font-serif text-2xl text-ink-900">{point}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                {description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
