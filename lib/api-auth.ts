import { fetchJson } from "@/lib/api-client";
import { getToken, getUser, setAuthCookie, clearAuthCookies } from "@/lib/cookies";
import { getInternationalCambodianPhone } from "@/lib/phone";

type AuthToken = {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
};

type ApiUser = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  is_verified: boolean;
  created_at: string;
};

type ApiOrder = {
  id: string;
  order_number: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status?: "pending" | "paid" | "failed" | string;
  total_amount: number;
  created_at: string;
  ordered_at?: string;
  item_count?: number;
  updated_at: string;
  items: Array<{
    id: string;
    product_name?: string;
    name?: string;
    quantity: number;
    unit_price: number;
  }>;
};

type LaravelUserResponse = {
  id: number | string;
  email: string;
  name: string;
  phone?: string | null;
  role: string;
  email_verified: boolean;
  email_verified_at: string | null;
  created_at: string;
};

type LaravelResource<T> = T | { data: T };

function unwrapResource<T>(value: LaravelResource<T>): T {
  if (value && typeof value === "object" && "data" in value) {
    return (value as { data: T }).data;
  }
  return value as T;
}

function adaptUser(laravelUserResponse: LaravelResource<LaravelUserResponse>): ApiUser {
  const laravelUser = unwrapResource(laravelUserResponse);

  return {
    id: String(laravelUser.id),
    email: laravelUser.email,
    name: laravelUser.name,
    phone: laravelUser.phone,
    is_verified: laravelUser.email_verified,
    created_at: laravelUser.created_at
  };
}

// Public endpoints
export async function createCustomerAccount(email: string, password: string, fullName: string, phone?: string): Promise<void> {
  const body: Record<string, string> = { email, password, password_confirmation: password, name: fullName };
  if (phone) body.phone = getInternationalCambodianPhone(phone);

  await fetchJson<any>("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    timeout: 15000
  });
}

export async function register(email: string, password: string, fullName: string, phone?: string): Promise<{ token: AuthToken; user: ApiUser }> {
  const body: Record<string, string> = { email, password, password_confirmation: password, name: fullName };
  if (phone) body.phone = getInternationalCambodianPhone(phone);

  const response = await fetchJson<any>("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    timeout: 15000
  });

  const data = response.data || response;
  const token = data.token || data.access_token;
  const tokenType = data.token_type || "Bearer";
  const user = data.user ? unwrapResource<LaravelUserResponse>(data.user) : unwrapResource<LaravelUserResponse>(data);

  if (!token || !user?.email) {
    throw new Error("Registration failed");
  }

  return {
    token: {
      access_token: token,
      token_type: tokenType,
      expires_in: 0
    },
    user: adaptUser(user)
  };
}

export async function login(email: string, password: string): Promise<{ token: AuthToken; user: ApiUser }> {
  const response = await fetchJson<{ data?: { token: string; token_type: string; user: LaravelResource<LaravelUserResponse> } }>("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.data) {
    throw new Error("Login failed");
  }

  return {
    token: {
      access_token: response.data.token,
      token_type: response.data.token_type as "Bearer",
      expires_in: 0
    },
    user: adaptUser(response.data.user)
  };
}

export async function socialLoginRedirect(provider: "google"): Promise<{ url: string }> {
  const response = await fetchJson<{ url: string }>(`/auth/${provider}/redirect`);
  return response;
}

// Protected endpoints (require token)
export async function getCurrentUser(token: string): Promise<ApiUser> {
  const laravelUser = await fetchJson<LaravelResource<LaravelUserResponse>>("/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return adaptUser(laravelUser);
}

export async function updateProfile(token: string, updates: Partial<{ name: string; phone: string | null }>): Promise<ApiUser> {
  const body: Record<string, any> = {};
  if (updates.name) body.full_name = updates.name;
  if (updates.phone !== undefined) body.phone = updates.phone;

  const laravelUser = await fetchJson<LaravelResource<LaravelUserResponse>>("/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return adaptUser(laravelUser);
}

export async function getCustomerOrders(token: string): Promise<ApiOrder[]> {
  const response = await fetchJson<{ data: ApiOrder[] }>("/orders", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.map((order) => ({
    ...order,
    ordered_at: order.ordered_at || order.created_at,
    item_count: order.item_count || order.items?.length || 0,
    items: order.items.map((item) => ({
      ...item,
      name: item.name || item.product_name
    }))
  }));
}

export async function logout(token: string): Promise<void> {
  await fetchJson("/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  }).catch(() => {
    // Logout failed — token may already be invalid
  });
}

// Cookie-based storage functions
export function readApiToken(): string | null {
  return typeof window !== "undefined" ? getToken() : null;
}

export function readApiUser(): ApiUser | null {
  if (typeof window === "undefined") return null;
  return getUser<ApiUser>();
}

export async function fetchCurrentCustomer(): Promise<ApiUser> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");
  return getCurrentUser(token);
}

export async function fetchCustomerOrders(): Promise<ApiOrder[]> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");
  return getCustomerOrders(token);
}

export async function registerCustomer(data: { name: string; email: string; phone?: string; password: string }): Promise<ApiUser> {
  const { token, user } = await register(data.email, data.password, data.name, data.phone);
  if (typeof window !== "undefined") {
    setAuthCookie(token.access_token, user);
  }
  return user;
}

export async function loginCustomer(email: string, password: string): Promise<ApiUser> {
  const { token, user } = await login(email, password);
  if (typeof window !== "undefined") {
    setAuthCookie(token.access_token, user);
  }
  return user;
}

export async function logoutCustomer(): Promise<void> {
  const token = readApiToken();
  if (token) {
    await logout(token);
  }
  if (typeof window !== "undefined") {
    clearAuthCookies();
  }
}

export async function updateCustomerProfile(updates: Partial<{ name: string; phone: string | null }>): Promise<ApiUser> {
  const token = readApiToken();
  if (!token) throw new Error("Not authenticated");
  return updateProfile(token, updates);
}

export type { AuthToken, ApiUser, ApiOrder };
