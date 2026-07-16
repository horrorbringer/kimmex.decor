import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ArrowRight, ClipboardList, PackageCheck, Search, TriangleAlert } from "lucide-react";
import type { ProductItem } from "@/lib/homepage-data";
import { getCatalogCategories } from "@/lib/api-browse";
import { blurPlaceholder } from "@/lib/blur-placeholder";
import { richContentToText } from "@/lib/rich-content";
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

const productPaths = [
  {
    label: "Ready to order",
    copy: "In-stock items for faster cart requests.",
    href: "/products?mode=Ready%20to%20order#catalog",
    icon: PackageCheck,
  },
  {
    label: "Needs quote",
    copy: "Confirm stock, quantity, and delivery.",
    href: "/products?mode=Needs%20quote#catalog",
    icon: ClipboardList,
  },
  {
    label: "Low stock / preorder",
    copy: "Plan lead time before ordering.",
    href: "/products?mode=Preorder%20or%20low%20stock#catalog",
    icon: TriangleAlert,
  },
  {
    label: "Search catalog",
    copy: "Find products, categories, and services.",
    href: "/search",
    icon: Search,
  },
];

function productSlug(product: ProductItem) {
  return product.href.replace("/products/", "");
}

function productReadiness(product: ProductItem) {
  if (product.stockStatus === "In stock" && !product.quoteRecommended) {
    return { label: "Ready to order", className: "is-ready" };
  }

  if (product.stockStatus === "Low stock") {
    return { label: "Check availability", className: "is-warning" };
  }

  return { label: "Quote recommended", className: "is-quote" };
}

export async function ProductShowcaseSection({ products }: ProductShowcaseSectionProps) {
  const featuredProducts = products.filter((product) => product.badge === "Best seller" || product.badge === "Featured").slice(0, 4);
  const displayProducts = featuredProducts.length >= 4 ? featuredProducts : products.slice(0, 4);
  
  let productGroups = fallbackProductGroups;
  try {
    const categories = await getCatalogCategories();
    if (categories.length > 0) {
      productGroups = categories.slice(0, 4).map((category) => ({
        label: category.name,
        copy: richContentToText(category.description) || `Browse ${category.name} products`,
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {productPaths.map((path) => {
          const Icon = path.icon;

          return (
            <Link key={path.label} className="product-intent-link" href={path.href}>
              <span>
                <Icon aria-hidden="true" />
              </span>
              <strong>{path.label}</strong>
              <small>{path.copy}</small>
            </Link>
          );
        })}
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
        {displayProducts.map((product) => {
          const readiness = productReadiness(product);
          const needsQuote = product.quoteRecommended || product.stockStatus !== "In stock";
          const contactHref = `/contact?product=${encodeURIComponent(productSlug(product))}#request-form`;

          return (
            <article key={product.id} className="group flex h-full flex-col overflow-hidden rounded-lg border border-sand-400 bg-white transition hover:-translate-y-1 hover:shadow-panel">
              <Link className="relative block h-56 overflow-hidden bg-sand-100" href={product.href}>
                <Image
                  alt={product.name}
                  className="object-cover transition duration-300 group-hover:scale-105"
                  src={product.imageUrl}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder()}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <span className={`product-readiness ${readiness.className}`}>{readiness.label}</span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">
                  <span>{product.category}</span>
                  <span>{product.stockStatus}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-ink-900">
                  <Link className="transition hover:text-brand-red" href={product.href}>
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-700">{product.customerGoal || product.descriptor}</p>
                <div className="mt-auto flex items-end justify-between gap-3 border-t border-sand-400 pt-4">
                  <div>
                    <span className="text-xl font-semibold text-brand-red">${product.price.toFixed(2)}</span>
                    <span className="ml-1 text-sm text-ink-700">/ {product.unit}</span>
                  </div>
                  <div className="text-right text-xs leading-5 text-ink-700">
                    <div>{product.leadTime}</div>
                    <div>MOQ: {product.moq}</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {needsQuote ? (
                    <Link className="action-commerce min-h-10 gap-2 px-3 py-2 text-xs" href={contactHref}>
                      Request quote
                    </Link>
                  ) : (
                    <AddToCartButton className="action-commerce min-h-10 gap-1.5 px-3 py-2 text-xs" compact product={product} />
                  )}
                  <Link className="action-secondary min-h-10 px-3 py-2 text-xs" href={product.href}>
                    Details
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
