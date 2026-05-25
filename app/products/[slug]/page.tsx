import { ProductCard } from "@/components/home/product-card";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ProductGallery } from "@/components/products/product-gallery";
import { products } from "@/lib/homepage-data";
import { ArrowLeft, CheckCircle2, ClipboardCheck, PackageCheck, Truck } from "lucide-react";
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
      title: "Product not found | Kimmex Decor"
    };
  }

  return {
    title: `${product.name} | Kimmex Decor`,
    description: product.descriptor
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);

  if (!product) notFound();

  const compatibleProducts = product.compatibleProductIds
    .map((id) => products.find((item) => item.id === id))
    .filter((item): item is (typeof products)[number] => Boolean(item));
  const relatedProducts = compatibleProducts.length > 0 ? compatibleProducts : products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const needsQuote = product.quoteRecommended || product.stockStatus !== "In stock";
  const primaryAction = needsQuote ? "Request Product Quote" : "Add to Cart";
  const primaryHref = needsQuote ? "/contact" : "/cart";
  const advisorHref = `/contact?product=${encodeURIComponent(product.id)}`;
  const galleryImages = product.galleryImages.length > 0 ? product.galleryImages : [product.imageUrl];
  const technicalSpecs = [
    ["SKU", product.sku],
    ["Category", product.category],
    ["Brand", product.brand],
    ["Unit", product.unit],
    ["MOQ", product.moq],
    ["Lead time", product.leadTime],
    ["Delivery", product.delivery],
    ["Stock", product.stockStatus],
    ["Quote recommended", product.quoteRecommended ? "Yes" : "No"]
  ];

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="commerce-band">
        <div className="content-shell flex flex-wrap items-center gap-2 py-5 text-sm text-ink-700">
          <a className="inline-flex items-center gap-2 font-semibold text-bronze-500" href="/products">
            <ArrowLeft className="h-4 w-4" />
            Products
          </a>
          <span>/</span>
          <a className="font-semibold text-bronze-500" href={`/products?category=${encodeURIComponent(product.category)}#catalog`}>
            {product.category}
          </a>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </section>

      <section className="section-shell pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="grid gap-6">
            <ProductGallery badge={product.badge} category={product.category} images={galleryImages} productName={product.name} />

            <section className="surface-card p-6 md:p-8">
              <p className="eyebrow mb-3">Best For</p>
              <h2 className="font-serif text-3xl text-ink-900">What this product helps you do</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-ink-700">{product.customerGoal}</p>
            </section>

            <section className="surface-card p-6 md:p-8">
              <p className="eyebrow mb-3">Key Features</p>
              <h2 className="font-serif text-3xl text-ink-900">Why customers choose it</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {[...product.keyFeatures, ...product.specs].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-lg border border-sand-400 bg-sand-100 px-4 py-3 text-sm text-ink-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-red" />
                    {feature}
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <DetailList title="Best used for" items={product.applications} />
              <DetailList title="Material notes" items={product.materialNotes} />
            </section>

            <section className="surface-card p-6 md:p-8">
              <p className="eyebrow mb-3">Technical Specs</p>
              <h2 className="font-serif text-3xl text-ink-900">Ordering reference</h2>
              <div className="mt-5 overflow-hidden rounded-lg border border-sand-400">
                {technicalSpecs.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[150px_1fr] border-b border-sand-400 last:border-b-0">
                    <div className="bg-sand-100 px-4 py-3 text-sm font-semibold text-ink-900">{label}</div>
                    <div className="bg-white px-4 py-3 text-sm text-ink-700">{value}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="surface-card sticky top-24 p-6 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-sand-400 bg-sand-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">
                {product.brand}
              </span>
              <span className="rounded-md border border-sand-400 bg-sand-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">
                {product.sku}
              </span>
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-ink-900 md:text-5xl">{product.name}</h1>
            <p className="mt-3 text-base leading-7 text-ink-700">{product.descriptor}</p>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-y border-sand-400 py-5">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-brand-red">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-ink-700">/ {product.unit}</span>
                </div>
                {product.comparePrice ? <div className="mt-1 text-sm text-ink-700 line-through">${product.comparePrice.toFixed(2)}</div> : null}
              </div>
              <div className="text-right text-sm text-ink-700">
                <div className="font-semibold text-ink-900">{product.stockStatus}</div>
                <div>{product.rating.toFixed(1)} stars ({product.reviewCount} reviews)</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoTile label="MOQ" value={product.moq} />
              <InfoTile label="Lead time" value={product.leadTime} />
              <InfoTile label="Delivery" value={product.delivery} />
            </div>

            <form action={primaryHref} className="mt-6 grid gap-4" method="get">
              <input name="product" type="hidden" value={product.id} />
              <label className="control-label">
                Quantity
                <input className="field" defaultValue="1" min="1" name="qty" type="number" />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <button className="action-commerce" formAction={primaryHref} type="submit">
                  {primaryAction}
                </button>
                <button className="action-secondary" formAction="/contact" type="submit">
                  Ask Advisor
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3 text-sm text-ink-700">
              <Benefit icon={PackageCheck} text="KMD can confirm product fit before order." />
              <Benefit icon={Truck} text="Delivery can be quoted by quantity and location." />
              <Benefit icon={ClipboardCheck} text="Bulk/project orders can be reviewed before payment." />
            </div>

            <div className="mt-6 rounded-lg border border-sand-400 bg-sand-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bronze-500">Quote checklist</p>
              <div className="mt-3 grid gap-2 text-sm text-ink-700">
                <span>Quantity or room size</span>
                <span>Delivery location</span>
                <span>Installation or supply-only</span>
              </div>
              <a className="mt-4 inline-flex text-sm font-semibold text-bronze-500" href={advisorHref}>
                Send quote details
              </a>
            </div>
          </aside>
        </div>

        <section className="mt-10">
          <div className="mb-4 flex flex-col gap-3 border-b border-sand-400 pb-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Compatible products</p>
              <h2 className="mt-1 font-serif text-3xl text-ink-900">Works well with</h2>
            </div>
            <a className="w-fit text-sm font-semibold text-bronze-500" href="/products">
              Browse catalog
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-sand-400 bg-sand-100 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">{label}</div>
      <div className="mt-2 font-semibold text-ink-900">{value}</div>
    </div>
  );
}

function Benefit({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-sand-400 bg-sand-50 px-4 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
      <span>{text}</span>
    </div>
  );
}

function DetailList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="surface-card p-6">
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
