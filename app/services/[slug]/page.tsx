import { ProductCard } from "@/components/home/product-card";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ServiceFaq } from "@/components/services/service-faq";
import { getRelatedServiceProducts, getServiceBySlug, getServiceDetail } from "@/lib/service-data";
import { services } from "@/lib/homepage-data";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  PackageCheck,
  Ruler,
  Sparkles,
  Truck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const quotePrepIcons = [Camera, Ruler, MapPin, Truck];

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found | Decor"
    };
  }

  return {
    title: `${service.title} | Decor`,
    description: service.description
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) notFound();

  const relatedProducts = getRelatedServiceProducts(slug);
  const consultationHref = `/contact?service=${encodeURIComponent(service.id)}`;

  return (
    <main className="page-shell">
      <SiteHeader />

      <div className="border-b border-sand-400 bg-sand-50">
        <div className="content-shell flex min-w-0 items-center gap-2 overflow-x-auto py-4 text-xs text-ink-700 sm:text-sm">
          <a className="inline-flex shrink-0 items-center gap-2 font-semibold transition hover:text-brand-red" href="/services">
            <ArrowLeft className="h-4 w-4" />
            Services
          </a>
          <span className="text-sand-400">/</span>
          <span className="truncate text-ink-900">{service.title}</span>
        </div>
      </div>

      <section className="commerce-band overflow-hidden">
        <div className="content-shell grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:py-12 xl:gap-12">
          <div className="flex flex-col justify-center py-2 lg:py-6">
            <p className="eyebrow">Interior Service</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.04] text-ink-900 md:text-6xl xl:text-7xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-700 md:text-lg">{service.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a className="action-commerce gap-2" href={consultationHref}>
                {detail.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="action-secondary gap-2" href="#service-scope">
                Explore the Scope
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-sand-400 bg-sand-400 sm:grid-cols-3">
              {detail.outcomes.slice(0, 3).map((outcome, index) => (
                <div key={outcome} className={`bg-white p-4 ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                  <CheckCircle2 className="h-4 w-4 text-brand-red" />
                  <p className="mt-3 text-xs font-semibold leading-5 text-ink-900">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-sand-400 bg-sand-100 shadow-panel md:min-h-[560px]">
            <img alt={`${service.title} reference`} className="absolute inset-0 h-full w-full object-cover" src={detail.visuals[0].imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">Planning note</p>
              <p className="mt-2 max-w-xl font-serif text-2xl leading-tight md:text-3xl">{detail.timeline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-sand-400 bg-white">
        <div className="content-shell grid gap-px bg-sand-400 sm:grid-cols-2 lg:grid-cols-4">
          {detail.quotePrep.map((label, index) => {
            const Icon = quotePrepIcons[index] ?? ClipboardCheck;

            return <PrepItem key={label} Icon={Icon} index={index} label={label} />;
          })}
        </div>
      </section>

      <section className="content-shell scroll-mt-32 py-12 lg:py-16" id="service-scope">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start xl:gap-16">
          <div>
            <p className="eyebrow">Service Overview</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">Designed around the space and the result.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-ink-900 md:text-xl md:leading-9">{detail.overview ?? service.description}</p>
            <div className="mt-8 border-t border-sand-400 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">A strong fit for</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {detail.bestFor.map((item) => (
                  <span key={item} className="rounded-full border border-sand-400 bg-sand-50 px-4 py-2 text-sm font-medium text-ink-900">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--text)] text-white">
        <div className="content-shell grid gap-10 py-12 lg:grid-cols-[0.62fr_1.38fr] lg:items-start lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/50">How It Comes Together</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">A clear service plan before work begins.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">
              We connect the intended finish with practical scope, suitable materials, and site requirements before
              defining the quote.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg bg-white/15 md:grid-cols-3">
            <ServicePlanColumn Icon={Ruler} items={detail.scope} number="01" title="Scope" />
            <ServicePlanColumn Icon={Sparkles} items={detail.outcomes} number="02" title="Result" />
            <ServicePlanColumn Icon={PackageCheck} items={detail.deliverables} number="03" title="Deliverables" />
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-16" id="service-visuals">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Visual Direction</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">Use references to communicate the finish.</h2>
          </div>
          <a className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href={consultationHref}>
            {detail.photoCta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {detail.visuals.map((visual, index) => (
            <article
              key={visual.title}
              className={`group relative min-h-[360px] overflow-hidden rounded-lg border border-sand-400 bg-sand-100 ${
                index === 0 ? "lg:row-span-2 lg:min-h-[740px]" : "lg:min-h-[358px]"
              }`}
            >
              <img alt={visual.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={visual.imageUrl} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-7">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Reference 0{index + 1}</span>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl">{visual.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">{visual.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-sand-400 bg-sand-200/55">
        <div className="content-shell grid gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <p className="eyebrow">Materials</p>
            <h2 className="font-serif text-3xl leading-tight text-ink-900 md:text-4xl">Commonly considered for this service.</h2>
            <div className="mt-6 overflow-hidden rounded-lg border border-sand-400 bg-white">
              {detail.materials.map((material, index) => (
                <div key={material} className="flex items-center gap-4 border-b border-sand-400 p-4 last:border-b-0">
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-brand-red">0{index + 1}</span>
                  <span className="text-sm font-semibold text-ink-900">{material}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Quote Factors</p>
            <h2 className="font-serif text-3xl leading-tight text-ink-900 md:text-4xl">What shapes the recommendation.</h2>
            <div className="mt-6 grid gap-3">
              {detail.quoteFactors.map((factor) => (
                <div key={factor} className="flex items-start gap-3 rounded-lg border border-sand-400 bg-white p-4 text-sm font-medium leading-6 text-ink-900">
                  <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="content-shell py-12 lg:py-16" id="related-products">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Related Products</p>
              <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">Material options for this service.</h2>
            </div>
            <a className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/products">
              Browse all products
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-sand-400 bg-sand-50">
        <div className="content-shell grid gap-10 py-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:py-16">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">Before you start.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink-700">
              These answers cover the information usually needed for an initial service review.
            </p>
          </div>
          <ServiceFaq items={detail.faqs} />
        </div>
      </section>

      <section className="content-shell py-10 lg:py-14">
        <div className="relative overflow-hidden rounded-lg bg-[var(--text)] p-7 text-white md:p-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Plan This Service</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">Start with a photo, approximate size, and location.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">Exact drawings are useful but not required for the first conversation.</p>
          </div>
          <a className="action-commerce relative mt-7 w-fit shrink-0 gap-2 whitespace-nowrap lg:mt-0" href={consultationHref}>
            {detail.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function PrepItem({ Icon, index, label }: { Icon: LucideIcon; index: number; label: string }) {
  return (
    <div className="flex items-start gap-4 bg-white px-4 py-5 md:px-5">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-700">Bring 0{index + 1}</p>
        <p className="mt-1 text-sm font-semibold leading-5 text-ink-900">{label}</p>
      </div>
    </div>
  );
}

function ServicePlanColumn({
  Icon,
  items,
  number,
  title
}: {
  Icon: LucideIcon;
  items: string[];
  number: string;
  title: string;
}) {
  return (
    <div className="bg-[var(--text)] p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <Icon className="h-5 w-5 text-brand-red" />
        <span className="text-[10px] font-semibold tracking-[0.18em] text-white/40">{number}</span>
      </div>
      <h3 className="mt-6 font-serif text-2xl">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/65">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
