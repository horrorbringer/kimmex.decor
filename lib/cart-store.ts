import type { ProductItem } from "@/lib/homepage-data";

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  sku: string;
  price: number;
  unit: string;
  imageUrl: string;
  href: string;
  quantity: number;
};

const cartStorageKey = "kmd-cart";

export function readCart() {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = window.localStorage.getItem(cartStorageKey);
    return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("kmd-cart-updated"));
}

export function addProductToCart(product: ProductItem, quantity = 1) {
  const currentCart = readCart();
  const safeQuantity = Math.max(1, quantity);
  const existingItem = currentCart.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedCart = currentCart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + safeQuantity } : item
    );
    saveCart(updatedCart);
    return updatedCart;
  }

  const nextItem: CartItem = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    sku: product.sku,
    price: product.price,
    unit: product.unit,
    imageUrl: product.imageUrl,
    href: product.href,
    quantity: safeQuantity
  };

  const nextCart = [...currentCart, nextItem];
  saveCart(nextCart);
  return nextCart;
}

export function updateCartQuantity(productId: string, quantity: number) {
  const safeQuantity = Math.max(1, quantity);
  const nextCart = readCart().map((item) => (item.id === productId ? { ...item, quantity: safeQuantity } : item));
  saveCart(nextCart);
  return nextCart;
}

export function removeCartItem(productId: string) {
  const nextCart = readCart().filter((item) => item.id !== productId);
  saveCart(nextCart);
  return nextCart;
}

export function clearCart() {
  saveCart([]);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
