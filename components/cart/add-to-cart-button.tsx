"use client";

import { addCustomerCartItem } from "@/lib/api-customer-storage";
import { getApiErrorMessage } from "@/lib/api-client";
import { addProductToCart } from "@/lib/cart-store";
import type { ProductItem } from "@/lib/homepage-data";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useToast } from "@/components/ui/toast";

type AddToCartButtonProps = {
  product: ProductItem;
  quantity?: number;
  className?: string;
  compact?: boolean;
};

export function AddToCartButton({ className = "action-commerce gap-1.5", compact = false, product, quantity = 1 }: AddToCartButtonProps) {
  const { text } = useLanguage();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addProductToCart(product, quantity);
    addCustomerCartItem(product.id, quantity).catch((error) => {
      addToast({
        type: "warning",
        title: text("Saved locally", "បានរក្សាទុកក្នុងឧបករណ៍"),
        message: getApiErrorMessage(error, "KMD could not sync this item to your account cart yet.")
      });
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button className={className} onClick={handleAddToCart} type="button">
      <ShoppingCart className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {added ? text("Added", "បានដាក់ចូល") : text("Add to Cart", "ដាក់ចូលកន្ត្រក")}
    </button>
  );
}
