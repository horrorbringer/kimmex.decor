"use client";

import { getCatalogBrands } from "@/lib/api-browse";
import { richContentToText } from "@/lib/rich-content";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ApiBrand } from "@/lib/api-browse";

export function BrandsSection() {
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCatalogBrands().then((data) => {
      setBrands(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section id="brands" className="bg-sand-200/45">
        <div className="section-shell">
          <p className="eyebrow">Brands and Partners</p>
          <div className="surface-card grid gap-4 p-6 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-h-28 animate-pulse rounded-2xl border border-sand-400 bg-sand-50" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="brands" className="bg-sand-200/45">
      <div className="section-shell">
        <p className="eyebrow">Brands and Partners</p>
        <div className="surface-card grid gap-4 p-6 md:grid-cols-4">
          {brands.map((brand) => (
            <a
              key={brand.id}
              className="flex min-h-28 items-center justify-center rounded-2xl border border-sand-400 bg-sand-50 px-6 text-center font-serif text-2xl text-ink-900 transition hover:border-bronze-500 hover:text-bronze-500"
              href={brand.website_url || "/products?brand=" + brand.slug}
              title={richContentToText(brand.description) || brand.name}
            >
              {brand.logo_url ? (
                <Image alt={brand.name} width={128} height={64} loading="lazy" className="max-h-16 max-w-full object-contain" src={brand.logo_url} />
              ) : (
                brand.name
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
