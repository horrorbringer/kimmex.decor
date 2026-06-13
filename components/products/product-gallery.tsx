"use client";

import { ImageIcon } from "lucide-react";
import { useState } from "react";

type ProductGalleryProps = {
  badge?: string;
  category: string;
  images: string[];
  productName: string;
};

export function ProductGallery({ badge, category, images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleImages = images.slice(0, 4);
  const activeImage = visibleImages[activeIndex] ?? visibleImages[0];

  return (
    <div className="grid gap-3">
      <div className="relative overflow-hidden rounded-lg border border-sand-400 bg-sand-100 shadow-soft">
        <img alt={`${productName}, view ${activeIndex + 1}`} className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]" src={activeImage} />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-900 shadow-soft">
              {category}
            </span>
            {badge ? <span className="rounded-full bg-brand-red px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-soft">{badge}</span> : null}
          </div>
          <span className="flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <ImageIcon className="h-3.5 w-3.5" />
            {activeIndex + 1}/{visibleImages.length}
          </span>
        </div>
      </div>

      {visibleImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label={`${productName} image gallery`}>
          {visibleImages.map((imageUrl, index) => (
            <button
              key={`${imageUrl}-${index}`}
              aria-label={`Show ${productName} image ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`relative overflow-hidden rounded-md border bg-sand-100 transition ${
                activeIndex === index
                  ? "border-brand-red ring-2 ring-brand-red/15"
                  : "border-sand-400 opacity-75 hover:border-brand-red/50 hover:opacity-100"
              }`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <img alt="" className="aspect-[4/3] w-full object-cover" src={imageUrl} />
              {activeIndex === index ? <span className="absolute inset-x-2 bottom-1.5 h-0.5 rounded-full bg-brand-red" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
