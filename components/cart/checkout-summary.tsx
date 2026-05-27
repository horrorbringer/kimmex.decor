"use client";

import { getCartSubtotal, readCart } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import { useEffect, useMemo, useState } from "react";

export function CheckoutSummary() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);

  return (
    <aside className="surface-card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Cart Summary</p>
      {items.length === 0 ? (
        <p className="mt-3 text-sm leading-6 text-ink-700">No cart items yet. Customers can still submit an order request with notes.</p>
      ) : (
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 border-b border-sand-400 pb-3 text-sm last:border-b-0 last:pb-0">
              <div>
                <div className="font-semibold text-ink-900">{item.name}</div>
                <div className="mt-1 text-ink-700">
                  {item.quantity} x ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="font-semibold text-brand-red">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="flex justify-between gap-3 border-t border-sand-400 pt-3 font-semibold text-ink-900">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
