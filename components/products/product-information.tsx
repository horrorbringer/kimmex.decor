import { RichContent } from "@/components/content/rich-content";
import type { ProductItem } from "@/lib/homepage-data";
import { Check, ChevronDown } from "lucide-react";

export function ProductInformation({ product }: { product: ProductItem }) {
  const referenceDetails = [
    ["SKU", product.sku], ["Brand", product.brand], ["Category", product.category], ["Unit", product.unit],
  ];

  return (
    <section className="border-y border-sand-400 bg-sand-50">
      <div className="content-shell py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start xl:gap-16">
          <div>
            <p className="eyebrow">Product information</p>
            <h2 className="font-serif text-3xl leading-tight text-ink-900 md:text-4xl">What you need to know.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">{product.customerGoal || product.descriptor}</p>
            {product.descriptionHtml ? <RichContent className="mt-5 text-sm text-ink-700" html={product.descriptionHtml} /> : null}
            {product.keyFeatures.length > 0 ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {product.keyFeatures.slice(0, 4).map((feature) => (
                  <div className="flex items-start gap-3 text-sm leading-6 text-ink-900" key={feature}>
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-red/10 text-brand-red"><Check className="h-3 w-3" strokeWidth={2.5} /></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="overflow-hidden rounded-lg border border-sand-400 bg-white">
            <div className="grid grid-cols-2">
              {referenceDetails.map(([label, value]) => (
                <div className="border-b border-r border-sand-400 p-4 even:border-r-0" key={label}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">{label}</p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-ink-900">{value}</p>
                </div>
              ))}
            </div>
            <InformationDisclosure items={product.applications} title="Recommended uses" />
            <InformationDisclosure items={product.materialNotes} title="Before you order" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InformationDisclosure({ items, title }: { items: string[]; title: string }) {
  if (items.length === 0) return null;
  return (
    <details className="group border-t border-sand-400">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-ink-900 marker:hidden">
        {title}<ChevronDown className="h-4 w-4 shrink-0 text-ink-700 transition group-open:rotate-180" />
      </summary>
      <ul className="grid gap-2 border-t border-sand-400 bg-sand-50 px-4 py-4">
        {items.map((item) => <li className="text-sm leading-6 text-ink-700" key={item}>• {item}</li>)}
      </ul>
    </details>
  );
}
