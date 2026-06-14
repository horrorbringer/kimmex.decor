import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { services } from "@/lib/homepage-data";
import { serviceDetails } from "@/lib/service-data";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  Check,
  ClipboardCheck,
  Layers3,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";

const processSteps = [
  {
    Icon: Camera,
    title: "Share your space",
    copy: "Send clear photos, a drawing, or a reference showing the result you want."
  },
  {
    Icon: Ruler,
    title: "Define the requirement",
    copy: "Confirm approximate dimensions, project location, timing, and installation needs."
  },
  {
    Icon: ClipboardCheck,
    title: "Receive a clear proposal",
    copy: "Review the recommended service, suitable materials, scope, and quotation direction."
  }
];

const strengths = [
  {
    Icon: Layers3,
    title: "Multi-brand materials",
    copy: "Select products around the project requirement, finish, budget, and availability."
  },
  {
    Icon: Wrench,
    title: "Technical coordination",
    copy: "Connect material selection with practical installation and site conditions."
  },
  {
    Icon: ShieldCheck,
    title: "Safety-minded planning",
    copy: "Review the system, access, and application before confirming the work."
  },
  {
    Icon: Sparkles,
    title: "Custom interior direction",
    copy: "Adapt ceiling, wall, furniture, and smart features to the space."
  }
];

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="relative isolate min-h-[520px] overflow-hidden bg-ink-900 md:min-h-[620px]">
        <img
          alt="Modern interior finished with coordinated ceiling, lighting, and furniture"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="content-shell relative flex min-h-[520px] items-end py-12 text-white md:min-h-[620px] md:py-16">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">KMD Interior Services</p>
            <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.06] sm:text-5xl md:text-6xl lg:text-7xl">
              Interior services shaped around your space.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">
              From finished ceilings and partition systems to built-in furniture and smart access, KMD connects design
              direction, suitable materials, and practical project support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="action-commerce justify-center" href="/contact">
                Discuss Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/45 px-5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-ink-900" href="#services">
                Explore Services
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Service categories" className="border-b border-sand-400 bg-white" id="services">
        <div className="content-shell flex snap-x gap-1 overflow-x-auto py-3">
          {services.map((service, index) => (
            <a
              key={service.id}
              className="flex min-h-11 shrink-0 snap-start items-center gap-3 px-4 text-sm font-semibold text-ink-700 transition hover:bg-sand-100 hover:text-brand-red"
              href={`#${service.id}`}
            >
              <span className="text-[10px] text-ink-700/65">0{index + 1}</span>
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      <section className="content-shell py-12 lg:py-20">
        <div className="mb-10 grid gap-4 border-b border-sand-400 pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">What We Do</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">One team. Four interior capabilities.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-ink-700 lg:justify-self-end md:text-base">
            Start with the space and result you need. KMD will help identify the appropriate service, material system,
            and next step for residential or commercial work.
          </p>
        </div>

        <div>
          {services.map((service, index) => {
            const detail = serviceDetails[service.id];
            const imageFirst = index % 2 === 0;

            return (
              <article
                key={service.id}
                className="grid scroll-mt-28 gap-0 border-b border-sand-400 py-9 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-2 lg:items-stretch lg:py-14"
                id={service.id}
              >
                <a
                  aria-label={`View ${service.title}`}
                  className={`group relative min-h-[280px] overflow-hidden bg-sand-200 sm:min-h-[380px] lg:min-h-[470px] ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                  href={service.href}
                >
                  <img
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    src={service.imageUrl}
                  />
                  <span className="absolute bottom-4 left-4 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-900">
                    Service 0{index + 1}
                  </span>
                </a>

                <div className={`flex flex-col justify-center bg-sand-100 p-6 sm:p-9 lg:p-12 xl:p-16 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">{service.title}</p>
                  <h2 className="mt-4 font-serif text-3xl leading-tight text-ink-900 sm:text-4xl">
                    {detail?.outcomes[0] ?? "Designed for a better interior result."}
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-ink-700 md:text-base">{service.description}</p>

                  <div className="mt-7 grid gap-3 border-y border-sand-400 py-6">
                    {(detail?.scope ?? []).slice(0, 3).map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm font-medium text-ink-900">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" strokeWidth={2.4} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <a className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-red" href={service.href}>
                      View Service Details
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <span className="text-xs text-ink-700">{detail?.timeline}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-sand-400 bg-sand-200/55">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">How It Starts</p>
              <h2 className="section-title">Clear information before construction begins.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-ink-700">
                Detailed drawings help, but they are not required for the first conversation. Photos and approximate
                measurements are enough to begin.
              </p>
              <a className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-red" href="/contact">
                Prepare a Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <ol className="border-t border-sand-400">
              {processSteps.map(({ Icon, copy, title }, index) => (
                <li key={title} className="grid gap-4 border-b border-sand-400 py-7 sm:grid-cols-[64px_1fr] sm:py-9">
                  <div className="flex items-center justify-between sm:block">
                    <span className="text-xs font-semibold text-ink-700">0{index + 1}</span>
                    <Icon className="h-5 w-5 text-brand-red sm:mt-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-ink-900 md:text-3xl">{title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-ink-700">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-20">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">Why KMD</p>
          <h2 className="section-title">Design decisions supported by practical experience.</h2>
        </div>
        <div className="grid border-l border-t border-sand-400 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map(({ Icon, copy, title }) => (
            <div key={title} className="border-b border-r border-sand-400 p-6 lg:min-h-[250px] lg:p-7">
              <Icon className="h-5 w-5 text-brand-red" />
              <h3 className="mt-8 font-serif text-2xl text-ink-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-700">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-900 text-white">
        <div className="content-shell grid gap-7 py-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Start With Your Space</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">Have an interior project in mind?</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              Send your contact details, location, project requirement, preferred appointment time, and any available photos.
            </p>
          </div>
          <a className="action-commerce w-full justify-center whitespace-nowrap sm:w-fit" href="/contact">
            Start a Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
