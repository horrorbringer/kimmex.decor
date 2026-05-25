"use client";

import { useState } from "react";

type ProductGalleryProps = {
  badge?: string;
  category: string;
  images: string[];
  productName: string;
};

export function ProductGallery({ badge, category, images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="surface-card overflow-hidden">
      <div className="relative">
        <img alt={productName} className="h-[460px] w-full object-cover" src={activeImage} />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="promo-chip">{category}</span>
          {badge ? (
            <span className="rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {images.slice(0, 3).map((imageUrl, index) => (
          <button
            key={imageUrl}
            className={`overflow-hidden rounded-lg border transition ${
              activeImage === imageUrl ? "border-bronze-500 ring-2 ring-[var(--focus-ring)]" : "border-sand-400 hover:border-bronze-500"
            }`}
            onClick={() => setActiveImage(imageUrl)}
            type="button"
          >
            <img alt={`${productName} gallery ${index + 1}`} className="h-24 w-full object-cover" src={imageUrl} />
          </button>
        ))}
      </div>
    </div>
  );
}
