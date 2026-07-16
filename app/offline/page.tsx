import Link from "next/link";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";

export const metadata = {
  title: "Offline",
  description: "KM Decor is offline. Reconnect to continue browsing products and services.",
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader />
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          Offline
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
          Reconnect to continue with KM Decor.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Your device is offline. Previously visited pages may still open, but
          live product availability, quotes, account details, and checkout need
          an internet connection.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Back home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400"
          >
            Browse cached products
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
