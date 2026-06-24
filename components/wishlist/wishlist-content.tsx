"use client";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useLanguage } from "@/components/language-provider";
import { migrateCatalogStorage } from "@/lib/catalog-storage-migration";
import type { ProductItem } from "@/lib/homepage-data";
import { clearWishlist, readWishlist, removeWishlistProduct } from "@/lib/wishlist-store";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, PackageCheck, Search, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SortOption = "recent" | "price-low" | "price-high" | "name";

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

type WishlistContentProps = {
  products: ProductItem[];
};

function productSlug(product: ProductItem) {
  return product.href.replace("/products/", "");
}

export function WishlistContent({ products }: WishlistContentProps) {
  const { text } = useLanguage();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("recent");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sync = () => setSavedIds(readWishlist());
    sync();
    setLoaded(true);
    window.addEventListener("kmd-wishlist-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("kmd-wishlist-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    migrateCatalogStorage(products);
  }, [products]);

  const savedProducts = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    const bySlug = new Map(products.map((product) => [productSlug(product), product]));
    const ordered = savedIds.map((id) => byId.get(id) ?? bySlug.get(id)).filter((product) => product !== undefined);
    const filtered = ordered.filter((product) =>
      `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [query, savedIds, sort]);

  const remove = (product: ProductItem) => {
    let nextSavedIds = removeWishlistProduct(product.id);
    const slug = productSlug(product);

    if (slug !== product.id) {
      nextSavedIds = removeWishlistProduct(slug);
    }

    setSavedIds(nextSavedIds);
  };

  if (!loaded) return <div className="wishlist-loading" aria-label={text("Loading saved products", "កំពុងផ្ទុកផលិតផលដែលបានរក្សាទុក")} />;

  if (savedIds.length === 0) {
    return (
      <div className="wishlist-empty">
        <span><Heart /></span>
        <p className="eyebrow">{text("Your shortlist is empty", "បញ្ជីរបស់អ្នកនៅទទេ")}</p>
        <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">{text("Save materials while you compare.", "រក្សាទុកសម្ភារៈខណៈពេលអ្នកប្រៀបធៀប។")}</h2>
        <p>{text("Use the heart on any product to keep it here. Your saved list stays on this device.", "ចុចរូបបេះដូងលើផលិតផលដើម្បីរក្សាទុកនៅទីនេះ។ បញ្ជីរបស់អ្នកនឹងរក្សាទុកលើឧបករណ៍នេះ។")}</p>
        <Link className="action-commerce mt-6 gap-2" href="/products">{text("Browse Products", "មើលផលិតផល")} <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }

  return (
    <div>
      <div className="wishlist-toolbar">
        <div className="wishlist-search">
          <Search />
          <label className="sr-only" htmlFor="wishlist-search">{text("Search saved products", "ស្វែងរកផលិតផលដែលបានរក្សាទុក")}</label>
          <input id="wishlist-search" onChange={(event) => setQuery(event.target.value)} placeholder={text("Search saved products", "ស្វែងរកផលិតផលដែលបានរក្សាទុក")} type="search" value={query} />
        </div>
        <select aria-label="Sort saved products" className="select-field wishlist-sort" onChange={(event) => setSort(event.target.value as SortOption)} value={sort}>
          <option value="recent">{text("Recently saved", "បានរក្សាទុកថ្មីៗ")}</option>
          <option value="price-low">{text("Price: low to high", "តម្លៃ៖ ទាបទៅខ្ពស់")}</option>
          <option value="price-high">{text("Price: high to low", "តម្លៃ៖ ខ្ពស់ទៅទាប")}</option>
          <option value="name">{text("Name", "ឈ្មោះ")}</option>
        </select>
        <button className="wishlist-clear" onClick={() => { clearWishlist(); setSavedIds([]); }} type="button"><Trash2 /> {text("Clear all", "លុបទាំងអស់")}</button>
      </div>

      <div className="wishlist-result-row">
        <p><strong>{savedProducts.length}</strong> {text(`of ${savedIds.length} saved ${savedIds.length === 1 ? "product" : "products"}`, `ក្នុងចំណោមផលិតផលបានរក្សាទុក ${savedIds.length}`)}</p>
        <Link href="/products">{text("Continue shopping", "បន្តទិញទំនិញ")} <ArrowRight /></Link>
      </div>

      {savedProducts.length === 0 ? (
        <div className="wishlist-no-results"><Search /><h2>{text("No saved products match your search.", "មិនមានផលិតផលដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។")}</h2><button onClick={() => setQuery("")} type="button">{text("Clear search", "សម្អាតការស្វែងរក")}</button></div>
      ) : (
        <div className="wishlist-grid">
          {savedProducts.map((product) => {
            const needsQuote = product.quoteRecommended || product.stockStatus !== "In stock";
            return (
              <article className="wishlist-card" key={product.id}>
                <div className="wishlist-card-media">
                  <Link href={product.href}><Image alt={product.name} src={product.imageUrl} width={200} height={200} loading="lazy" className="object-cover" /></Link>
                  <span className={`wishlist-stock ${product.stockStatus === "In stock" ? "is-available" : ""}`}>{product.stockStatus}</span>
                  <button aria-label={text(`Remove ${product.name} from wishlist`, `លុប ${product.name} ចេញពីបញ្ជីចំណូលចិត្ត`)} onClick={() => remove(product)} title={text("Remove from wishlist", "លុបចេញពីបញ្ជីចំណូលចិត្ត")} type="button"><Heart fill="currentColor" /></button>
                </div>
                <div className="wishlist-card-body">
                  <p className="wishlist-card-meta">{product.brand}<span>{product.category}</span></p>
                  <h2><Link href={product.href}>{product.name}</Link></h2>
                  <p className="wishlist-description">{product.descriptor}</p>
                  <div className="wishlist-specs">{product.specs.slice(0, 2).map((spec) => <span key={spec}>{spec}</span>)}</div>
                  <div className="wishlist-card-price">
                    <div><strong>{formatMoney(product.price)}</strong><span>/ {product.unit}</span>{product.comparePrice ? <del>{formatMoney(product.comparePrice)}</del> : null}</div>
                    <p><PackageCheck /> {product.leadTime}</p>
                  </div>
                  <div className="wishlist-card-actions">
                    {needsQuote ? <Link className="action-commerce gap-2" href={`/contact?product=${productSlug(product)}`}>{text("Check Availability", "ពិនិត្យស្តុក")} <ArrowRight /></Link> : <AddToCartButton className="action-commerce gap-2" product={product} />}
                    <Link className="action-secondary" href={product.href}>{text("View details", "មើលព័ត៌មានលម្អិត")}</Link>
                  </div>
                  <button className="wishlist-remove" onClick={() => remove(product)} type="button"><Trash2 /> {text("Remove", "លុប")}</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
