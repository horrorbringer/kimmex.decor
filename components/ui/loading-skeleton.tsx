import type { ReactNode } from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`rounded-lg bg-sand-200 ${className}`} />;
}

export function LoadingShell({ children, label = "Loading page" }: { children: ReactNode; label?: string }) {
  return (
    <div aria-busy="true" aria-label={label} className="min-h-screen animate-pulse bg-sand-50" role="status">
      <div className="h-[71px] border-b border-sand-400 bg-white/90" />
      {children}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function DetailPageSkeleton({ label = "Loading details" }: { label?: string }) {
  return (
    <LoadingShell label={label}>
      <div className="content-shell py-8 lg:py-12">
        <Skeleton className="mb-8 h-5 w-44" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-14 w-4/5 md:h-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-3 pt-3">
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          <Skeleton className="min-h-[360px] w-full md:min-h-[540px]" />
        </div>
      </div>
    </LoadingShell>
  );
}

export function ProductRowsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div className="overflow-hidden rounded-lg border border-sand-400 bg-white" key={index}>
          <Skeleton className="h-52 rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <LoadingShell label="Loading order details">
      <div className="section-shell">
        <div className="mb-8 flex items-center gap-4">
          <Skeleton className="h-11 w-11 rounded-full" />
          <div className="flex-1 space-y-3"><Skeleton className="h-8 w-52" /><Skeleton className="h-4 w-40" /></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div className="grid gap-6">
            {[0, 1, 2].map((item) => <Skeleton className={item === 0 ? "h-64" : "h-44"} key={item} />)}
          </div>
          <Skeleton className="h-80" />
        </div>
      </div>
    </LoadingShell>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading search results" className="section-shell animate-pulse" role="status">
      <Skeleton className="mb-5 h-5 w-24" />
      <Skeleton className="mb-8 h-12 w-72 max-w-full" />
      <Skeleton className="mb-8 h-20 w-full" />
      <ProductRowsSkeleton count={6} />
      <span className="sr-only">Loading search results</span>
    </div>
  );
}
