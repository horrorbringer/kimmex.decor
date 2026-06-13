"use client";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { ProductItem } from "@/lib/homepage-data";

type ProductCardProps = {
  product: ProductItem;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const needsQuote = product.quoteRecommended || product.stockStatus === "Preorder";
  const primaryAction = product.stockStatus === "Low stock" ? "Check Availability" : needsQuote ? "Get Quote" : "Add to Cart";
  const primaryHref = needsQuote || product.stockStatus === "Low stock" ? "/contact" : "/cart";

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-panel">
      <a className="relative block overflow-hidden" href={product.href}>
        <img
          alt={product.name}
          className={`${compact ? "h-48" : "h-56"} w-full object-cover transition duration-300 group-hover:scale-105`}
          src={product.imageUrl}
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-md bg-brand-red px-3 py-1 text-xs font-semibold text-white shadow-card">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-soft">
          {product.stockStatus}
        </span>
      </a>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-ink-700">
          <span>{product.brand}</span>
          <span className="truncate">{product.category}</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-ink-900">
          <a className="transition hover:text-brand-red" href={product.href}>
            {product.name}
          </a>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-700">{product.descriptor}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.specs.slice(0, 2).map((spec) => (
            <span key={spec} className="rounded-md border border-sand-400 bg-sand-100 px-2 py-1 text-xs text-ink-700">
              {spec}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 border-b border-sand-400 pb-4 pt-5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-brand-red">${product.price.toFixed(2)}</span>
              <span className="text-sm text-ink-700">/ {product.unit}</span>
            </div>
            {product.comparePrice ? <div className="text-sm text-ink-700 line-through">${product.comparePrice.toFixed(2)}</div> : null}
          </div>
          <div className="text-right text-xs leading-5 text-ink-700">
            <div>MOQ: {product.moq}</div>
            <div>{product.leadTime}</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {needsQuote || product.stockStatus === "Low stock" ? (
            <a className="action-commerce min-h-10 whitespace-nowrap px-3 py-2 text-xs" href={primaryHref}>
              {primaryAction}
            </a>
          ) : (
            <AddToCartButton
              className="action-commerce min-h-10 gap-1.5 whitespace-nowrap px-3 py-2 text-xs"
              compact
              product={product}
            />
          )}
          <a className="action-secondary min-h-10 whitespace-nowrap px-3 py-2 text-xs" href={product.href}>
            View Details
          </a>
        </div>
      </div>
    </article>
  );
}
