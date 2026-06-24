import { ArrowRight } from "lucide-react";
import type { ProductItem } from "@/lib/homepage-data";
import { getCatalogCategories } from "@/lib/api-browse";
import { blurPlaceholder } from "@/lib/blur-placeholder";
import Image from "next/image";
import Link from "next/link";

type ProductShowcaseSectionProps = {
  products: ProductItem[];
};

const fallbackProductGroups = [
  { label: "Gypsum Board", copy: "Ceiling and partition boards", href: "/products?category=Gypsum%20Board" },
  { label: "Frames", copy: "Ceiling and partition systems", href: "/products?category=Cline%20%26%20Partition%20Frame" },
  { label: "Decor Boards", copy: "MDF, plywood, and finish boards", href: "/products?category=Decor%20Materials" },
  { label: "Sanitaryware", copy: "Bathroom fixtures and fittings", href: "/products?category=Sanitary%20Ware" }
];

export async function ProductShowcaseSection({ products }: ProductShowcaseSectionProps) {
  const featuredProducts = products.filter((product) => product.badge === "Best seller" || product.badge === "Featured").slice(0, 4);
  const displayProducts = featuredProducts.length >= 4 ? featuredProducts : products.slice(0, 4);
  
  let productGroups = fallbackProductGroups;
  try {
    const categories = await getCatalogCategories();
    if (categories.length > 0) {
      productGroups = categories.slice(0, 4).map((category) => ({
        label: category.name,
        copy: category.description || `Browse ${category.name} products`,
        href: `/products?category=${encodeURIComponent(category.slug)}`
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch categories, using fallback", error);
  }

  return (
    <section className="section-shell" id="products">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Product Showcase</p>
          <h2 className="section-title max-w-3xl">Materials selected for interior and construction work.</h2>
          <p className="section-copy mt-4">
            Start with the main product groups from KMD, then check specifications, availability, and project quantity.
          </p>
        </div>
        <Link className="action-secondary w-fit" href="/products">
          View All Products
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid overflow-hidden rounded-lg border border-sand-400 bg-white sm:grid-cols-2 lg:grid-cols-4">
        {productGroups.map((group) => (
          <Link
            key={group.label}
            className="border-b border-sand-400 p-5 transition hover:bg-sand-100 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0"
            href={group.href}
          >
            <div className="font-semibold text-ink-900">{group.label}</div>
            <div className="mt-1 text-sm text-ink-700">{group.copy}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {displayProducts.map((product) => (
          <article key={product.id} className="group overflow-hidden rounded-lg border border-sand-400 bg-white transition hover:-translate-y-1 hover:shadow-panel">
            <Link className="relative block overflow-hidden" href={product.href}>
              <Image
                alt={product.name}
                className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                src={product.imageUrl}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurPlaceholder()}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
            </Link>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">
                <span>{product.category}</span>
                <span>{product.stockStatus}</span>
              </div>
              <h3 className="mt-3 font-serif text-2xl leading-tight text-ink-900">
                <Link className="transition hover:text-brand-red" href={product.href}>
                  {product.name}
                </Link>
              </h3>
              <div className="mt-5 flex items-end justify-between gap-3 border-t border-sand-400 pt-4">
                <div>
                  <span className="text-xl font-semibold text-brand-red">${product.price.toFixed(2)}</span>
                  <span className="ml-1 text-sm text-ink-700">/ {product.unit}</span>
                </div>
                <Link className="text-sm font-semibold text-ink-900 transition hover:text-brand-red" href={product.href}>
                  Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
