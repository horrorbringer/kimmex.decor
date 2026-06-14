const wishlistStorageKey = "kmd-wishlist";

export function readWishlist() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(wishlistStorageKey);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveWishlist(productIds: string[]) {
  const uniqueIds = [...new Set(productIds)];
  window.localStorage.setItem(wishlistStorageKey, JSON.stringify(uniqueIds));
  window.dispatchEvent(new CustomEvent("kmd-wishlist-updated"));
  return uniqueIds;
}

export function toggleWishlistProduct(productId: string) {
  const current = readWishlist();
  return current.includes(productId)
    ? saveWishlist(current.filter((id) => id !== productId))
    : saveWishlist([...current, productId]);
}

export function removeWishlistProduct(productId: string) {
  return saveWishlist(readWishlist().filter((id) => id !== productId));
}

export function clearWishlist() {
  return saveWishlist([]);
}
