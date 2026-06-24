import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { Suspense } from "react";
import SearchPageClient from "./search-client";

export const metadata = {
  title: "Search",
  description: "Search KM Decor for interior materials, products, and services.",
};

export default function SearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell min-h-screen">
        <Suspense fallback={<div className="section-shell py-12 text-center">Loading search...</div>}>
          <SearchPageClient />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
