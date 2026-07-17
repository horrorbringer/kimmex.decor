"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, Eye, EyeOff, Loader2, Phone } from "lucide-react";
import { ApiError } from "@/lib/api-client";
import { register } from "@/lib/api-auth";
import { syncCustomerStorage } from "@/lib/api-customer-storage";
import { setAuthCookie } from "@/lib/cookies";
import { formatCambodianPhone, isValidCambodianPhone } from "@/lib/phone";

type FieldErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  phone?: string[];
};

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const passwordChecks = {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  };
  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setFieldErrors({ password: ["Passwords do not match"] });
      setErrorMsg("Passwords do not match");
      return;
    }

    if (!passwordValid) {
      setFieldErrors({ password: ["Use at least 8 characters with a letter and number"] });
      setErrorMsg("Please create a stronger password");
      return;
    }

    if (phone && !isValidCambodianPhone(phone)) {
      setFieldErrors({ phone: ["Enter a valid Cambodian phone number"] });
      setErrorMsg("Please check your phone number");
      return;
    }

    setIsLoading(true);

    try {
      const { token, user } = await register(email, password, fullName, phone || undefined);

      if (token && user) {
        setAuthCookie(token.access_token, user);
        await syncCustomerStorage(token.access_token);
        setSuccessMsg("Account created! Redirecting...");
        onSuccess?.();
        window.location.href = "/account";
      } else {
        setSuccessMsg("Account created! Please check your email to verify before signing in.");
        onSuccess?.();
      }
    } catch (err: unknown) {
      console.error("[RegisterForm] Unexpected error:", err);
      if (err instanceof ApiError) {
        const data = err.data as { errors?: FieldErrors; message?: string } | undefined;
        if (err.status === 422 && data?.errors) {
          setFieldErrors(data.errors);
          setErrorMsg(data.message || "Please fix the errors below");
        } else {
          setErrorMsg(err.message || "Something went wrong. Please try again.");
        }
      } else if (err instanceof TypeError) {
        setErrorMsg("Could not connect to the server. Check your internet connection.");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (successMsg) {
    return (
      <div aria-live="polite" className="rounded-lg border border-green-200 bg-green-50 p-6 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />
        <p className="font-semibold text-green-800">{successMsg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div aria-live="polite" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="reg-fullName" className="block text-sm font-medium text-ink-900">
          Full Name
        </label>
        <input
          id="reg-fullName"
          autoComplete="name"
          autoFocus
          type="text"
          value={fullName}
          onChange={(e) => { setFullName(e.target.value); clearFieldError("name"); }}
          required
          className={`form-field mt-1 ${fieldErrors.name ? "is-error" : ""}`}
          placeholder="John Doe"
          disabled={isLoading}
        />
        {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-ink-900">
          Email
        </label>
        <input
          id="reg-email"
          autoComplete="email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
          required
          className={`form-field mt-1 ${fieldErrors.email ? "is-error" : ""}`}
          placeholder="you@example.com"
          disabled={isLoading}
        />
        {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="reg-phone" className="block text-sm font-medium text-ink-900">
          Phone (optional) <em className="font-normal text-ink-700">Cambodia</em>
        </label>
        <div className="relative mt-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-700">
            <Phone className="h-4 w-4" />
            <span className="ml-1 text-sm">+855</span>
          </span>
          <input
            id="reg-phone"
            autoComplete="tel-national"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(formatCambodianPhone(e.target.value)); clearFieldError("phone"); }}
            className={`form-field py-2 pl-20 pr-4 ${fieldErrors.phone ? "is-error" : ""}`}
            placeholder="12 345 678"
            disabled={isLoading}
          />
          {phone && isValidCambodianPhone(phone) && (
            <CheckCircle2 className="absolute inset-y-0 right-3 my-auto h-4 w-4 text-green-600" />
          )}
        </div>
        {fieldErrors.phone && <p className="mt-1 text-sm text-red-600">{fieldErrors.phone[0]}</p>}
        {phone && !isValidCambodianPhone(phone) && !fieldErrors.phone && (
          <p className="mt-1 text-xs text-ink-700">Enter a valid 8 or 9 digit Cambodian number</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-ink-900">Password</label>
          <div className="relative mt-1">
            <input
              id="reg-password"
              autoComplete="new-password"
              type={showPasswords ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
              required
              className={`form-field pr-12 ${fieldErrors.password ? "is-error" : ""}`}
              placeholder="Create password"
              disabled={isLoading}
            />
            <button aria-label={showPasswords ? "Hide passwords" : "Show passwords"} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink-700" onClick={() => setShowPasswords((visible) => !visible)} tabIndex={-1} type="button">
              {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="reg-confirmPassword" className="block text-sm font-medium text-ink-900">Confirm password</label>
          <input
            id="reg-confirmPassword"
            autoComplete="new-password"
            type={showPasswords ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`form-field mt-1 ${confirmPassword && !passwordsMatch ? "is-error" : ""}`}
            placeholder="Repeat password"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] font-medium">
        <PasswordRule met={passwordChecks.length} label="8+ characters" />
        <PasswordRule met={passwordChecks.letter} label="One letter" />
        <PasswordRule met={passwordChecks.number} label="One number" />
      </div>
      {fieldErrors.password ? <p className="-mt-3 text-sm text-red-600">{fieldErrors.password[0]}</p> : null}
      {confirmPassword ? <p className={`-mt-3 text-xs ${passwordsMatch ? "text-green-700" : "text-red-600"}`}>{passwordsMatch ? "Passwords match" : "Passwords do not match"}</p> : null}

      <button
        type="submit"
        disabled={isLoading}
        className="action-primary min-h-12 w-full rounded-lg border-0 disabled:cursor-not-allowed disabled:opacity-60"
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

function PasswordRule({ label, met }: { label: string; met: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-md px-2 py-2 ${met ? "bg-green-50 text-green-700" : "bg-sand-100 text-ink-700"}`}>
      <Check className="h-3 w-3 shrink-0" /> {label}
    </span>
  );
}
