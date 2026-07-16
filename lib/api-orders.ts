import { fetchJson } from "@/lib/api-client";
import { saveCart } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import { readApiToken } from "./api-auth";

type OrderItem = {
  id: string;
  product_id?: string;
  product_name?: string;
  name?: string;
  sku?: string | null;
  unit?: string | null;
  quantity: number;
  unit_price: number;
  subtotal?: number;
  total_price?: number;
};

type OrderCustomer = {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
};

type OrderDelivery = {
  method?: string | null;
  area?: string | null;
  address?: string | null;
  map_url?: string | null;
  timing?: string | null;
  preferred_date?: string | null;
  support?: string | null;
};

type Order = {
  id: string;
  order_number: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status?: "pending" | "paid" | "failed" | string;
  subtotal?: number;
  delivery_fee?: number;
  total_amount: number;
  currency?: string;
  created_at: string;
  updated_at?: string;
  ordered_at?: string;
  item_count?: number;
  items: OrderItem[];
  customer?: OrderCustomer;
  delivery?: OrderDelivery;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_address?: string;
  tracking_number?: string;
  estimated_delivery?: string;
  notes?: string;
};

type LaravelResource<T> = T | { data: T };

type ApiCartItem = {
  product_id: string;
  name?: string | null;
  slug?: string | null;
  sku?: string | null;
  brand?: string | null;
  unit?: string | null;
  image_url?: string | null;
  quantity: number;
  unit_price: number;
};

type ApiCart = {
  items?: ApiCartItem[];
};

type ReorderSkippedItem = {
  product_id?: string | null;
  name: string;
  sku?: string | null;
  quantity: number;
  reason: "unavailable" | "minimum_order_not_met" | "insufficient_stock" | string;
};

type ReorderResponse = {
  added_item_count: number;
  skipped_items: ReorderSkippedItem[];
};

type OrderTimeline = {
  status: string;
  timestamp: string;
  description: string;
  icon?: string;
};

function unwrapResource<T>(value: LaravelResource<T>): T {
  if (value && typeof value === "object" && "data" in value) {
    return (value as { data: T }).data;
  }
  return value as T;
}

function normalizeOrder(order: Order): Order {
  const orderedAt = order.ordered_at || order.created_at || new Date().toISOString();

  return {
    ...order,
    created_at: order.created_at || orderedAt,
    ordered_at: orderedAt,
    item_count: order.item_count || order.items?.reduce((total, item) => total + item.quantity, 0) || 0,
    items: (order.items ?? []).map((item) => ({
      ...item,
      name: item.name || item.product_name,
      subtotal: item.subtotal || item.total_price || item.unit_price * item.quantity
    }))
  };
}

function cartItemFromApi(item: ApiCartItem): CartItem {
  const slug = item.slug || item.product_id;

  return {
    id: item.product_id,
    name: item.name || "Product",
    brand: item.brand || "KMD Decor",
    sku: item.sku || "",
    price: Number(item.unit_price),
    unit: item.unit || "unit",
    imageUrl: item.image_url || "/products/gypsum_board.webp",
    href: `/products/${slug}`,
    quantity: item.quantity
  };
}

export async function getOrders(): Promise<Order[]> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");

  const response = await fetchJson<{ data: Order[] }>("/orders", {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data.map(normalizeOrder);
}

export async function getOrder(orderId: string): Promise<Order> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");

  const response = await fetchJson<LaravelResource<Order>>(`/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return normalizeOrder(unwrapResource(response));
}

export async function reorderOrder(orderId: string): Promise<ReorderResponse> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");

  const response = await fetchJson<{ data: { cart: LaravelResource<ApiCart>; added_item_count: number; skipped_items: ReorderSkippedItem[] } }>(
    `/orders/${orderId}/reorder`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const cart = unwrapResource(response.data.cart);
  saveCart((cart.items ?? []).map(cartItemFromApi));

  return {
    added_item_count: response.data.added_item_count,
    skipped_items: response.data.skipped_items
  };
}

export function getOrderTimeline(order: Order): OrderTimeline[] {
  const timeline: OrderTimeline[] = [
    {
      status: "placed",
      timestamp: order.created_at,
      description: "Order placed",
      icon: "placed"
    }
  ];

  const statusMap: Record<string, { description: string; icon: string }> = {
    confirmed: { description: "Order confirmed", icon: "confirmed" },
    processing: { description: "Order processing", icon: "processing" },
    shipped: { description: "Order shipped", icon: "shipped" },
    delivered: { description: "Order delivered", icon: "delivered" },
    cancelled: { description: "Order cancelled", icon: "cancelled" }
  };

  if (order.status !== "pending" && statusMap[order.status]) {
    timeline.push({
      status: order.status,
      timestamp: order.updated_at || order.created_at,
      description: statusMap[order.status].description,
      icon: statusMap[order.status].icon
    });
  }

  return timeline;
}

export function getStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

export type { Order, OrderItem, OrderTimeline, ReorderResponse, ReorderSkippedItem };
