import { ProductCard } from "@/components/home/product-card";
import { InquirySection } from "@/components/home/inquiry-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ServiceFaq } from "@/components/services/service-faq";
import { getRelatedServiceProducts, getServiceBySlug, getServiceDetail } from "@/lib/service-data";
import { services } from "@/lib/homepage-data";
import { ArrowLeft, ArrowRight, Camera, CheckCircle2, ClipboardCheck, MapPin, PackageCheck, Ruler, Truck } from "lucide-react";
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
      title: "Service not found | Kimmex Decor"
    };
  }

  return {
    title: `${service.title} | Kimmex Decor`,
    description: service.description
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) notFound();

  const relatedProducts = getRelatedServiceProducts(slug);

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell flex flex-wrap items-center gap-2 py-5 text-sm text-ink-700">
          <a className="inline-flex items-center gap-2 font-semibold text-bronze-500" href="/services">
            <ArrowLeft className="h-4 w-4" />
            Services
          </a>
          <span>/</span>
          <span>{service.title}</span>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="relative overflow-hidden rounded-lg border border-sand-400 bg-ink-900">
          <img alt={service.title} className="h-[520px] w-full object-cover opacity-75" src={detail.visuals[0].imageUrl} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl p-6 text-white md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">KMD Service</p>
              <h1 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">{service.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">{service.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="action-commerce" href={`/contact?service=${encodeURIComponent(service.id)}`}>
                  {detail.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-ink-900" href="#service-visuals">
                  View References
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="grid gap-3 md:grid-cols-4">
          {detail.quotePrep.map((label, index) => {
            const Icon = quotePrepIcons[index] ?? ClipboardCheck;
            return (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-sand-400 bg-sand-50 p-4 text-sm font-semibold text-ink-900">
              <Icon className="h-5 w-5 text-brand-red" />
              {label}
              </div>
            );
          })}
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-ink-700">{detail.timeline}</p>
      </section>

      <section className="section-shell py-8">
        <div className="grid gap-6 border-y border-sand-400 py-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 className="section-title">What this service does</h2>
          </div>
          <p className="text-lg leading-8 text-ink-700">{detail.overview ?? service.description}</p>
        </div>
      </section>

      <section className="section-shell pt-8" id="service-visuals">
        <div className="mb-4 flex flex-col gap-3 border-b border-sand-400 pb-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Visual References</p>
            <h2 className="mt-1 font-serif text-3xl text-ink-900">Use photos to explain the result you want</h2>
          </div>
          <a className="w-fit text-sm font-semibold text-bronze-500" href={`/contact?service=${encodeURIComponent(service.id)}`}>
            {detail.photoCta}
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {detail.visuals.map((visual) => (
            <article key={visual.title} className="overflow-hidden rounded-lg border border-sand-400 bg-white">
              <img alt={visual.title} className="h-72 w-full object-cover" src={visual.imageUrl} />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-ink-900">{visual.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-700">{visual.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="eyebrow">Service Planning</p>
            <h2 className="section-title">What matters before a quote</h2>
            <p className="section-copy mt-4">
              KMD reviews the work type, site condition, material direction, and delivery or installation needs before
              recommending next steps.
            </p>
          </div>
          <div className="grid gap-0 overflow-hidden rounded-lg border border-sand-400 bg-white lg:grid-cols-3">
            <DetailPanel title="Scope" items={detail.scope} />
            <DetailPanel title="Outcomes" items={detail.outcomes} />
            <DetailPanel title="Quote Factors" items={detail.quoteFactors} />
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">Best For</p>
            <h2 className="section-title">When this service fits</h2>
            <div className="mt-5 grid gap-3">
              {detail.bestFor.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-sand-400 bg-sand-50 p-4 text-sm font-semibold leading-6 text-ink-900">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-red" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Materials</p>
            <h2 className="section-title">Products often used</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {detail.materials.map((material) => (
                <div key={material} className="rounded-lg border border-sand-400 bg-white p-4">
                  <div className="flex items-start gap-3 text-sm font-semibold text-ink-900">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                    {material}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="section-shell" id="related-products">
          <div className="mb-4 flex flex-col gap-3 border-b border-sand-400 pb-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Related Products</p>
              <h2 className="mt-1 font-serif text-3xl text-ink-900">Material options for this service</h2>
            </div>
            <a className="w-fit text-sm font-semibold text-bronze-500" href="/products">
              Browse all products
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-shell pt-8">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </div>
          <ServiceFaq items={detail.faqs} />
        </div>
      </section>

      <InquirySection />
      <SiteFooter />
    </main>
  );
}

function DetailPanel({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="border-b border-sand-400 p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <PackageCheck className="mb-4 h-5 w-5 text-brand-red" />
      <h2 className="font-serif text-2xl text-ink-900">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-ink-700">
            <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-brand-red" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
