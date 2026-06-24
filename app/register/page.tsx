import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Create Account | KMD Decor",
  description: "Create a new KMD Decor account"
};

export default function RegisterPage() {
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
              <h1 className="font-serif text-3xl text-ink-900">Create an account</h1>
              <p className="mt-2 text-sm text-ink-700">Join us to start shopping</p>

              <div className="mt-8">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
