import { fetchJson } from "@/lib/api-client";
import { readCart, saveCart } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import { getToken } from "@/lib/cookies";
import { readWishlist, saveWishlist } from "@/lib/wishlist-store";

type LaravelResource<T> = T | { data: T };

type ApiCartItem = {
  id: string;
  product_id: string;
  name?: string | null;
  slug?: string | null;
  sku?: string | null;
  brand?: string | null;
  unit?: string | null;
  image_url?: string | null;
  quantity: number;
  unit_price: number;
};

type ApiCart = {
  items?: ApiCartItem[];
};

type ApiWishlistItem = {
  product?: {
    id: string;
  } | null;
};

function unwrapResource<T>(value: LaravelResource<T>): T {
  if (value && typeof value === "object" && "data" in value) {
    return (value as { data: T }).data;
  }
  return value as T;
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function cartItemFromApi(item: ApiCartItem): CartItem {
  const slug = item.slug || item.product_id;

  return {
    id: item.product_id,
    name: item.name || "Product",
    brand: item.brand || "KMD Decor",
    sku: item.sku || "",
    price: Number(item.unit_price),
    unit: item.unit || "unit",
    imageUrl: item.image_url || "/products/gypsum_board.webp",
    href: `/products/${slug}`,
    quantity: item.quantity
  };
}

async function fetchCustomerCart(token: string): Promise<CartItem[]> {
  const response = await fetchJson<LaravelResource<ApiCart>>("/cart", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return (unwrapResource(response).items ?? []).map(cartItemFromApi);
}

async function fetchCustomerApiCart(token: string): Promise<ApiCart> {
  const response = await fetchJson<LaravelResource<ApiCart>>("/cart", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return unwrapResource(response);
}

async function refreshCustomerCart(token: string): Promise<void> {
  saveCart(await fetchCustomerCart(token));
}

async function refreshCustomerWishlist(token: string): Promise<void> {
  saveWishlist(await fetchCustomerWishlist(token));
}

async function pushLocalCart(token: string) {
  const items = readCart().filter((item) => isUuid(item.id));

  for (const item of items) {
    await fetchJson("/cart/items", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        product_id: item.id,
        quantity: item.quantity
      })
    });
  }
}

async function fetchCustomerWishlist(token: string): Promise<string[]> {
  const response = await fetchJson<{ data: ApiWishlistItem[] }>("/wishlist", {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data
    .map((item) => item.product?.id)
    .filter((id): id is string => Boolean(id));
}

async function pushLocalWishlist(token: string) {
  const productIds = readWishlist().filter(isUuid);

  for (const productId of productIds) {
    await fetchJson("/wishlist", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ product_id: productId })
    });
  }
}

export async function syncCustomerStorage(token: string): Promise<void> {
  if (typeof window === "undefined") return;

  await Promise.allSettled([pushLocalCart(token), pushLocalWishlist(token)]);

  const [cartResult, wishlistResult] = await Promise.allSettled([
    fetchCustomerCart(token),
    fetchCustomerWishlist(token)
  ]);

  if (cartResult.status === "fulfilled") {
    saveCart(cartResult.value);
  }

  if (wishlistResult.status === "fulfilled") {
    saveWishlist(wishlistResult.value);
  }
}

export async function addCustomerCartItem(productId: string, quantity = 1): Promise<void> {
  const token = getToken();
  if (!token || !isUuid(productId)) return;

  await fetchJson("/cart/items", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({
      product_id: productId,
      quantity: Math.max(1, quantity)
    })
  });
  await refreshCustomerCart(token);
}

export async function updateCustomerCartItem(productId: string, quantity: number): Promise<void> {
  const token = getToken();
  if (!token || !isUuid(productId)) return;

  const cart = await fetchCustomerApiCart(token);
  const item = cart.items?.find((cartItem) => cartItem.product_id === productId);
  if (!item) return;

  await fetchJson(`/cart/items/${encodeURIComponent(item.id)}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ quantity: Math.max(1, quantity) })
  });
  await refreshCustomerCart(token);
}

export async function removeCustomerCartItem(productId: string): Promise<void> {
  const token = getToken();
  if (!token || !isUuid(productId)) return;

  const cart = await fetchCustomerApiCart(token);
  const item = cart.items?.find((cartItem) => cartItem.product_id === productId);
  if (!item) return;

  await fetchJson(`/cart/items/${encodeURIComponent(item.id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await refreshCustomerCart(token);
}

export async function clearCustomerCart(): Promise<void> {
  const token = getToken();
  if (!token) return;

  const cart = await fetchCustomerApiCart(token);
  const items = cart.items ?? [];

  await Promise.allSettled(
    items.map((item) =>
      fetchJson(`/cart/items/${encodeURIComponent(item.id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
    )
  );
  await refreshCustomerCart(token);
}

export async function addCustomerWishlistItem(productId: string): Promise<void> {
  const token = getToken();
  if (!token || !isUuid(productId)) return;

  await fetchJson("/wishlist", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ product_id: productId })
  });
  await refreshCustomerWishlist(token);
}

export async function removeCustomerWishlistItem(productId: string): Promise<void> {
  const token = getToken();
  if (!token || !isUuid(productId)) return;

  await fetchJson(`/wishlist/${encodeURIComponent(productId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await refreshCustomerWishlist(token);
}

export async function clearCustomerWishlist(): Promise<void> {
  const token = getToken();
  if (!token) return;

  await fetchJson("/wishlist", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await refreshCustomerWishlist(token);
}
