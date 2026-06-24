"use client";

import { readCart, saveCart } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import type { ProductItem } from "@/lib/homepage-data";
import { readWishlist, saveWishlist } from "@/lib/wishlist-store";

function productSlug(product: ProductItem) {
  return product.href.replace("/products/", "");
}

function cartItemFromProduct(product: ProductItem, quantity: number): CartItem {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    sku: product.sku,
    price: product.price,
    unit: product.unit,
    imageUrl: product.imageUrl,
    href: product.href,
    quantity
  };
}

export function migrateCatalogStorage(products: ProductItem[]) {
  if (typeof window === "undefined" || products.length === 0) return;

  const bySlug = new Map(products.map((product) => [productSlug(product), product]));
  const byId = new Map(products.map((product) => [product.id, product]));
  const cartById = new Map<string, CartItem>();
  let cartChanged = false;

  for (const item of readCart()) {
    const product = byId.get(item.id) ?? bySlug.get(item.id);

    if (!product) {
      cartById.set(item.id, item);
      continue;
    }

    const existing = cartById.get(product.id);
    const nextQuantity = item.quantity + (existing?.quantity ?? 0);
    cartById.set(product.id, cartItemFromProduct(product, nextQuantity));
    cartChanged = cartChanged || item.id !== product.id || item.name !== product.name || item.price !== product.price;
  }

  if (cartChanged) {
    saveCart([...cartById.values()]);
  }

  const wishlist = readWishlist();
  const migratedWishlist = wishlist.map((id) => byId.get(id)?.id ?? bySlug.get(id)?.id ?? id);

  if (migratedWishlist.some((id, index) => id !== wishlist[index])) {
    saveWishlist(migratedWishlist);
  }
}
