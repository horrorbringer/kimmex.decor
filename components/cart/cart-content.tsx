"use client";

import { clearCart, getCartSubtotal, readCart, removeCartItem, updateCartQuantity } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import { CheckCircle2, ClipboardCheck, Minus, PackageCheck, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export function CartContent() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(updateCartQuantity(productId, quantity));
  };

  const removeItem = (productId: string) => {
    setItems(removeCartItem(productId));
  };

  const clearItems = () => {
    clearCart();
    setItems([]);
  };

  if (items.length === 0) {
    return (
      <div className="surface-card grid gap-6 p-6 text-center md:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-brand-red/10 text-brand-red">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <div>
          <h2 className="font-serif text-3xl text-ink-900">Your cart is empty.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-700">
            Add materials from the catalog, or send KMD a quote request if you need preorder items, low-stock items,
            bulk quantities, or installation support.
          </p>
        </div>
        <div className="mx-auto grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          {["Browse products", "Add quantities", "Submit request"].map((step, index) => (
            <div key={step} className="rounded-md border border-sand-400 bg-sand-50 p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-xs font-semibold text-brand-red">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-semibold text-ink-900">{step}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
          <a className="action-commerce w-full gap-2 sm:w-auto" href="/products">
            <ShoppingBag className="h-4 w-4" />
            Browse Products
          </a>
          <a className="action-secondary w-full sm:w-auto" href="/contact?type=order-request">
            Request Quote
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
      <div className="surface-card overflow-hidden">
        <div className="border-b border-sand-400 bg-sand-50 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Cart Items</p>
              <h2 className="mt-1 font-serif text-2xl text-ink-900 sm:text-3xl">Confirm materials and quantities.</h2>
            </div>
            <a className="resource-action w-fit" href="/products">
              Continue Shopping
            </a>
          </div>
        </div>
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 border-b border-sand-400 p-4 last:border-b-0 sm:grid-cols-[96px_minmax(0,1fr)] sm:items-center md:grid-cols-[112px_minmax(0,1fr)_184px]">
            <a className="block overflow-hidden rounded-md border border-sand-400 bg-sand-50" href={item.href}>
              <img alt={item.name} className="h-40 w-full object-cover transition hover:scale-105 sm:h-24 md:h-28" src={item.imageUrl} />
            </a>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">
                {item.brand} / {item.sku}
              </div>
              <h3 className="mt-2 font-serif text-2xl leading-tight text-ink-900">
                <a href={item.href}>{item.name}</a>
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-ink-700">
                <span className="rounded-md border border-sand-400 bg-sand-50 px-2.5 py-1">{formatMoney(item.price)} / {item.unit}</span>
                <span className="rounded-md border border-sand-400 bg-sand-50 px-2.5 py-1">KMD confirmation</span>
              </div>
            </div>
            <div className="grid gap-3 sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-between overflow-hidden rounded-md border border-sand-400 bg-sand-50">
                <button
                  aria-label={`Decrease ${item.name} quantity`}
                  className="grid h-11 w-11 place-items-center text-ink-900 transition hover:bg-white"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  type="button"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  className="h-11 w-16 border-x border-sand-400 bg-white text-center text-sm font-semibold text-ink-900 outline-none"
                  min="1"
                  onChange={(event) => updateQuantity(item.id, Number(event.target.value) || 1)}
                  type="number"
                  value={item.quantity}
                />
                <button
                  aria-label={`Increase ${item.name} quantity`}
                  className="grid h-11 w-11 place-items-center text-ink-900 transition hover:bg-white"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-brand-red">{formatMoney(item.price * item.quantity)}</div>
                <button className="inline-flex items-center gap-1 text-sm font-semibold text-ink-700" onClick={() => removeItem(item.id)} type="button">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="surface-card p-5 sm:p-6 xl:sticky xl:top-6">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand-red/10 text-brand-red">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Request Summary</p>
            <h2 className="mt-1 font-serif text-2xl text-ink-900">Ready for checkout review.</h2>
          </div>
        </div>
        <div className="mt-4 grid gap-3 border-b border-sand-400 pb-4 text-sm text-ink-700">
          <div className="flex justify-between gap-3">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Delivery</span>
            <span>Confirm with KMD</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-semibold text-ink-900">Estimated total</span>
          <span className="text-2xl font-semibold text-brand-red">{formatMoney(subtotal)}</span>
        </div>
        <p className="mt-3 text-xs leading-5 text-ink-700">
          Final total may change after stock, delivery, and project scope are confirmed.
        </p>
        <div className="mt-5 grid gap-2 text-sm text-ink-700">
          <div className="flex items-center gap-2 rounded-md border border-sand-400 bg-sand-50 p-3">
            <PackageCheck className="h-4 w-4 text-brand-red" />
            Product availability review
          </div>
          <div className="flex items-center gap-2 rounded-md border border-sand-400 bg-sand-50 p-3">
            <Truck className="h-4 w-4 text-brand-red" />
            Delivery and site access quote
          </div>
          <div className="flex items-center gap-2 rounded-md border border-sand-400 bg-sand-50 p-3">
            <CheckCircle2 className="h-4 w-4 text-brand-red" />
            Payment after KMD confirmation
          </div>
        </div>
        <a className="action-commerce mt-6 w-full gap-2" href="/checkout">
          Continue to Checkout
          <ChevronIcon />
        </a>
        <button className="action-secondary mt-3 w-full" onClick={clearItems} type="button">
          Clear Cart
        </button>
      </aside>
    </div>
  );
}

function ChevronIcon() {
  return <span aria-hidden="true">-&gt;</span>;
}
