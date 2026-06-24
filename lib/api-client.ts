const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

export function apiUrl(path: string): string {
  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(handler: () => void): void {
  onUnauthorized = handler;
}

export async function fetchJson<T>(path: string, options?: RequestInit & { timeout?: number }): Promise<T> {
  const timeoutMs = options?.timeout ?? 5000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const { timeout: _, ...fetchOptions } = options ?? {};

  const response = await fetch(apiUrl(path), {
    ...fetchOptions,
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout));

  if (!response.ok) {
    if (response.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
    throw new ApiError(errorData.message || `Request failed: ${response.status}`, response.status, errorData);
  }

  return response.json() as Promise<T>;
}
