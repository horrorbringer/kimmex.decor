"use client";

import { addProductToCart } from "@/lib/cart-store";
import type { ProductItem } from "@/lib/homepage-data";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

type AddToCartButtonProps = {
  product: ProductItem;
  quantity?: number;
  className?: string;
  compact?: boolean;
};

export function AddToCartButton({ className = "action-commerce gap-1.5", compact = false, product, quantity = 1 }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addProductToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button className={className} onClick={handleAddToCart} type="button">
      <ShoppingCart className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
