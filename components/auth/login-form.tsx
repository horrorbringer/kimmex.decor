"use client";

import { login, socialLoginRedirect } from "@/lib/api-auth";
import { syncCustomerStorage } from "@/lib/api-customer-storage";
import { resendVerificationEmail } from "@/lib/api-email-verification";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import Link from "next/link";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [canResendVerification, setCanResendVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "1") {
      setSuccess("Email verified. You can sign in now.");
    } else if (params.get("registered") === "1") {
      setSuccess("Account created! Check your email to verify before signing in.");
    }
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const getRedirectUrl = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("redirect") || "/account";
    }
    return "/account";
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCanResendVerification(false);
    setIsLoading(true);

    try {
      const { token, user } = await login(email, password);
      setAuth(token.access_token, user);
      await syncCustomerStorage(token.access_token);
      onSuccess?.();
      router.push(getRedirectUrl());
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setError("Too many login attempts. Please wait a moment before trying again.");
        setCanResendVerification(false);
      } else if (err instanceof ApiError && err.status >= 500) {
        setError(err.message || "Server error. Please try again later.");
        setCanResendVerification(false);
      } else if (err instanceof TypeError) {
        setError("Could not connect to the server. Please check your connection.");
        setCanResendVerification(false);
      } else {
        const message = err instanceof Error ? err.message : "Login failed";
        setError(message);
        setCanResendVerification(message.toLowerCase().includes("verify your email"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendVerification() {
    setError("");
    setSuccess("");
    setIsResending(true);

    try {
      await resendVerificationEmail(email);
      setSuccess(`Verification email sent to ${email}. Check your inbox.`);
      setCanResendVerification(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setIsLoading(true);
    try {
      const { url } = await socialLoginRedirect("google");
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div aria-live="polite" className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
          {canResendVerification && (
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={isResending || !email}
              className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 disabled:opacity-60"
            >
              {isResending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              {isResending ? "Sending..." : "Resend verification email"}
            </button>
          )}
        </div>
      )}

      {success && (
        <div aria-live="polite" className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4" role="status">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-900">
          Email
        </label>
        <input
          id="email"
          autoComplete="email"
          autoFocus
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-field mt-1"
          placeholder="you@example.com"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink-900">
          Password
        </label>
        <div className="relative mt-1">
          <input
            id="password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-field pr-12"
            placeholder="Enter your password"
            disabled={isLoading}
          />
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink-700 transition hover:text-ink-900"
            onClick={() => setShowPassword((visible) => !visible)}
            tabIndex={-1}
            type="button"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <div className="mt-2 text-right">
          <Link href="/forgot-password" className="text-xs font-semibold text-brand-red hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="action-primary min-h-12 w-full rounded-lg border-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-sand-400" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-ink-700">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="action-secondary min-h-12 w-full rounded-lg border border-sand-400 bg-white flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Google</span>
      </button>

      <p className="text-center text-sm text-ink-700">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-brand-red hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
