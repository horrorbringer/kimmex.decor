import Cookies from "js-cookie";

const COOKIE_KEYS = {
  TOKEN: "kmd_token",
  USER: "kmd_user",
} as const;

const isProd = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
  secure: isProd,
  sameSite: "lax",
  expires: 7,
};

export function setAuthCookie(token: string, user: unknown): void {
  Cookies.set(COOKIE_KEYS.TOKEN, token, COOKIE_OPTIONS);
  Cookies.set(COOKIE_KEYS.USER, JSON.stringify(user), {
    ...COOKIE_OPTIONS,
    expires: 7,
  });
}

export function getToken(): string | null {
  return Cookies.get(COOKIE_KEYS.TOKEN) ?? null;
}

export function getUser<T = unknown>(): T | null {
  const raw = Cookies.get(COOKIE_KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    Cookies.remove(COOKIE_KEYS.USER, { path: "/" });
    return null;
  }
}

export function clearAuthCookies(): void {
  Cookies.remove(COOKIE_KEYS.TOKEN, { path: "/" });
  Cookies.remove(COOKIE_KEYS.USER, { path: "/" });
}
