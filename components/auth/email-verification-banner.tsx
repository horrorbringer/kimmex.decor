"use client";

import { resendVerificationEmail } from "@/lib/api-email-verification";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type EmailVerificationBannerProps = {
  isVerified: boolean;
  email: string;
};

export function EmailVerificationBanner({ isVerified, email }: EmailVerificationBannerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  if (isVerified) {
    return (
      <div className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
        <div className="flex-1">
          <p className="font-medium text-green-900">Email verified</p>
          <p className="text-sm text-green-800">{email}</p>
        </div>
      </div>
    );
  }

  const handleResend = async () => {
    setError("");
    setIsLoading(true);

    try {
      await resendVerificationEmail(email);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend verification email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
      <AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-orange-900">Email not verified</p>
        <p className="text-sm text-orange-800">Verify your email to unlock all features</p>

        {error && (
          <p className="mt-2 text-xs text-red-700">{error}</p>
        )}

        {isSent && (
          <p className="mt-2 text-xs text-green-700 font-medium">
            Verification email sent to {email}. Check your inbox!
          </p>
        )}

        <button
          onClick={handleResend}
          disabled={isLoading || isSent}
          className="mt-3 text-sm font-semibold text-orange-700 hover:text-orange-900 disabled:opacity-60 transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1 inline h-3 w-3 animate-spin" />
              Sending...
            </>
          ) : isSent ? (
            "Email sent"
          ) : (
            "Resend verification email"
          )}
        </button>
      </div>
    </div>
  );
}
