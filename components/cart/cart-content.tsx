"use client";

import { clearCart, getCartSubtotal, readCart, removeCartItem, updateCartQuantity } from "@/lib/cart-store";
import { clearCustomerCart, removeCustomerCartItem, updateCustomerCartItem } from "@/lib/api-customer-storage";
import { getApiErrorMessage } from "@/lib/api-client";
import { hasCheckoutApiItems } from "@/lib/api-checkout";
import { readApiToken } from "@/lib/api-auth";
import { useToast } from "@/components/ui/toast";
import type { CartItem } from "@/lib/cart-store";
import { AlertCircle, CheckCircle2, ClipboardCheck, Minus, PackageCheck, Plus, RefreshCw, ShoppingBag, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export function CartContent() {
  const { addToast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isAccountCart, setIsAccountCart] = useState(false);

  useEffect(() => {
    const syncCart = () => {
      setItems(readCart());
      setIsAccountCart(Boolean(readApiToken()));
    };

    syncCart();
    window.addEventListener("kmd-cart-updated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("kmd-cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);
  const checkoutReady = hasCheckoutApiItems(items);

  const updateQuantity = (productId: string, quantity: number) => {
    const nextItems = updateCartQuantity(productId, quantity);
    setItems(nextItems);
    updateCustomerCartItem(productId, Math.max(1, quantity)).catch((error) => {
      addToast({
        type: "warning",
        title: "Cart saved locally",
        message: getApiErrorMessage(error, "KMD could not sync this quantity yet.")
      });
    });
  };

  const removeItem = (productId: string) => {
    setItems(removeCartItem(productId));
    removeCustomerCartItem(productId).catch((error) => {
      addToast({
        type: "warning",
        title: "Removed locally",
        message: getApiErrorMessage(error, "KMD could not remove this item from your account cart yet.")
      });
    });
  };

  const clearItems = () => {
    clearCart();
    setItems([]);
    clearCustomerCart().catch((error) => {
      addToast({
        type: "warning",
        title: "Cart cleared locally",
        message: getApiErrorMessage(error, "KMD could not clear your account cart yet.")
      });
    });
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
            <Link className="resource-action w-fit" href="/products">
              Continue Shopping
            </Link>
          </div>
          <div className={`mt-4 flex items-start gap-3 rounded-md border p-3 text-sm ${
            checkoutReady ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-900"
          }`}>
            {checkoutReady ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
            <p>
              {checkoutReady
                ? isAccountCart
                  ? "These items can submit through your synced account cart."
                  : "These items are ready for guest checkout review."
                : "Some items need a quick KMD review before API checkout. You can still send the request by WhatsApp or contact form."}
            </p>
          </div>
        </div>
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 border-b border-sand-400 p-4 last:border-b-0 sm:grid-cols-[96px_minmax(0,1fr)] sm:items-center md:grid-cols-[112px_minmax(0,1fr)_184px]">
            <Link className="block overflow-hidden rounded-md border border-sand-400 bg-sand-50" href={item.href}>
              <Image alt={item.name} className="h-40 w-full object-cover transition hover:scale-105 sm:h-24 md:h-28" src={item.imageUrl} width={112} height={112} loading="lazy" />
            </Link>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">
                {item.brand} / {item.sku}
              </div>
              <h3 className="mt-2 font-serif text-2xl leading-tight text-ink-900">
                <Link href={item.href}>{item.name}</Link>
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-ink-700">
                <span className="rounded-md border border-sand-400 bg-sand-50 px-2.5 py-1">{formatMoney(item.price)} / {item.unit}</span>
                <span className="rounded-md border border-sand-400 bg-sand-50 px-2.5 py-1">KMD confirmation</span>
                {isAccountCart ? <span className="rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-green-700">Account sync</span> : null}
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
                  className="h-11 w-16 border-x border-sand-400 bg-white text-center text-base sm:text-sm font-semibold text-ink-900 outline-none"
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
          {checkoutReady
            ? "Final total may change after stock, delivery, and project scope are confirmed."
            : "This cart can be saved as a request if API checkout cannot confirm every item."}
        </p>
        <div className="mt-5 grid gap-2 text-sm text-ink-700">
          <div className="flex items-center gap-2 rounded-md border border-sand-400 bg-sand-50 p-3">
            <RefreshCw className="h-4 w-4 text-brand-red" />
            {isAccountCart ? "Synced account cart" : "Guest cart on this device"}
          </div>
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
