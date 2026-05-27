"use client";

import { addProductToCart } from "@/lib/cart-store";
import type { ProductItem } from "@/lib/homepage-data";
import { useState } from "react";

type ProductDetailActionsProps = {
  advisorHref: string;
  needsQuote: boolean;
  product: ProductItem;
};

export function ProductDetailActions({ advisorHref, needsQuote, product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addProductToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mt-6 grid gap-4">
      <label className="control-label">
        Quantity
        <input
          className="field"
          min="1"
          onChange={(event) => setQuantity(Number(event.target.value) || 1)}
          type="number"
          value={quantity}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        {needsQuote ? (
          <a className="action-commerce" href={advisorHref}>
            Request Product Quote
          </a>
        ) : (
          <button className="action-commerce" onClick={handleAddToCart} type="button">
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        )}
        <a className="action-secondary" href={advisorHref}>
          Ask Advisor
        </a>
      </div>
    </div>
  );
}
