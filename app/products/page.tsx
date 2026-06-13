import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ProductCatalog } from "@/components/products/product-catalog";
import { products, shopCategories } from "@/lib/homepage-data";
import type { ProductItem } from "@/lib/homepage-data";
import { ArrowRight } from "lucide-react";

const brands = Array.from(new Set(products.map((product) => product.brand)));
const availability = ["In stock", "Preorder", "Low stock"] satisfies ProductItem["stockStatus"][];

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="commerce-band">
        <div className="content-shell grid gap-6 py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:py-12">
          <div>
            <p className="eyebrow">Products</p>
            <h1 className="max-w-4xl font-serif text-4xl leading-tight text-ink-900 md:text-5xl">
              Construction and interior materials for your project.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">
              Browse products by category, brand, and availability. Order standard items online or request pricing for
              project quantities.
            </p>
          </div>
          <a className="action-commerce w-fit" href="/contact">
            Request Project Pricing
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <ProductCatalog availability={availability} brands={brands} categories={shopCategories} products={products} />

      <SiteFooter />
    </main>
  );
}
