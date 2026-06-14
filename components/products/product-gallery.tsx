"use client";

import { ChevronLeft, ChevronRight, ImageOff, Ruler, X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";

type ProductGalleryProps = {
  badge?: string;
  category: string;
  images: string[];
  productName: string;
  sku: string;
  specs: string[];
};

type GalleryView = {
  label: string;
  imageUrl?: string;
  mode: "product" | "detail" | "specifications" | "installed" | "gallery";
};

export function ProductGallery({ badge, category, images, productName, sku, specs }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const usableImages = images.filter(Boolean);
  const primaryImage = usableImages[0];
  const detailImage = usableImages[1] ?? primaryImage;
  const installedImage = usableImages[2] ?? usableImages[1] ?? primaryImage;
  const additionalViews: GalleryView[] = usableImages.slice(3).map((imageUrl, index) => ({
    label: `Gallery ${index + 1}`,
    imageUrl,
    mode: "gallery"
  }));
  const views: GalleryView[] = [
    { label: "Product", imageUrl: primaryImage, mode: "product" },
    { label: "Detail", imageUrl: detailImage, mode: "detail" },
    { label: "Specifications", mode: "specifications" },
    { label: "Installed", imageUrl: installedImage, mode: "installed" },
    ...additionalViews
  ];
  const thumbnailViews = views.slice(0, 4);
  const additionalCount = Math.max(views.length - thumbnailViews.length, 0);
  const activeView = views[activeIndex];

  useEffect(() => {
    if (!zoomOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomOpen(false);
      if (event.key === "ArrowLeft") setActiveIndex((current) => (current - 1 + views.length) % views.length);
      if (event.key === "ArrowRight") setActiveIndex((current) => (current + 1) % views.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [zoomOpen, views.length]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + views.length) % views.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % views.length);
  const markImageFailed = (imageUrl?: string) => {
    if (imageUrl && !failedImages.includes(imageUrl)) setFailedImages((current) => [...current, imageUrl]);
  };

  return (
    <div className="grid min-w-0 gap-3">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-sand-400 bg-white shadow-soft">
        <GalleryVisual
          failed={Boolean(activeView.imageUrl && failedImages.includes(activeView.imageUrl))}
          onError={() => markImageFailed(activeView.imageUrl)}
          productName={productName}
          sku={sku}
          specs={specs}
          view={activeView}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-900 shadow-soft">
              {category}
            </span>
            {badge ? <span className="rounded-full bg-brand-red px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-soft">{badge}</span> : null}
          </div>
          <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {activeIndex + 1}/{views.length}
          </span>
        </div>

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-4 sm:bottom-4">
          <span className="rounded-md bg-white/95 px-3 py-2 text-xs font-semibold text-ink-900 shadow-soft">{activeView.label}</span>
          <button
            aria-label={`Enlarge ${activeView.label.toLowerCase()} view`}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink-900 shadow-soft transition hover:bg-sand-100"
            onClick={() => setZoomOpen(true)}
            title="View fullscreen"
            type="button"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>

        <GalleryArrow direction="previous" onClick={showPrevious} />
        <GalleryArrow direction="next" onClick={showNext} />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label={`${productName} image gallery`}>
        {thumbnailViews.map((view, index) => {
          const showsAdditionalCount = index === thumbnailViews.length - 1 && additionalCount > 0;

          return (
          <button
            key={`${view.label}-${index}`}
            aria-label={showsAdditionalCount ? `Open ${additionalCount} more views of ${productName}` : `Show ${view.label.toLowerCase()} view of ${productName}`}
            aria-pressed={activeIndex === index}
            className={`min-w-0 overflow-hidden rounded-md border bg-white text-left transition ${
              activeIndex === index
                ? "border-brand-red ring-2 ring-brand-red/15"
                : "border-sand-400 opacity-80 hover:border-brand-red/50 hover:opacity-100"
            }`}
            onClick={() => {
              setActiveIndex(showsAdditionalCount ? thumbnailViews.length : index);
              if (showsAdditionalCount) setZoomOpen(true);
            }}
            type="button"
          >
            <div className="relative aspect-square overflow-hidden bg-white">
              <GalleryVisual
                compact
                failed={Boolean(view.imageUrl && failedImages.includes(view.imageUrl))}
                onError={() => markImageFailed(view.imageUrl)}
                productName={productName}
                sku={sku}
                specs={specs}
                view={view}
              />
              {showsAdditionalCount ? (
                <span className="absolute inset-0 grid place-items-center bg-black/60 text-lg font-semibold text-white backdrop-blur-[1px]">
                  +{additionalCount}
                </span>
              ) : null}
            </div>
            <span className="block truncate border-t border-sand-400 px-2 py-2 text-[10px] font-semibold text-ink-700 sm:text-xs">
              {showsAdditionalCount ? `${additionalCount} more` : view.label}
            </span>
          </button>
          );
        })}
      </div>

      {zoomOpen ? (
        <div
          aria-label={`${productName} fullscreen gallery`}
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-3 backdrop-blur-sm sm:p-8"
          onClick={() => setZoomOpen(false)}
          role="dialog"
        >
          <button
            aria-label="Close fullscreen gallery"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink-900 transition hover:bg-sand-100"
            onClick={() => setZoomOpen(false)}
            title="Close"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative aspect-square w-full max-w-[min(86vh,960px)] overflow-hidden rounded-lg bg-white" onClick={(event) => event.stopPropagation()}>
            <GalleryVisual
              failed={Boolean(activeView.imageUrl && failedImages.includes(activeView.imageUrl))}
              onError={() => markImageFailed(activeView.imageUrl)}
              productName={productName}
              sku={sku}
              specs={specs}
              view={activeView}
            />
            <GalleryArrow direction="previous" onClick={showPrevious} />
            <GalleryArrow direction="next" onClick={showNext} />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-black/70 px-3 py-2 text-xs font-semibold text-white">{activeView.label}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function GalleryVisual({ compact = false, failed, onError, productName, sku, specs, view }: {
  compact?: boolean;
  failed: boolean;
  onError: () => void;
  productName: string;
  sku: string;
  specs: string[];
  view: GalleryView;
}) {
  if (view.mode === "specifications") {
    return (
      <div className={`flex h-full w-full flex-col justify-center bg-sand-50 ${compact ? "p-3" : "p-8 sm:p-12"}`}>
        <Ruler className={`${compact ? "h-5 w-5" : "h-9 w-9"} text-brand-red`} />
        {!compact ? <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Product specification</p> : null}
        <p className={`${compact ? "mt-2 line-clamp-2 text-xs" : "mt-2 font-serif text-3xl sm:text-4xl"} leading-tight text-ink-900`}>{productName}</p>
        {!compact ? (
          <div className="mt-7 grid gap-3 border-t border-sand-400 pt-5 sm:grid-cols-2">
            <SpecLine label="SKU" value={sku} />
            {specs.slice(0, 3).map((spec, index) => <SpecLine key={spec} label={`Detail ${index + 1}`} value={spec} />)}
          </div>
        ) : null}
      </div>
    );
  }

  if (!view.imageUrl || failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-sand-50 p-5 text-center text-ink-700">
        <div>
          <ImageOff className="mx-auto h-7 w-7 text-brand-red" />
          {!compact ? <p className="mt-3 text-sm font-semibold">Image temporarily unavailable</p> : null}
        </div>
      </div>
    );
  }

  return (
    <img
      alt={`${productName}, ${view.label.toLowerCase()} view`}
      className={`h-full w-full ${view.mode === "installed" ? "object-cover" : "object-contain"} ${compact ? "p-1" : "p-5 sm:p-8"}`}
      onError={onError}
      src={view.imageUrl}
    />
  );
}

function GalleryArrow({ direction, onClick }: { direction: "previous" | "next"; onClick: () => void }) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
  return (
    <button
      aria-label={`${direction === "previous" ? "Previous" : "Next"} product view`}
      className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink-900 shadow-soft transition hover:bg-white ${direction === "previous" ? "left-3" : "right-3"}`}
      onClick={onClick}
      title={direction === "previous" ? "Previous image" : "Next image"}
      type="button"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-700">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink-900">{value}</p>
    </div>
  );
}
