import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ProductCatalog } from "@/components/products/product-catalog";
import { products, shopCategories, useCases } from "@/lib/homepage-data";
import type { ProductItem } from "@/lib/homepage-data";
import { ArrowRight } from "lucide-react";

const brands = Array.from(new Set(products.map((product) => product.brand)));
const availability = ["In stock", "Preorder", "Low stock"] satisfies ProductItem["stockStatus"][];

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="commerce-band">
        <div className="content-shell py-10 lg:py-12">
          <div className="surface-card relative overflow-hidden p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[5rem] bg-brand-red/10" />
            <p className="promo-chip w-fit">KMD product marketplace</p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-ink-900 md:text-6xl">
              Shop construction materials with contractor quote support.
            </h1>
            <p className="section-copy mt-5">
              Browse Kimmex Decor materials by category, availability, and brand. Add fixed-price items to cart or request
              a quote for quantity, delivery, and installation scope.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a className="action-secondary" href="#catalog">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a className="action-commerce" href="/contact">
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductCatalog availability={availability} brands={brands} categories={shopCategories} products={products} useCases={useCases} />

      <SiteFooter />
    </main>
  );
}
