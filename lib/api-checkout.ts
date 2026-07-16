import { fetchJson } from "@/lib/api-client";
import { readApiToken } from "./api-auth";

type CheckoutItem = {
  product_id: string;
  quantity: number;
  unit_price?: number;
};

type CheckoutRequest = {
  items?: CheckoutItem[];
  name: string;
  phone: string;
  email?: string;
  delivery_method: "delivery" | "pickup";
  area?: string;
  address?: string;
  map_url?: string;
  timing: "standard" | "urgent" | "scheduled";
  preferred_date?: string;
  support: "none" | "unloading" | "installation";
  notes?: string;
};

type LaravelOrderResponse = {
  data: {
    id: string;
    order_number: string;
    status: string;
    total_amount: number;
    ordered_at?: string;
  };
  message: string;
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
  
  const response = await fetchJson<LaravelOrderResponse>("/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  });

  if (!response.data) {
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
  return items.length > 0 && items.every((item) => isUuid(item.id));
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export async function submitCheckoutRequest(
  details: {
    name: string;
    phone: string;
    email: string;
    area: string;
    address: string;
    mapLink: string;
    deliveryMethod: "delivery" | "pickup";
    timing: "standard" | "urgent" | "scheduled";
    preferredDate: string;
    support: "none" | "unloading" | "installation";
    notes: string;
  },
  items: CartItemForCheckout[]
): Promise<CheckoutApiOrder> {
  const token = readApiToken();
  const result = await submitCheckout({
    items: items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price
    })),
    name: details.name,
    phone: details.phone,
    email: details.email || undefined,
    delivery_method: details.deliveryMethod,
    area: details.deliveryMethod === "delivery" ? details.area : undefined,
    address: details.deliveryMethod === "delivery" ? details.address : undefined,
    map_url: details.mapLink || undefined,
    timing: details.timing,
    preferred_date: details.timing === "scheduled" ? details.preferredDate : undefined,
    support: details.support,
    notes: details.notes || undefined
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
