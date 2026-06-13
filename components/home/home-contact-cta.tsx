import { ArrowRight, Camera, FileText, Ruler } from "lucide-react";

const projectDetails = [
  { Icon: Camera, label: "Project photos" },
  { Icon: Ruler, label: "Approximate size" },
  { Icon: FileText, label: "Material list or BOQ" }
];

export function HomeContactCta() {
  return (
    <section className="content-shell pb-16 lg:pb-20">
      <div className="grid overflow-hidden rounded-lg bg-ink-900 text-white lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="p-7 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">Plan Your Project</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Need help choosing products or planning the work?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
            Send a few project details and KMD can recommend the right material, service, or next step.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {projectDetails.map(({ Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-sm text-white/80">
                <Icon className="h-4 w-4 text-brand-red" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-white/15 p-7 lg:border-l lg:border-t-0 lg:p-10">
          <a className="action-commerce whitespace-nowrap" href="/contact">
            Contact KMD Decor
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
