"use client";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductCard } from "@/components/home/product-card";
import type { ProductItem } from "@/lib/homepage-data";
import { Grid3X3, List, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type SortMode = "Featured" | "Price: low to high" | "Price: high to low" | "Best rated";
type ViewMode = "grid" | "list";

type ProductCatalogProps = {
  products: ProductItem[];
  categories: string[];
  brands: string[];
  availability: ProductItem["stockStatus"][];
};

const productBatchSize = 9;
const sortModes: SortMode[] = ["Featured", "Price: low to high", "Price: high to low", "Best rated"];

export function ProductCatalog({ products, categories, brands, availability }: ProductCatalogProps) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState<SortMode>("Featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [visibleCount, setVisibleCount] = useState(productBatchSize);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<ProductItem["stockStatus"][]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");

    if (categoryParam && categories.includes(categoryParam)) {
      setCategory(categoryParam);
    }

    const queryParam = params.get("q");
    const sortParam = params.get("sort");
    const brandParams = params.getAll("brand").filter((item) => brands.includes(item));
    const availabilityParams = params
      .getAll("availability")
      .filter((item): item is ProductItem["stockStatus"] => availability.includes(item as ProductItem["stockStatus"]));

    if (queryParam) setQuery(queryParam);
    if (sortParam && sortModes.includes(sortParam as SortMode)) setSort(sortParam as SortMode);
    if (brandParams.length > 0) setSelectedBrands(brandParams);
    if (availabilityParams.length > 0) setSelectedAvailability(availabilityParams);
    setHasHydrated(true);
  }, [availability, brands, categories]);

  useEffect(() => {
    if (!hasHydrated) return;

    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) params.set("q", trimmedQuery);
    if (category !== "All categories") params.set("category", category);
    if (sort !== "Featured") params.set("sort", sort);
    selectedBrands.forEach((brand) => params.append("brand", brand));
    selectedAvailability.forEach((item) => params.append("availability", item));

    const nextUrl = params.toString() ? `${window.location.pathname}?${params.toString()}#catalog` : `${window.location.pathname}#catalog`;
    window.history.replaceState(null, "", nextUrl);
  }, [category, hasHydrated, query, selectedAvailability, selectedBrands, sort]);

  const removeFilter = (filter: ActiveFilter) => {
    if (filter.type === "category") setCategory("All categories");
    if (filter.type === "brand") setSelectedBrands((current) => current.filter((item) => item !== filter.value));
    if (filter.type === "availability") {
      setSelectedAvailability((current) => current.filter((item) => item !== filter.value));
    }
    if (filter.type === "query") setQuery("");
    if (filter.type === "sort") setSort("Featured");
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          [product.name, product.descriptor, product.brand, product.category, product.sku, ...product.specs]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory = category === "All categories" || product.category === category;
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(product.stockStatus);

        return matchesQuery && matchesCategory && matchesBrand && matchesAvailability;
      })
      .sort((a, b) => {
        if (sort === "Price: low to high") return a.price - b.price;
        if (sort === "Price: high to low") return b.price - a.price;
        if (sort === "Best rated") return b.rating - a.rating;
        return 0;
      });
  }, [category, products, query, selectedAvailability, selectedBrands, sort]);

  useEffect(() => {
    setVisibleCount(productBatchSize);
  }, [category, query, selectedAvailability, selectedBrands, sort]);

  const activeFilters: ActiveFilter[] = [
    category !== "All categories" ? { label: category, type: "category", value: category } : null,
    ...selectedBrands.map((brand) => ({ label: brand, type: "brand" as const, value: brand })),
    ...selectedAvailability.map((item) => ({ label: item, type: "availability" as const, value: item })),
    sort !== "Featured" ? { label: sort, type: "sort", value: sort } : null,
    query.trim() ? { label: `Search: ${query.trim()}`, type: "query", value: query.trim() } : null
  ].filter((filter): filter is ActiveFilter => Boolean(filter));

  const resetFilters = () => {
    setQuery("");
    setCategory("All categories");
    setSort("Featured");
    setSelectedBrands([]);
    setSelectedAvailability([]);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filteredProducts.length;

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) => (current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]));
  };

  const toggleAvailability = (item: ProductItem["stockStatus"]) => {
    setSelectedAvailability((current) => (current.includes(item) ? current.filter((status) => status !== item) : [...current, item]));
  };

  return (
    <section className="section-shell pt-8" id="catalog">
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2">
          {["All categories", ...categories].map((item) => (
            <button
              key={item}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                category === item
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-sand-400 bg-white text-ink-700 hover:border-brand-red hover:text-brand-red"
              }`}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="surface-card mb-6 grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end">
        <label className="control-label">
          Search products
          <span className="search-group grid-cols-[auto_1fr] items-center px-4">
            <Search className="h-4 w-4 text-ink-700" />
            <input
              className="field"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Product, brand, or SKU..."
              type="search"
              value={query}
            />
          </span>
        </label>
        <label className="control-label">
          Sort
          <select className="select-field" onChange={(event) => setSort(event.target.value as SortMode)} value={sort}>
            {sortModes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <button className="action-secondary h-[46px] flex-1 lg:hidden" onClick={() => setFiltersOpen((open) => !open)} type="button">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {selectedBrands.length + selectedAvailability.length > 0 ? ` (${selectedBrands.length + selectedAvailability.length})` : ""}
          </button>
          {activeFilters.length > 0 ? (
            <button aria-label="Reset filters" className="action-secondary h-[46px] px-4" onClick={resetFilters} type="button">
              <RotateCcw className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`${filtersOpen ? "grid" : "hidden"} gap-4 self-start lg:grid`}>
          <FilterGroup title="Brands">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-sm text-ink-700">
                <input checked={selectedBrands.includes(brand)} className="filter-checkbox" onChange={() => toggleBrand(brand)} type="checkbox" />
                {brand}
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Availability">
            {availability.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-ink-700">
                <input
                  checked={selectedAvailability.includes(item)}
                  className="filter-checkbox"
                  onChange={() => toggleAvailability(item)}
                  type="checkbox"
                />
                {item}
              </label>
            ))}
          </FilterGroup>

          <div className="rounded-lg bg-ink-900 p-5 text-white">
            <h2 className="font-serif text-2xl">Buying for a project?</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">Send your quantity or material list for delivery and bulk pricing.</p>
            <a className="action-commerce mt-4 w-full" href="/contact">
              Request Pricing
            </a>
          </div>
        </aside>

        <div>
          <div className="mb-5 border-b border-sand-400 pb-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-ink-900">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </div>
                <div className="mt-1 text-sm text-ink-700">Standard items can be ordered online. Project quantities can be quoted.</div>
              </div>
              <div className="flex w-fit overflow-hidden rounded-md border border-sand-400 bg-white p-1">
                <button
                  className={`inline-flex min-h-9 items-center gap-2 rounded px-3 text-xs font-semibold transition ${
                    viewMode === "grid" ? "bg-brand-red text-white" : "text-ink-700 hover:bg-sand-100"
                  }`}
                  onClick={() => setViewMode("grid")}
                  type="button"
                >
                  <Grid3X3 className="h-4 w-4" />
                  Grid
                </button>
                <button
                  className={`inline-flex min-h-9 items-center gap-2 rounded px-3 text-xs font-semibold transition ${
                    viewMode === "list" ? "bg-brand-red text-white" : "text-ink-700 hover:bg-sand-100"
                  }`}
                  onClick={() => setViewMode("list")}
                  type="button"
                >
                  <List className="h-4 w-4" />
                  List
                </button>
              </div>
            </div>

            {activeFilters.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <button
                    key={`${filter.type}-${filter.value}`}
                    className="inline-flex items-center gap-2 rounded-full border border-sand-400 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition hover:border-brand-red hover:text-brand-red"
                    onClick={() => removeFilter(filter)}
                    type="button"
                  >
                    {filter.label}
                    <X className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {filteredProducts.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  {visibleProducts.map((product) => (
                    <ProductListRow key={product.id} product={product} />
                  ))}
                </div>
              )}
              {hasMoreProducts ? (
                <div className="mt-8 flex justify-center">
                  <button className="action-secondary" onClick={() => setVisibleCount((count) => count + productBatchSize)} type="button">
                    Load More Products
                    <span className="ml-2 text-xs font-normal text-ink-700">
                      {Math.min(productBatchSize, filteredProducts.length - visibleCount)} more
                    </span>
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="surface-card grid min-h-80 place-items-center p-8 text-center">
              <div>
                <SlidersHorizontal className="mx-auto h-10 w-10 text-brand-red" />
                <h2 className="mt-4 font-serif text-3xl text-ink-900">No products match these filters.</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-700">
                  Clear filters or send KMD your material list so the team can recommend alternatives.
                </p>
                <button className="action-secondary mt-5" onClick={resetFilters} type="button">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type ActiveFilter =
  | { label: string; type: "category"; value: string }
  | { label: string; type: "brand"; value: string }
  | { label: string; type: "availability"; value: ProductItem["stockStatus"] }
  | { label: string; type: "sort"; value: SortMode }
  | { label: string; type: "query"; value: string };

function FilterGroup({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="surface-card p-5">
      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-900">{title}</div>
      <div className="mt-4 grid gap-2">{children}</div>
    </div>
  );
}

function ProductListRow({ product }: { product: ProductItem }) {
  const needsQuote = product.quoteRecommended || product.stockStatus !== "In stock";
  const primaryAction = product.stockStatus === "Low stock" ? "Check Availability" : needsQuote ? "Get Quote" : "Add to Cart";
  const primaryHref = needsQuote || product.stockStatus === "Low stock" ? "/contact" : "/cart";

  return (
    <article className="surface-card grid gap-4 p-4 transition hover:-translate-y-0.5 hover:border-bronze-500 hover:shadow-panel lg:grid-cols-[120px_1fr_auto] lg:items-center">
      <a href={product.href}>
        <img alt={product.name} className="h-28 w-full rounded-lg object-cover lg:h-24" src={product.imageUrl} />
      </a>
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-ink-700">
          <span>{product.category}</span>
          <span>{product.sku}</span>
        </div>
        <h3 className="mt-2 font-serif text-2xl text-ink-900">
          <a className="transition hover:text-brand-red" href={product.href}>
            {product.name}
          </a>
        </h3>
        <p className="mt-1 text-sm leading-6 text-ink-700">{product.descriptor}</p>
        <div className="mt-3 grid gap-2 text-xs text-ink-700 sm:grid-cols-4">
          <span className="rounded-md bg-sand-100 px-2 py-1">MOQ: {product.moq}</span>
          <span className="rounded-md bg-sand-100 px-2 py-1">{product.leadTime}</span>
          <span className="rounded-md bg-sand-100 px-2 py-1">{product.stockStatus}</span>
          <span className="rounded-md bg-sand-100 px-2 py-1">{product.delivery}</span>
        </div>
      </div>
      <div className="grid gap-2 lg:min-w-40">
        <div className="text-left lg:text-right">
          <div className="text-2xl font-semibold text-brand-red">${product.price.toFixed(2)}</div>
          <div className="text-sm text-ink-700">/ {product.unit}</div>
        </div>
        {needsQuote || product.stockStatus === "Low stock" ? (
          <a className="action-commerce min-h-10 px-3 py-2 text-xs" href={primaryHref}>
            {primaryAction}
          </a>
        ) : (
          <AddToCartButton className="action-commerce min-h-10 gap-1.5 px-3 py-2 text-xs" compact product={product} />
        )}
        <a className="action-secondary min-h-10 px-3 py-2 text-xs" href={product.href}>
          Details
        </a>
      </div>
    </article>
  );
}
