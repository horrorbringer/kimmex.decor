import { fetchJson } from "@/lib/api-client";
import { readApiToken } from "./api-auth";

type CheckoutItem = {
  product_id: string;
  quantity: number;
  unit_price?: number;
};

type CheckoutRequest = {
  items: CheckoutItem[];
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_address?: string;
  notes?: string;
};

type OrderResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
  };
};

type CheckoutApiOrder = {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
};

type CartItemForCheckout = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// New API
export async function submitCheckout(data: CheckoutRequest): Promise<{ order_id: string; order_number: string; total: number }> {
  const token = readApiToken();
  
  const response = await fetchJson<OrderResponse>("/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  });

  if (!response.success || !response.data) {
    throw new Error(response.message || "Checkout failed");
  }

  return {
    order_id: response.data.id,
    order_number: response.data.order_number,
    total: response.data.total_amount
  };
}

// Legacy API for backward compatibility with checkout-form
export function hasCheckoutApiItems(items: CartItemForCheckout[]): boolean {
  return items.length > 0;
}

export async function submitCheckoutRequest(
  details: { name: string; phone: string; email: string; address: string },
  items: CartItemForCheckout[]
): Promise<CheckoutApiOrder> {
  const result = await submitCheckout({
    items: items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price
    })),
    customer_name: details.name,
    customer_phone: details.phone,
    customer_email: details.email,
    delivery_address: details.address
  });

  return {
    id: result.order_id,
    order_number: result.order_number,
    status: "pending",
    total_amount: result.total,
    created_at: new Date().toISOString()
  };
}

export type { CheckoutItem, CheckoutRequest, CheckoutApiOrder };
