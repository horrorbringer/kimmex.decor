"use client";

import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { getOrder, getOrderTimeline, getStatusBadgeColor, reorderOrder } from "@/lib/api-orders";
import type { Order, ReorderSkippedItem } from "@/lib/api-orders";
import { getApiErrorMessage } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Calendar, CheckCircle2, Clock3, CreditCard, Loader2, Mail, MapPin, Package, RefreshCw, Phone, Truck } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatMoney(value: number): string {
  return "$" + value.toFixed(2);
}

function formatLabel(value?: string | null): string {
  return value ? value.replace(/_/g, " ") : "To be confirmed";
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const id = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reorderLoading, setReorderLoading] = useState(false);
  const [reorderError, setReorderError] = useState("");
  const [reorderAddedCount, setReorderAddedCount] = useState<number | null>(null);
  const [reorderSkippedItems, setReorderSkippedItems] = useState<ReorderSkippedItem[]>([]);
  // Guards new Date() comparisons so they only run client-side,
  // preventing server/client hydration mismatches on the timeline.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push("/login?redirect=/orders/" + id);
      return;
    }

    getOrder(id)
      .then(setOrder)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id, authLoading, isAuthenticated, router]);

  if (authLoading || loading) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sand-50 to-sand-100">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
        </main>
        <SiteFooter />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-sand-50 to-sand-100">
          <p className="font-serif text-2xl text-ink-900">Order not found</p>
          <Link href="/account?view=orders" className="text-brand-red hover:underline">Back to orders</Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  const timeline = getOrderTimeline(order);
  const statusColor = getStatusBadgeColor(order.status);
  const customer = order.customer ?? {
    name: order.customer_name,
    email: order.customer_email,
    phone: order.customer_phone
  };
  const delivery = order.delivery ?? {
    address: order.delivery_address
  };
  const subtotal = order.subtotal ?? order.total_amount;
  const deliveryFee = order.delivery_fee ?? 0;
  const handleReorder = async () => {
    setReorderLoading(true);
    setReorderError("");
    setReorderAddedCount(null);
    setReorderSkippedItems([]);

    try {
      const result = await reorderOrder(order.id);
      setReorderAddedCount(result.added_item_count);
      setReorderSkippedItems(result.skipped_items);
    } catch (reorderFailure) {
      setReorderError(getApiErrorMessage(reorderFailure, "KMD could not rebuild this order into your cart."));
    } finally {
      setReorderLoading(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="page-shell min-h-screen bg-gradient-to-br from-sand-50 to-sand-100">
        <div className="section-shell">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
            <Link href="/account?view=orders" className="grid h-10 w-10 place-items-center rounded-full border border-sand-400 bg-white text-ink-700 transition hover:text-ink-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">Order detail</p>
              <h1 className="font-serif text-4xl text-ink-900">#{order.order_number}</h1>
              <p className="mt-1 text-ink-700">Placed on {formatDate(order.ordered_at || order.created_at)}</p>
              </div>
            </div>
            <div className={`rounded-full px-4 py-2 text-sm font-semibold uppercase ${statusColor}`}>
              {formatLabel(order.status)}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-lg border border-sand-400 bg-white p-6">
                <h2 className="font-serif text-xl text-ink-900 mb-6">Order Status</h2>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={item.status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          mounted && new Date(item.timestamp) <= new Date()
                            ? "bg-brand-red text-white" 
                            : "bg-sand-200 text-ink-700"
                        }`}>
                          {item.status === "placed" ? <Package className="h-4 w-4" /> : item.status === "shipped" ? <Truck className="h-4 w-4" /> : item.status === "delivered" ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="h-8 w-0.5 bg-sand-400 my-2" />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className="font-semibold text-ink-900 capitalize">{item.description}</p>
                        <p className="text-sm text-ink-700">{formatDate(item.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-sand-400 bg-white p-6">
                <h2 className="font-serif text-xl text-ink-900 mb-6">Items Ordered</h2>
                <div className="divide-y divide-sand-400">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink-900">{item.name}</p>
                        <p className="mt-1 text-sm leading-6 text-ink-700">
                          {item.sku ? `SKU: ${item.sku} · ` : ""}
                          Qty: {item.quantity}{item.unit ? ` ${item.unit}` : ""} · Unit: {formatMoney(item.unit_price)}
                        </p>
                      </div>
                      <p className="shrink-0 font-semibold text-brand-red">{formatMoney(item.subtotal || item.unit_price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {(customer.name || delivery.address || delivery.area || delivery.method) && (
                <div className="rounded-lg border border-sand-400 bg-white p-6">
                  <h2 className="font-serif text-xl text-ink-900 mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Information
                  </h2>
                  <div className="space-y-4">
                    {customer.name && (
                      <div>
                        <p className="text-sm text-ink-700">Recipient</p>
                        <p className="font-semibold text-ink-900">{customer.name}</p>
                      </div>
                    )}
                    {delivery.method && (
                      <div>
                        <p className="text-sm text-ink-700">Method</p>
                        <p className="font-semibold capitalize text-ink-900">{formatLabel(delivery.method)}</p>
                      </div>
                    )}
                    {delivery.area && (
                      <div>
                        <p className="text-sm text-ink-700">Area</p>
                        <p className="font-semibold text-ink-900">{delivery.area}</p>
                      </div>
                    )}
                    {delivery.address && (
                      <div>
                        <p className="text-sm text-ink-700">Address</p>
                        <p className="font-semibold text-ink-900">{delivery.address}</p>
                      </div>
                    )}
                    {delivery.preferred_date || delivery.timing || delivery.support ? (
                      <div>
                        <p className="text-sm text-ink-700">Timing and support</p>
                        <p className="font-semibold capitalize text-ink-900">
                          {[formatLabel(delivery.timing), delivery.preferred_date, formatLabel(delivery.support)].filter((item) => item && item !== "To be confirmed").join(" / ") || "To be confirmed"}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}

              {(customer.email || customer.phone) && (
                <div className="rounded-lg border border-sand-400 bg-white p-6">
                  <h2 className="font-serif text-xl text-ink-900 mb-6">Contact Information</h2>
                  <div className="space-y-3">
                    {customer.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-ink-700" />
                        <p className="text-ink-900">{customer.email}</p>
                      </div>
                    )}
                    {customer.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-ink-700" />
                        <p className="text-ink-900">{customer.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-sand-400 bg-white p-6">
                <h2 className="font-serif text-xl text-ink-900 mb-4">Order Summary</h2>
                <div className="space-y-3 border-b border-sand-400 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-ink-700">Subtotal</span>
                    <span className="font-medium text-ink-900">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-700">Delivery</span>
                    <span className="font-medium text-ink-900">{deliveryFee > 0 ? formatMoney(deliveryFee) : "Confirm with KMD"}</span>
                  </div>
                  {order.payment_status && (
                    <div className="flex items-center justify-between">
                      <span className="text-ink-700 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment
                      </span>
                      <span className={`text-sm font-semibold capitalize ${
                        order.payment_status === "paid" 
                          ? "text-green-600" 
                          : order.payment_status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}>
                        {order.payment_status}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-ink-700">Delivery fee and final total are confirmed before payment.</p>
                  <p className="text-2xl font-serif text-brand-red">
                    {formatMoney(order.total_amount)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-sand-400 bg-white p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-ink-700">
                    <Calendar className="h-4 w-4" />
                    <span className="break-all">Order ID: {order.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-700">
                    <Package className="h-4 w-4" />
                  <span>{order.item_count || order.items.length} {(order.item_count || order.items.length) === 1 ? "item" : "items"}</span>
                </div>
                {order.notes ? (
                  <div className="mt-4 border-t border-sand-400 pt-4 text-sm text-ink-700">
                    <p className="font-semibold text-ink-900">Notes</p>
                    <p className="mt-1 leading-6">{order.notes}</p>
                  </div>
                ) : null}
              </div>
              </div>

              <div className="rounded-lg border border-sand-400 bg-sand-50 p-4">
                <p className="text-sm text-ink-700 mb-3">Need help with your order?</p>
                <Link href={`/contact?type=order-request&order=${encodeURIComponent(order.id)}`} className="action-secondary w-full text-center text-sm">
                  Contact Support
                </Link>
              </div>

              <div className="rounded-lg border border-sand-400 bg-white p-6">
                <h2 className="font-serif text-xl text-ink-900">Order again</h2>
                <p className="mt-2 text-sm leading-6 text-ink-700">
                  Add available items from this order back to your cart at current prices.
                </p>
                <button className="action-commerce mt-4 w-full gap-2" disabled={reorderLoading} onClick={handleReorder} type="button">
                  {reorderLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  {reorderLoading ? "Checking items..." : "Reorder Available Items"}
                </button>
                {reorderAddedCount !== null ? (
                  <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                    {reorderAddedCount > 0 ? `${reorderAddedCount} available item${reorderAddedCount === 1 ? "" : "s"} added to cart.` : "No items could be added to cart."}
                    {reorderAddedCount > 0 ? <Link className="mt-2 block font-semibold underline" href="/cart">Review cart</Link> : null}
                  </div>
                ) : null}
                {reorderSkippedItems.length > 0 ? (
                  <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    <p className="font-semibold">Some items need review</p>
                    <ul className="mt-2 grid gap-1">
                      {reorderSkippedItems.map((item) => (
                        <li key={`${item.product_id}-${item.sku}-${item.reason}`}>
                          {item.name} ({item.quantity}) - {formatLabel(item.reason)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {reorderError ? <p className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{reorderError}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
