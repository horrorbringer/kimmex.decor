import { fetchJson } from "@/lib/api-client";
import { readApiToken } from "./api-auth";

type OrderItem = {
  id: string;
  product_name?: string;
  name?: string;
  quantity: number;
  unit_price: number;
  subtotal?: number;
};

type Order = {
  id: string;
  order_number: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status?: "pending" | "paid" | "failed" | string;
  total_amount: number;
  created_at: string;
  updated_at?: string;
  ordered_at?: string;
  item_count?: number;
  items: OrderItem[];
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_address?: string;
  tracking_number?: string;
  estimated_delivery?: string;
  notes?: string;
};

type OrderTimeline = {
  status: string;
  timestamp: string;
  description: string;
  icon?: string;
};

export async function getOrders(): Promise<Order[]> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");

  const response = await fetchJson<{ data: Order[] }>("/orders", {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data.map((order) => ({
    ...order,
    ordered_at: order.ordered_at || order.created_at,
    item_count: order.item_count || order.items?.length || 0,
    items: order.items.map((item) => ({
      ...item,
      name: item.name || item.product_name,
      subtotal: item.subtotal || item.unit_price * item.quantity
    }))
  }));
}

export async function getOrder(orderId: string): Promise<Order> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");

  const order = await fetchJson<Order>(`/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return {
    ...order,
    ordered_at: order.ordered_at || order.created_at,
    item_count: order.item_count || order.items?.length || 0,
    items: order.items.map((item) => ({
      ...item,
      name: item.name || item.product_name,
      subtotal: item.subtotal || item.unit_price * item.quantity
    }))
  };
}

export function getOrderTimeline(order: Order): OrderTimeline[] {
  const timeline: OrderTimeline[] = [
    {
      status: "placed",
      timestamp: order.created_at,
      description: "Order placed",
      icon: "📋"
    }
  ];

  const statusMap: Record<string, { description: string; icon: string }> = {
    confirmed: { description: "Order confirmed", icon: "✓" },
    processing: { description: "Order processing", icon: "⚙️" },
    shipped: { description: "Order shipped", icon: "📦" },
    delivered: { description: "Order delivered", icon: "🎉" },
    cancelled: { description: "Order cancelled", icon: "❌" }
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

export type { Order, OrderItem, OrderTimeline };
