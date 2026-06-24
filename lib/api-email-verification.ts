import { fetchJson } from "@/lib/api-client";

type VerificationResponse = {
  success: boolean;
  message: string;
};

/**
 * Verify email with signed link from email
 */
export async function verifyEmailWithLink(userId: string, hash: string, signedQuery = ""): Promise<void> {
  await fetchJson<VerificationResponse>(`/email/verify/${userId}/${hash}${signedQuery}`, {
    method: "GET"
  });
}

/**
 * Resend verification email for a customer email address
 */
export async function resendVerificationEmail(email: string): Promise<void> {
  await fetchJson<VerificationResponse>("/email/verification-notification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  await fetchJson<VerificationResponse>("/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
}

/**
 * Reset password with token
 */
export async function resetPassword(
  email: string,
  password: string,
  passwordConfirmation: string,
  token: string
): Promise<void> {
  await fetchJson<VerificationResponse>("/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      password_confirmation: passwordConfirmation,
      token
    })
  });
}

export type { VerificationResponse };
