"use client";

import { verifyEmailWithLink } from "@/lib/api-email-verification";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type VerifyEmailPageProps = {
  params: Promise<{
    userId: string;
    hash: string;
  }>;
};

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [resolvedParams, setResolvedParams] = useState<{ userId: string; hash: string } | null>(null);

  useEffect(() => {
    (async () => {
      const p = await params;
      setResolvedParams(p);
    })();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const verifyEmail = async () => {
      try {
        const signedQuery = searchParams.toString() ? `?${searchParams.toString()}` : "";
        await verifyEmailWithLink(resolvedParams.userId, resolvedParams.hash, signedQuery);
        setStatus("success");
        setMessage("Email verified successfully!");

        setTimeout(() => {
          router.push("/login?verified=1");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to verify email. The link may have expired."
        );
      }
    };

    verifyEmail();
  }, [resolvedParams, router, searchParams]);

  return (
    <>
      <SiteHeader />
      <main className="page-shell min-h-screen bg-gradient-to-br from-sand-50 to-sand-100">
        <div className="section-shell">
          <div className="mx-auto max-w-md py-24">
            {status === "loading" && (
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-brand-red mx-auto mb-4" />
                <h1 className="font-serif text-2xl text-ink-900">Verifying email...</h1>
                <p className="mt-2 text-ink-700">Please wait while we verify your email address.</p>
              </div>
            )}

            {status === "success" && (
              <div className="text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h1 className="font-serif text-3xl text-ink-900">Email Verified!</h1>
                <p className="mt-3 text-ink-700">{message}</p>
                <p className="mt-2 text-sm text-ink-700">Redirecting to login...</p>
                <Link href="/login" className="action-primary mt-6 inline-block">
                  Go to Login
                </Link>
              </div>
            )}

            {status === "error" && (
              <div className="text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-red-100 text-red-600 mx-auto mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h1 className="font-serif text-3xl text-ink-900">Verification Failed</h1>
                <p className="mt-3 text-ink-700">{message}</p>
                <div className="mt-6 space-y-3">
                  <Link href="/login" className="action-primary block">
                    Back to Login
                  </Link>
                  <Link href="/contact" className="action-secondary block">
                    Contact Support
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
