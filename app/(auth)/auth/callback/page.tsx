"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    window.history.replaceState({}, "", "/auth/callback");

    if (error) {
      router.push(`/login?error=${error}`);
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        setAuth(token, user);
        router.push("/account");
      } catch {
        router.push("/login?error=invalid_callback");
      }
    } else {
      router.push("/login?error=missing_token");
    }
  }, [searchParams, router, setAuth]);

  return (
    <main className="content-shell flex min-h-[calc(100vh-73px)] items-center justify-center py-8">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
        <p className="text-ink-700">Completing sign in...</p>
      </div>
    </main>
  );
}
