"use client";

import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { clearCustomerCart } from "@/lib/api-customer-storage";
import { submitCheckout } from "@/lib/api-checkout";
import { getCartSubtotal, readCart } from "@/lib/cart-store";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { reportError } from "@/lib/error-tracking";
import { useRouter } from "next/navigation";

type CheckoutFormData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<ReturnType<typeof readCart>>([]);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: user?.name || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
    deliveryAddress: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setCartItems(readCart());
  }, []);

  useEffect(() => {
    if (user && !formData.customerName) {
      setFormData((current) => ({
        ...current,
        customerName: user.name || current.customerName,
        customerEmail: user.email || current.customerEmail,
        customerPhone: user.phone || current.customerPhone
      }));
    }
  }, [user]);

  const subtotal = getCartSubtotal(cartItems);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (cartItems.length === 0) {
        throw new Error("Your cart is empty");
      }

      const result = await submitCheckout({
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        })),
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
        delivery_method: "delivery",
        area: formData.deliveryAddress,
        address: formData.deliveryAddress,
        timing: "standard",
        support: "none",
        notes: formData.notes
      });

      setOrderNumber(result.order_number);
      setSuccess(true);
      
      // Clear cart after successful checkout
      localStorage.removeItem("kmd-cart");
      clearCustomerCart().catch(() => reportError("clearCustomerCart failed", { component: "CheckoutPage", action: "checkout" }));
      window.dispatchEvent(new CustomEvent("kmd-cart-updated"));

      // Redirect to order page after 2 seconds
      setTimeout(() => {
        router.push(`/account?view=orders`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <SiteHeader />
        <main className="page-shell min-h-screen bg-gradient-to-br from-green-50 to-green-100">
          <div className="section-shell">
            <div className="mx-auto max-w-md text-center py-24">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-green-500/10 text-green-600 mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h1 className="mt-6 font-serif text-3xl text-ink-900">Order Submitted!</h1>
              <p className="mt-3 text-ink-700">Order <strong>#{orderNumber}</strong> has been received.</p>
              <p className="mt-2 text-sm text-ink-700">Check your email for confirmation and tracking details.</p>
              <Link href="/account?view=orders" className="action-primary mt-6 inline-block">
                View Your Order
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell min-h-screen bg-gradient-to-br from-sand-50 to-sand-100">
        <div className="section-shell">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <Link href="/cart" className="text-ink-700 transition hover:text-ink-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-serif text-4xl text-ink-900">Checkout</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                {/* Customer Info */}
                <div className="rounded-lg border border-sand-400 bg-white p-6">
                  <h2 className="font-serif text-xl text-ink-900 mb-4">Delivery Information</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-900 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        required
                        className="form-field"
                        placeholder="John Doe"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-ink-900 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                          required
                          className="form-field"
                          placeholder="you@example.com"
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink-900 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={formData.customerPhone}
                          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                          required
                          className="form-field"
                          placeholder="+855 10 123 456"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink-900 mb-1">Delivery Address</label>
                      <textarea
                        value={formData.deliveryAddress}
                        onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                        required
                        rows={3}
                        className="form-field"
                        placeholder="123 Street Name, District, City"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink-900 mb-1">Additional Notes (Optional)</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={2}
                        className="form-field"
                        placeholder="Any special instructions..."
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || cartItems.length === 0}
                  className="action-primary w-full rounded-lg border-0 py-3 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - ${cartItems.length} ${cartItems.length === 1 ? "item" : "items"}`
                  )}
                </button>
              </form>
            </div>

            {/* Summary */}
            <div className="rounded-lg border border-sand-400 bg-white p-6 h-fit sticky top-4">
              <h2 className="font-serif text-xl text-ink-900 mb-4">Order Summary</h2>

              <div className="space-y-3 border-b border-sand-400 pb-4 mb-4">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-ink-700">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-ink-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-ink-700 italic">No items in cart</p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-ink-700">Subtotal</span>
                  <span className="font-medium text-ink-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="text-xs text-ink-700 italic">Shipping and taxes calculated after confirmation</div>
              </div>

              <div className="border-t border-sand-400 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-ink-900">Estimated Total</span>
                  <span className="font-serif text-2xl text-brand-red">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
                  <p className="text-xs text-orange-800">
                    <strong>Tip:</strong> <Link href="/login" className="underline hover:no-underline">Sign in</Link> to track your order
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
