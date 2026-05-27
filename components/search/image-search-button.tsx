"use client";

import { products, services } from "@/lib/homepage-data";
import { ArrowRight, Camera, Image as ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ImageSearchButtonProps = {
  className?: string;
  label?: string;
  compact?: boolean;
};

export function ImageSearchButton({ className = "", compact = false, label = "Search by photo" }: ImageSearchButtonProps) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const suggestedProducts = products.slice(0, 3);
  const suggestedService = services[0];

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setFileName(file.name);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function clearImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <>
      <input ref={inputRef} accept="image/*" className="sr-only" onChange={handleFileChange} type="file" />
      <button
        className={
          className ||
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-sand-400 bg-sand-50 px-4 py-3 text-sm font-semibold text-ink-900 transition hover:border-brand-red hover:text-brand-red"
        }
        onClick={() => {
          setOpen(true);
          if (!previewUrl) inputRef.current?.click();
        }}
        title={label}
        type="button"
      >
        <Camera className="h-4 w-4" />
        {compact ? <span className="sr-only">{label}</span> : <span>{label}</span>}
      </button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[999] overflow-y-auto bg-black/45 px-4 py-6" role="dialog" aria-modal="true" aria-label="Search by photo">
          <div className="panel-shadow mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-sand-400 bg-white">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-sand-400 bg-white p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">Photo Search</p>
                <h2 className="mt-1 font-serif text-2xl leading-tight text-ink-900 md:text-3xl">Find matching materials from a photo.</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-ink-700">
                  Upload a room, fixture, ceiling, wall, or sample image. This UI uses mock matching until AI search is connected.
                </p>
              </div>
              <button className="rounded-md border border-sand-400 p-2 text-ink-900 transition hover:bg-sand-100" onClick={closeModal} type="button" aria-label="Close photo search">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid min-h-0 gap-6 overflow-y-auto p-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="grid content-start gap-4">
                <button
                  className="group grid min-h-72 place-items-center overflow-hidden rounded-lg border border-dashed border-sand-400 bg-sand-50 text-center transition hover:border-brand-red"
                  onClick={() => inputRef.current?.click()}
                  type="button"
                >
                  {previewUrl ? (
                    <img alt="Uploaded search reference" className="h-full max-h-[22rem] w-full object-cover" src={previewUrl} />
                  ) : (
                    <div className="p-8 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-brand-red" />
                      <h3 className="mt-4 font-serif text-2xl text-ink-900">Drop in a reference photo</h3>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-ink-700">Ceiling, wall, bathroom, cabinet, room, or material sample.</p>
                    </div>
                  )}
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="action-commerce flex-1" onClick={() => inputRef.current?.click()} type="button">
                    <Upload className="mr-2 h-4 w-4" />
                    {previewUrl ? "Change Photo" : "Upload Photo"}
                  </button>
                  {previewUrl ? (
                    <button className="action-secondary flex-1" onClick={clearImage} type="button">
                      Clear
                    </button>
                  ) : null}
                </div>

                {fileName ? <div className="rounded-md border border-sand-400 bg-sand-100 px-3 py-2 text-xs text-ink-700">Selected: {fileName}</div> : null}
              </div>

              <div className="grid content-start gap-5">
                <div>
                  <h3 className="font-serif text-2xl text-ink-900">Suggested matches</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-700">
                    These are example results for the UI prototype. A real image model can rank products after the backend is connected.
                  </p>

                  <div className="mt-4 grid gap-3">
                    {suggestedProducts.map((product) => (
                      <a key={product.id} className="grid gap-3 rounded-lg border border-sand-400 bg-white p-3 transition hover:border-brand-red sm:grid-cols-[72px_1fr_auto] sm:items-center" href={product.href}>
                        <img alt={product.name} className="h-20 w-full rounded-md object-cover sm:h-16 sm:w-16" src={product.imageUrl} />
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">{product.category}</div>
                          <div className="mt-1 font-semibold leading-5 text-ink-900">{product.name}</div>
                          <div className="mt-1 text-sm text-ink-700">${product.price.toFixed(2)} / {product.unit}</div>
                        </div>
                        <ArrowRight className="hidden h-4 w-4 text-brand-red sm:block" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 rounded-lg border border-sand-400 bg-sand-50 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">Recommended next step</div>
                    <div className="mt-1 font-serif text-2xl text-ink-900">{suggestedService?.title ?? "Project consultation"}</div>
                    <p className="mt-1 text-sm leading-6 text-ink-700">Send the photo with size and location for a material recommendation or quote.</p>
                  </div>
                  <a className="action-commerce" href="/contact?imageSearch=photo">
                    Request Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
            document.body
          )
        : null}
    </>
  );
}
