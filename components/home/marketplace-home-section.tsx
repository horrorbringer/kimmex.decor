import { ProductCard } from "@/components/home/product-card";
import { products, projectPackages, shopCategories } from "@/lib/homepage-data";

const popularProducts = products.slice(0, 4);
const categoryHref = (category: string) => `/products?category=${encodeURIComponent(category)}`;

export function MarketplaceHomeSection() {
  return (
    <section>
      <div className="commerce-band">
        <div className="content-shell grid gap-5 py-6 lg:grid-cols-[270px_1fr_270px]">
          <aside className="surface-card overflow-hidden">
            <div className="bg-bronze-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white">
              All Categories
            </div>
            <nav className="grid divide-y divide-sand-400/70">
              {shopCategories.map((category) => (
                <a
                  key={category}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-ink-700 transition hover:bg-sand-200 hover:text-ink-900"
                  href={categoryHref(category)}
                >
                  <span>{category}</span>
                  <span className="text-xs text-ink-700">View</span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-5">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-sand-400 bg-sand-100">
              <img
                alt="Kimmex Decor showroom promotion"
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sand-50 via-sand-50/88 to-sand-50/15" />
              <div className="relative flex min-h-[420px] max-w-2xl flex-col justify-center p-8 lg:p-10">
                <p className="text-sm uppercase tracking-[0.24em] text-bronze-500">Kimmex Decor Marketplace</p>
                <h1 className="mt-4 font-serif text-5xl leading-tight text-ink-900 md:text-6xl">Shop materials for brighter interiors.</h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-ink-700">
                  Browse ceiling boards, frames, decor panels, sanitaryware, and project services from one organized
                  construction catalog.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a className="action-commerce" href="/products">
                    Shop Now
                  </a>
                  <a className="action-secondary" href="/contact">
                    Request Quote
                  </a>
                </div>
              </div>
            </div>

            <div className="surface-card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="promo-chip mr-3">B2B Special</span>
                <span className="text-sm text-ink-700">Project pricing for contractors and commercial buyers.</span>
              </div>
              <a className="text-sm font-semibold text-bronze-500" href="/contact">
                Request project pricing
              </a>
            </div>
          </div>

          <aside className="grid gap-5">
            {products.slice(0, 2).map((product) => (
              <a key={product.id} className="surface-card overflow-hidden transition hover:-translate-y-0.5 hover:border-bronze-500 hover:shadow-panel" href={product.href}>
                <img alt={product.name} className="h-36 w-full object-cover" src={product.imageUrl} />
                <div className="p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-ink-700">{product.category}</div>
                  <div className="mt-2 font-serif text-xl text-ink-900">{product.name}</div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-bronze-500">From ${product.price.toFixed(2)}</span>
                    <span className="text-xs text-ink-700">View</span>
                  </div>
                </div>
              </a>
            ))}
          </aside>
        </div>
      </div>

      <div className="content-shell grid gap-8 pb-10">
        <section>
          <div className="mb-4 flex flex-col gap-3 border-b border-sand-400 pb-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Project-first shopping</p>
              <h2 className="mt-1 font-serif text-3xl text-ink-900">Project Packages</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-700">
                Material + service support bundles for customers who know the project goal but need help with products,
                quantities, delivery, and quote direction.
              </p>
            </div>
            <a className="w-fit text-sm font-semibold text-bronze-500" href="/contact">
              Request package quote
            </a>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {projectPackages.map((item) => (
              <article key={item.id} className="surface-card overflow-hidden transition hover:-translate-y-0.5 hover:border-bronze-500 hover:shadow-panel">
                <img alt={item.title} className="h-44 w-full object-cover" src={item.imageUrl} />
                <div className="p-5">
                  <h3 className="font-serif text-2xl text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-700">{item.summary}</p>
                  <div className="mt-4 text-sm font-semibold text-bronze-500">From ${item.startingPrice.toFixed(2)}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.includes.map((include) => (
                      <span key={include} className="rounded-md border border-sand-400 bg-sand-100 px-2 py-1 text-xs text-ink-700">
                        {include}
                      </span>
                    ))}
                  </div>
                  <a className="action-secondary mt-5 w-full" href={item.href}>
                    Request Package Quote
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-3 border-b border-sand-400 pb-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-500">Popular materials</p>
              <h2 className="mt-1 font-serif text-3xl text-ink-900">Start with core products</h2>
            </div>
            <a className="w-fit text-sm font-semibold text-bronze-500" href="/products">
              Browse all products
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
