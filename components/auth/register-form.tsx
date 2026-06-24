"use client";

import { createCustomerAccount } from "@/lib/api-auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { ApiError } from "@/lib/api-client";
import { formatCambodianPhone, isValidCambodianPhone } from "@/lib/phone";
import { useToast } from "@/components/ui/toast";

type FieldErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  phone?: string[];
};

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const { addToast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerificationNotice, setShowVerificationNotice] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const hasNumber = (str: string) => /\d/.test(str);
  const hasLetter = (str: string) => /[a-zA-Z]/.test(str);

  function validatePassword(pwd: string): string | null {
    if (pwd.length < 8) return "Password must be at least 8 characters";
    if (!hasNumber(pwd)) return "Password must contain at least one number";
    if (!hasLetter(pwd)) return "Password must contain at least one letter";
    return null;
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});

    if (password !== confirmPassword) {
      setFieldErrors({ password: ["Passwords do not match"] });
      addToast({ type: "error", title: "Error", message: "Passwords do not match" });
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setFieldErrors({ password: [pwdError] });
      addToast({ type: "error", title: "Error", message: pwdError });
      return;
    }

    setIsLoading(true);

    try {
      await createCustomerAccount(email, password, fullName, phone);
      addToast({ type: "success", title: "Account created!", message: "Welcome to KM Decor" });
      setShowVerificationNotice(true);
      onSuccess?.();
      setTimeout(() => router.push(`/login?email=${encodeURIComponent(email)}`), 3000);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        const errorData = err.data as { message?: string; errors?: FieldErrors } | undefined;
        if (errorData?.errors) {
          setFieldErrors(errorData.errors);
          addToast({ type: "error", title: "Registration failed", message: errorData.message || "Please fix the errors below" });
        } else {
          addToast({ type: "error", title: "Registration failed", message: err.message || "Registration failed" });
        }
      } else if (err instanceof Error) {
        addToast({ type: "error", title: "Registration failed", message: err.message });
      } else {
        addToast({ type: "error", title: "Registration failed", message: String(err) });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showVerificationNotice && (
        <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <Mail className="h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Check your email</p>
            <p className="mt-1">We've sent a verification link to <strong>{email}</strong>. Please verify your email address before signing in.</p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-ink-900">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => { setFullName(e.target.value); clearFieldError("name"); }}
          required
          className={`mt-1 w-full rounded-lg border bg-white px-4 py-2 text-ink-900 placeholder-ink-600 transition focus:border-brand-red focus:outline-none ${
            fieldErrors.name ? "border-red-400 focus:border-red-500" : "border-sand-400"
          }`}
          placeholder="John Doe"
          disabled={isLoading}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
        />
        {fieldErrors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
          required
          className={`mt-1 w-full rounded-lg border bg-white px-4 py-2 text-ink-900 placeholder-ink-600 transition focus:border-brand-red focus:outline-none ${
            fieldErrors.email ? "border-red-400 focus:border-red-500" : "border-sand-400"
          }`}
          placeholder="you@example.com"
          disabled={isLoading}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink-900">
          Phone (optional) <em className="font-normal text-ink-700">Cambodia</em>
        </label>
        <div className="relative mt-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-700">
            <Phone className="h-4 w-4" />
            <span className="ml-1 text-sm">+855</span>
          </span>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(formatCambodianPhone(e.target.value)); clearFieldError("phone"); }}
            className={`w-full rounded-lg border bg-white py-2 pl-20 pr-4 text-ink-900 placeholder-ink-600 transition focus:border-brand-red focus:outline-none ${
              fieldErrors.phone ? "border-red-400 focus:border-red-500" : "border-sand-400"
            } ${phone && isValidCambodianPhone(phone) ? "pr-10" : ""}`}
            placeholder="12 345 678"
            disabled={isLoading}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : "phone-hint"}
          />
          {phone && isValidCambodianPhone(phone) ? (
            <CheckCircle2 className="absolute inset-y-0 right-3 my-auto h-4 w-4 text-green-600" />
          ) : null}
        </div>
        {fieldErrors.phone ? (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.phone[0]}
          </p>
        ) : phone && !isValidCambodianPhone(phone) ? (
          <p id="phone-hint" className="mt-1 text-xs text-ink-700">
            Enter a valid 8 or 9 digit Cambodian number
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink-900">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
          required
          className={`mt-1 w-full rounded-lg border bg-white px-4 py-2 text-ink-900 placeholder-ink-600 transition focus:border-brand-red focus:outline-none ${
            fieldErrors.password ? "border-red-400 focus:border-red-500" : "border-sand-400"
          }`}
          placeholder="••••••••"
          disabled={isLoading}
          aria-invalid={!!fieldErrors.password}
          aria-describedby={fieldErrors.password ? "password-error" : "password-hint"}
        />
        {fieldErrors.password ? (
          <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.password[0]}
          </p>
        ) : (
          <p id="password-hint" className="mt-1 text-xs text-ink-700">
            At least 8 characters, 1 number, 1 letter
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink-900">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("password"); }}
          required
          className="mt-1 w-full rounded-lg border border-sand-400 bg-white px-4 py-2 text-ink-900 placeholder-ink-600 transition focus:border-brand-red focus:outline-none"
          placeholder="••••••••"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="action-primary w-full rounded-lg border-0 py-2 disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </button>

      <p className="text-center text-sm text-ink-700">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-red hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
