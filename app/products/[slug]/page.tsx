import { ProductDetailActions } from "@/components/cart/product-detail-actions";
import { ProductCard } from "@/components/home/product-card";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInformation } from "@/components/products/product-information";
import { RawStructuredData, StructuredData } from "@/components/structured-data";
import { getCatalogProduct, getCatalogProducts } from "@/lib/api-catalog";
import { products as fallbackProducts } from "@/lib/homepage-data";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
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

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return fallbackProducts.map((product) => ({
    slug: product.href.replace("/products/", "")
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);

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
  const [product, products] = await Promise.all([getCatalogProduct(slug), getCatalogProducts()]);

  if (!product) notFound();

  const catalogProduct = products.find((item) => item.href === product.href) ?? product;
  const compatibleProductIds = new Set(catalogProduct.compatibleProductIds);
  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .sort((first, second) => {
      const firstScore = compatibleProductIds.has(first.id) ? 2 : first.category === product.category ? 1 : 0;
      const secondScore = compatibleProductIds.has(second.id) ? 2 : second.category === product.category ? 1 : 0;
      return secondScore - firstScore;
    })
    .slice(0, 3);
  const needsQuote = product.quoteRecommended || product.stockStatus !== "In stock";
  const productSlug = product.href.replace("/products/", "");
  const advisorHref = `/contact?product=${encodeURIComponent(productSlug)}`;
  const galleryImages = product.galleryImages.length > 0 ? product.galleryImages : [product.imageUrl];
  const savingPercent = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : null;
  return (
    <main className="page-shell">
      {product.structuredData ? <RawStructuredData data={product.structuredData} /> : <StructuredData
        data={{
          type: "product",
          name: product.name,
          description: product.descriptor,
          image: product.imageUrl,
          sku: product.sku,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            price: product.price.toFixed(2),
            priceCurrency: "USD",
            availability: product.stockStatus === "In stock"
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `https://kmdecor.com${product.href}`,
          },
        }}
      />}
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
          <ProductGallery
            badge={product.badge}
            category={product.category}
            images={galleryImages}
            productName={product.name}
            sku={product.sku}
            specs={product.specs}
          />

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

            <div className="mt-5 grid overflow-hidden rounded-lg border border-sand-400 bg-white sm:grid-cols-3">
              <QuickFact Icon={Ruler} label="Minimum" value={product.moq} />
              <QuickFact Icon={Clock3} label="Availability" value={product.leadTime} />
              <QuickFact Icon={Truck} label="Fulfillment" value={product.delivery} />
            </div>

            <ProductDetailActions advisorHref={advisorHref} needsQuote={needsQuote} product={product} />
          </aside>
        </div>
      </section>

      <ProductInformation product={product} />

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
