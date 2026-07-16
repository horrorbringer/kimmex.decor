"use client";

import { searchCatalog } from "@/lib/api-browse";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, Boxes, Building2, FolderOpen, Search, Sparkles, Wrench } from "lucide-react";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  type: "product" | "service" | "category" | "brand";
  image_url?: string | null;
  logo_url?: string | null;
  short_description?: string | null;
  description?: string | null;
  sku?: string | null;
  price?: number;
  currency?: string;
  brand?: string | null;
  category?: string | null;
  url?: string;
};

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(!!query);
  const [searched, setSearched] = useState(!!query);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    searchCatalog(query).then((data) => {
      setResults(data);
      setIsLoading(false);
      setSearched(true);
    });
  }, [query]);

  const groupedResults = {
    product: results.filter((result) => result.type === "product"),
    service: results.filter((result) => result.type === "service"),
    category: results.filter((result) => result.type === "category"),
    brand: results.filter((result) => result.type === "brand"),
  };

  const getResultLink = (result: SearchResult) => {
    if (result.url) return result.url;
    const linkMap: Record<string, string> = {
      product: `/products/${result.slug}`,
      service: `/services/${result.slug}`,
      category: `/products?category=${result.slug}`,
      brand: `/products?brand=${result.slug}`
    };
    return linkMap[result.type] || "#";
  };

  const sections = [
    { key: "product" as const, title: "Products", icon: Boxes, results: groupedResults.product },
    { key: "service" as const, title: "Services", icon: Wrench, results: groupedResults.service },
    { key: "category" as const, title: "Categories", icon: FolderOpen, results: groupedResults.category },
    { key: "brand" as const, title: "Brands", icon: Building2, results: groupedResults.brand },
  ].filter((section) => section.results.length > 0);

  return (
    <div className="section-shell">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="grid h-10 w-10 place-items-center rounded-full border border-sand-400 bg-white text-ink-700 transition hover:text-ink-900">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <p className="eyebrow">Search</p>
          <h1 className="font-serif text-4xl text-ink-900">Search Results</h1>
          {query && <p className="mt-2 text-ink-700">for "{query}"</p>}
        </div>
      </div>

      <div className="surface-card mb-8 p-4 md:p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const searchQuery = formData.get("q") as string;
            if (searchQuery) {
              window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
            }
          }}
        >
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
            <label className="search-group grid-cols-[auto_1fr] items-center px-4">
              <Search className="h-4 w-4 text-ink-700" />
            <input
              type="text"
              name="q"
              defaultValue={query}
                placeholder="Search products, services, brands, categories..."
                className="field"
            />
            </label>
            <button
              type="submit"
              className="action-commerce min-h-12 px-6"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-3 py-12">
          <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
          <span className="text-ink-700">Searching...</span>
        </div>
      ) : searched && results.length === 0 ? (
        <div className="surface-card grid min-h-72 place-items-center p-8 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-brand-red" />
          <p className="mt-4 text-lg font-semibold text-ink-900">No results found for "{query}"</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-700">Try a product name, service, SKU, brand, or project material. KMD can also help recommend alternatives.</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="action-secondary" href="/products">Browse Products</Link>
            <Link className="action-commerce" href="/contact?topic=project-advice">Ask KMD</Link>
          </div>
        </div>
      ) : (
        <>
          {results.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-sand-400 py-4 text-sm text-ink-700">
              <span>Found <strong>{results.length}</strong> result{results.length !== 1 ? "s" : ""}</span>
              <span>{groupedResults.product.length} products / {groupedResults.service.length} services / {groupedResults.category.length + groupedResults.brand.length} catalog groups</span>
            </div>
          )}

          <div className="grid gap-8">
            {sections.map(({ icon: Icon, key, results: sectionResults, title }) => (
              <section key={key}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-brand-red/10 text-brand-red">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl text-ink-900">{title}</h2>
                    <p className="text-sm text-ink-700">{sectionResults.length} matched</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sectionResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={getResultLink(result)}
                      className="surface-card group overflow-hidden transition hover:-translate-y-1 hover:shadow-panel"
                    >
                      {(result.image_url || result.logo_url) && (
                        <img
                          alt={result.name}
                          src={result.image_url || result.logo_url || ""}
                          className="h-40 w-full object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <span className="rounded-full bg-sand-100 px-2 py-1 text-xs font-semibold uppercase text-ink-700">
                            {result.type}
                          </span>
                          {result.price !== undefined ? <span className="text-sm font-semibold text-brand-red">${Number(result.price).toFixed(2)}</span> : null}
                        </div>
                        <h3 className="mt-3 font-serif text-xl leading-tight text-ink-900 transition group-hover:text-brand-red">{result.name}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-700">
                          {result.short_description || result.description || [result.brand, result.category, result.sku].filter(Boolean).join(" / ") || "Open result"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
