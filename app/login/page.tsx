import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Sign In | KMD Decor",
  description: "Sign in to your KMD Decor account"
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell min-h-screen bg-gradient-to-br from-sand-50 to-sand-100">
        <div className="section-shell">
          <div className="mb-8 flex items-center gap-3">
            <Link href="/" className="text-ink-700 transition hover:text-ink-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-sm text-ink-700">Back to home</span>
          </div>

          <div className="mx-auto max-w-md">
            <div className="rounded-lg border border-sand-400 bg-white p-8 shadow-sm">
              <h1 className="font-serif text-3xl text-ink-900">Welcome back</h1>
              <p className="mt-2 text-sm text-ink-700">Sign in to your account to continue</p>

              <div className="mt-8">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
