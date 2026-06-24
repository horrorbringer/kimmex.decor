"use client";

import { searchCatalog } from "@/lib/api-browse";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  type: "product" | "service" | "category" | "brand";
  image_url?: string | null;
  short_description?: string | null;
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

  const getResultIcon = (type: string) => {
    const icons: Record<string, string> = {
      product: "📦",
      service: "🛠️",
      category: "📂",
      brand: "🏢"
    };
    return icons[type] || "🔍";
  };

  const getResultLink = (result: SearchResult) => {
    const linkMap: Record<string, string> = {
      product: `/products/${result.slug}`,
      service: `/services/${result.slug}`,
      category: `/products?category=${result.slug}`,
      brand: `/products?brand=${result.slug}`
    };
    return linkMap[result.type] || "#";
  };

  return (
    <div className="section-shell">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="text-ink-700 transition hover:text-ink-900">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-4xl text-ink-900">Search Results</h1>
          {query && <p className="mt-2 text-ink-700">for "{query}"</p>}
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-8 max-w-2xl">
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
          <div className="flex gap-3">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search products, services, categories..."
              className="flex-1 rounded-lg border border-sand-400 bg-white px-4 py-3 text-ink-900 placeholder-ink-700 transition focus:border-brand-red focus:outline-none"
            />
            <button
              type="submit"
              className="action-primary rounded-lg border-0 px-6 py-3"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 py-12">
          <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
          <span className="text-ink-700">Searching...</span>
        </div>
      ) : searched && results.length === 0 ? (
        <div className="rounded-lg border border-sand-400 bg-sand-50 p-8 text-center">
          <p className="text-lg text-ink-700">No results found for "{query}"</p>
          <p className="mt-2 text-sm text-ink-700">Try different keywords or browse our catalog</p>
        </div>
      ) : (
        <>
          {results.length > 0 && (
            <div className="mb-6 text-sm text-ink-700">
              Found <strong>{results.length}</strong> result{results.length !== 1 ? "s" : ""}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={getResultLink(result)}
                className="group overflow-hidden rounded-lg border border-sand-400 bg-white transition hover:-translate-y-1 hover:shadow-panel"
              >
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl">{getResultIcon(result.type)}</span>
                    <span className="inline-block rounded-full bg-sand-100 px-2 py-1 text-xs font-semibold uppercase text-ink-700">
                      {result.type}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-ink-900 group-hover:text-brand-red transition">{result.name}</h3>
                    {result.short_description && (
                      <p className="mt-1 line-clamp-2 text-sm text-ink-700">{result.short_description}</p>
                    )}
                  </div>
                  {result.image_url && (
                    <img
                      alt={result.name}
                      src={result.image_url}
                      className="mt-2 h-32 w-full rounded-md object-cover"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
