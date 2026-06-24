"use client";

import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { getOrder, getOrderTimeline, getStatusBadgeColor } from "@/lib/api-orders";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Package, CreditCard, Loader2 } from "lucide-react";
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

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const id = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <>
      <SiteHeader />
      <main className="page-shell min-h-screen bg-gradient-to-br from-sand-50 to-sand-100">
        <div className="section-shell">
          <div className="mb-8 flex items-center gap-3">
            <Link href="/account?view=orders" className="text-ink-700 transition hover:text-ink-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="font-serif text-4xl text-ink-900">Order #{order.order_number}</h1>
              <p className="mt-1 text-ink-700">Placed on {formatDate(order.created_at)}</p>
            </div>
            <div className={`rounded-full px-4 py-2 text-sm font-semibold uppercase ${statusColor}`}>
              {order.status}
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
                          new Date(item.timestamp) <= new Date() 
                            ? "bg-brand-red text-white" 
                            : "bg-sand-200 text-ink-700"
                        }`}>
                          {item.icon}
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
                <div className="space-y-4">
                  {order.items.map((item: { id: string; name: string; quantity: number; unit_price: number; subtotal?: number }) => (
                    <div key={item.id} className="flex justify-between pb-4 border-b border-sand-400 last:border-b-0">
                      <div className="flex-1">
                        <p className="font-semibold text-ink-900">{item.name}</p>
                        <p className="text-sm text-ink-700">Qty: {item.quantity} x {formatMoney(item.unit_price)}</p>
                      </div>
                      <p className="font-semibold text-brand-red">{formatMoney(item.subtotal || item.unit_price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {(order.customer_name || order.delivery_address) && (
                <div className="rounded-lg border border-sand-400 bg-white p-6">
                  <h2 className="font-serif text-xl text-ink-900 mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Information
                  </h2>
                  <div className="space-y-4">
                    {order.customer_name && (
                      <div>
                        <p className="text-sm text-ink-700">Recipient</p>
                        <p className="font-semibold text-ink-900">{order.customer_name}</p>
                      </div>
                    )}
                    {order.delivery_address && (
                      <div>
                        <p className="text-sm text-ink-700">Address</p>
                        <p className="font-semibold text-ink-900">{order.delivery_address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(order.customer_email || order.customer_phone) && (
                <div className="rounded-lg border border-sand-400 bg-white p-6">
                  <h2 className="font-serif text-xl text-ink-900 mb-6">Contact Information</h2>
                  <div className="space-y-3">
                    {order.customer_email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-ink-700" />
                        <p className="text-ink-900">{order.customer_email}</p>
                      </div>
                    )}
                    {order.customer_phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-ink-700" />
                        <p className="text-ink-900">{order.customer_phone}</p>
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
                    <span className="font-medium text-ink-900">{formatMoney(order.total_amount)}</span>
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
                  <p className="text-xs text-ink-700">
                    Shipping and taxes will be calculated and confirmed with the customer.
                  </p>
                  <p className="text-2xl font-serif text-brand-red">
                    {formatMoney(order.total_amount)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-sand-400 bg-white p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-ink-700">
                    <Calendar className="h-4 w-4" />
                    <span>Order ID: {order.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-700">
                    <Package className="h-4 w-4" />
                    <span>{order.item_count} {order.item_count === 1 ? "item" : "items"}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-sand-400 bg-sand-50 p-4">
                <p className="text-sm text-ink-700 mb-3">
                  Need help with your order?
                </p>
                <Link href="/contact" className="action-secondary w-full text-center text-sm">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
