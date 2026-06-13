"use client";

import { addProductToCart } from "@/lib/cart-store";
import type { ProductItem } from "@/lib/homepage-data";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { useState } from "react";

type ProductDetailActionsProps = {
  advisorHref: string;
  needsQuote: boolean;
  product: ProductItem;
};

export function ProductDetailActions({ advisorHref, needsQuote, product }: ProductDetailActionsProps) {
  const minimumQuantity = Math.max(1, Number.parseInt(product.moq, 10) || 1);
  const [quantity, setQuantity] = useState(minimumQuantity);
  const [added, setAdded] = useState(false);
  const estimatedTotal = product.price * quantity;
  const requestHref = `${advisorHref}&quantity=${quantity}`;

  const updateQuantity = (nextQuantity: number) => {
    setQuantity(Math.max(minimumQuantity, Math.floor(nextQuantity) || minimumQuantity));
    setAdded(false);
  };

  const handleAddToCart = () => {
    addProductToCart(product, quantity);
    setAdded(true);
  };

  return (
    <div className="mt-6 border-t border-sand-400 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">Quantity</p>
          <div className="mt-2 inline-grid h-12 grid-cols-[44px_64px_44px] overflow-hidden rounded-md border border-sand-400 bg-white">
            <button
              aria-label="Decrease quantity"
              className="flex items-center justify-center text-ink-700 transition hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={quantity <= minimumQuantity}
              onClick={() => updateQuantity(quantity - 1)}
              type="button"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              aria-label="Product quantity"
              className="w-full border-x border-sand-400 bg-transparent text-center text-sm font-semibold text-ink-900 outline-none"
              min={minimumQuantity}
              onChange={(event) => updateQuantity(Number(event.target.value))}
              type="number"
              value={quantity}
            />
            <button
              aria-label="Increase quantity"
              className="flex items-center justify-center text-ink-700 transition hover:bg-sand-100"
              onClick={() => updateQuantity(quantity + 1)}
              type="button"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-ink-700">Minimum order: {product.moq}</p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs text-ink-700">{needsQuote ? "Reference subtotal" : "Estimated subtotal"}</p>
          <p className="mt-1 text-2xl font-semibold text-ink-900">${estimatedTotal.toFixed(2)}</p>
          <p className="text-xs text-ink-700">Delivery calculated separately</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {needsQuote ? (
          <a className="action-commerce gap-2" href={requestHref}>
            Request Product Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <button className="action-commerce gap-2 border-0" onClick={handleAddToCart} type="button">
            {added ? <Check className="h-4 w-4" /> : null}
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        )}
        {added ? (
          <a className="action-secondary gap-2" href="/cart">
            View Cart
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <a className="action-secondary" href={requestHref}>
            Ask About This Product
          </a>
        )}
      </div>
    </div>
  );
}
