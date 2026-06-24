import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/account", "/orders", "/checkout"];
const authPaths = ["/login", "/register"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("kmd_token")?.value;

  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (authPaths.some((p) => pathname === p)) {
    if (token) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/orders/:path*", "/checkout", "/login", "/register"],
};
