import { ProductDetailActions } from "@/components/cart/product-detail-actions";
import { ProductCard } from "@/components/home/product-card";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ProductGallery } from "@/components/products/product-gallery";
import { products } from "@/lib/homepage-data";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  PackageCheck,
  Ruler,
  Truck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);

  if (!product) {
    return {
      title: "Product not found | Decor"
    };
  }

  return {
    title: `${product.name} | Decor`,
    description: product.descriptor
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);

  if (!product) notFound();

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .sort((first, second) => {
      const firstScore = product.compatibleProductIds.includes(first.id) ? 2 : first.category === product.category ? 1 : 0;
      const secondScore = product.compatibleProductIds.includes(second.id) ? 2 : second.category === product.category ? 1 : 0;
      return secondScore - firstScore;
    })
    .slice(0, 3);
  const needsQuote = product.quoteRecommended || product.stockStatus !== "In stock";
  const advisorHref = `/contact?product=${encodeURIComponent(product.id)}`;
  const galleryImages = product.galleryImages.length > 0 ? product.galleryImages : [product.imageUrl];
  const savingPercent = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : null;
  const technicalSpecs = [
    ["SKU", product.sku],
    ["Brand", product.brand],
    ["Category", product.category],
    ["Sold by", product.unit],
    ["Minimum order", product.moq],
    ["Lead time", product.leadTime],
    ["Delivery", product.delivery]
  ];

  return (
    <main className="page-shell">
      <SiteHeader />

      <div className="border-b border-sand-400 bg-sand-50">
        <div className="content-shell flex min-w-0 items-center gap-2 overflow-x-auto py-4 text-xs text-ink-700 sm:text-sm">
          <a className="inline-flex shrink-0 items-center gap-2 font-semibold transition hover:text-brand-red" href="/products">
            <ArrowLeft className="h-4 w-4" />
            Products
          </a>
          <span className="text-sand-400">/</span>
          <a className="shrink-0 font-medium transition hover:text-brand-red" href={`/products?category=${encodeURIComponent(product.category)}#catalog`}>
            {product.category}
          </a>
          <span className="text-sand-400">/</span>
          <span className="truncate text-ink-900">{product.name}</span>
        </div>
      </div>

      <section className="content-shell py-8 lg:py-12">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:items-start xl:gap-14">
          <ProductGallery badge={product.badge} category={product.category} images={galleryImages} productName={product.name} />

          <aside className="lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-ink-700">
              <span>{product.brand}</span>
              <span className="h-1 w-1 rounded-full bg-sand-400" />
              <span>{product.sku}</span>
            </div>

            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-ink-900 md:text-5xl">{product.name}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink-700">{product.descriptor}</p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-y border-sand-400 py-5">
              <div>
                {needsQuote ? <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">Reference price</p> : null}
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl font-semibold tracking-tight text-brand-red">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-ink-700">per {product.unit}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  {product.comparePrice ? <span className="text-ink-700 line-through">${product.comparePrice.toFixed(2)}</span> : null}
                  {savingPercent ? <span className="font-semibold text-brand-red">Save {savingPercent}%</span> : null}
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-sand-400 bg-white px-3 py-2 text-xs font-semibold text-ink-900">
                <span className={`h-2 w-2 rounded-full ${product.stockStatus === "In stock" ? "bg-emerald-500" : product.stockStatus === "Low stock" ? "bg-amber-500" : "bg-ink-700"}`} />
                {product.stockStatus}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <span key={spec} className="rounded-full bg-sand-100 px-3 py-2 text-xs font-medium text-ink-700">
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-5 grid overflow-hidden rounded-lg border border-sand-400 bg-white sm:grid-cols-3">
              <QuickFact Icon={Ruler} label="Minimum" value={product.moq} />
              <QuickFact Icon={Clock3} label="Availability" value={product.leadTime} />
              <QuickFact Icon={Truck} label="Fulfillment" value={product.delivery} />
            </div>

            <ProductDetailActions advisorHref={advisorHref} needsQuote={needsQuote} product={product} />

            <div className="mt-6 flex items-start gap-3 rounded-lg bg-sand-100 p-4 text-sm leading-6 text-ink-700">
              <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
              <p>
                {needsQuote
                  ? "Final availability, product selection, delivery, and project pricing are confirmed before order."
                  : "Our team can confirm product fit and delivery requirements before your order is finalized."}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-sand-400 bg-sand-200/55">
        <div className="content-shell grid gap-10 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:py-16">
          <div>
            <p className="eyebrow">Product Overview</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">A practical fit for the work.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-ink-700">{product.customerGoal}</p>
          </div>

          <div className="grid overflow-hidden rounded-lg border border-sand-400 bg-white sm:grid-cols-2">
            {product.keyFeatures.map((feature, index) => (
              <div
                key={feature}
                className="flex items-start gap-4 border-b border-sand-400 p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-xs font-semibold text-brand-red">0{index + 1}</span>
                <p className="pt-0.5 text-sm font-medium leading-6 text-ink-900">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] xl:gap-16">
          <div className="grid gap-9">
            <DetailList title="Recommended applications" items={product.applications} />
            <DetailList title="Before you order" items={product.materialNotes} />
          </div>

          <div>
            <p className="eyebrow">Product Details</p>
            <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">Ordering reference</h2>
            <div className="mt-6 overflow-hidden rounded-lg border border-sand-400 bg-white">
              {technicalSpecs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[130px_minmax(0,1fr)] border-b border-sand-400 last:border-b-0 sm:grid-cols-[180px_minmax(0,1fr)]">
                  <div className="bg-sand-100 px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-700">{label}</div>
                  <div className="px-4 py-3.5 text-sm font-medium text-ink-900">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-5 rounded-lg bg-[var(--text)] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Project quantities</p>
                <p className="mt-2 max-w-lg font-serif text-2xl leading-tight">Need material planning, delivery, or installation support?</p>
              </div>
              <a className="action-commerce shrink-0 gap-2" href={advisorHref}>
                Discuss Requirements
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sand-400 bg-sand-50">
        <div className="content-shell py-12 lg:py-16">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Complete the Selection</p>
              <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">Products that work well with this.</h2>
            </div>
            <a className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/products">
              Browse all products
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function QuickFact({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border-b border-sand-400 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <Icon className="h-4 w-4 text-brand-red" />
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-5 text-ink-900">{value}</p>
    </div>
  );
}

function DetailList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-ink-900">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-ink-700">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-red" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
