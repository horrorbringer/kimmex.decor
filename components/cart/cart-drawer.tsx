"use client";

import type { CartItem } from "@/lib/cart-store";
import { getCartSubtotal, readCart, removeCartItem, updateCartQuantity } from "@/lib/cart-store";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export function CartDrawer({ onClose, open }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const syncItems = () => setItems(readCart());

    syncItems();
    window.addEventListener("kmd-cart-updated", syncItems);
    window.addEventListener("storage", syncItems);

    return () => {
      window.removeEventListener("kmd-cart-updated", syncItems);
      window.removeEventListener("storage", syncItems);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);
  const subtotal = useMemo(() => getCartSubtotal(items), [items]);

  if (!open) return null;

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(updateCartQuantity(productId, quantity));
  };

  const removeItem = (productId: string) => {
    setItems(removeCartItem(productId));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm" onClick={onClose} role="presentation">
      <aside
        aria-label="Shopping cart"
        aria-modal="true"
        className="ml-auto flex h-full w-[min(94vw,460px)] flex-col bg-sand-50 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-sand-400 px-5 py-4 md:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-red">Quick Cart</p>
            <h2 className="mt-1 font-serif text-2xl text-ink-900">
              {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? "item" : "items"}` : "Your selections"}
            </h2>
          </div>
          <button
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-400 text-ink-900 transition hover:bg-sand-100"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-red/10 text-brand-red">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h3 className="mt-6 font-serif text-3xl text-ink-900">Your cart is empty.</h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-ink-700">
              Browse materials and add the quantities you want us to review.
            </p>
            <a className="action-commerce mt-7 gap-2" href="/products" onClick={onClose}>
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <article className="grid grid-cols-[88px_1fr] gap-4 border-b border-sand-400 p-5 md:p-6" key={item.id}>
                  <a className="overflow-hidden rounded-md border border-sand-400 bg-white" href={item.href} onClick={onClose}>
                    <img alt={item.name} className="h-24 w-full object-cover" src={item.imageUrl} />
                  </a>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-700">{item.brand}</p>
                        <h3 className="mt-1 font-serif text-xl leading-tight text-ink-900">
                          <a href={item.href} onClick={onClose}>{item.name}</a>
                        </h3>
                      </div>
                      <button
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 p-1 text-ink-700 transition hover:text-brand-red"
                        onClick={() => removeItem(item.id)}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center overflow-hidden rounded-full border border-sand-400 bg-white">
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          className="grid h-8 w-8 place-items-center text-ink-900 transition hover:bg-sand-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          type="button"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-xs font-semibold text-ink-900">{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          className="grid h-8 w-8 place-items-center text-ink-900 transition hover:bg-sand-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          type="button"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-brand-red">{formatMoney(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-sand-400 bg-white p-5 md:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">Estimated subtotal</p>
                  <p className="mt-1 text-xs text-ink-700">Stock and delivery confirmed later</p>
                </div>
                <p className="font-serif text-3xl text-ink-900">{formatMoney(subtotal)}</p>
              </div>
              <a className="action-commerce mt-5 w-full gap-2" href="/checkout" onClick={onClose}>
                Continue to Checkout
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="action-secondary mt-3 w-full" href="/cart" onClick={onClose}>
                Review Full Cart
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
