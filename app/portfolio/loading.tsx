import { LoadingShell, ProductRowsSkeleton, Skeleton } from "@/components/ui/loading-skeleton";

export default function PortfolioLoading() {
  return (
    <LoadingShell label="Loading portfolio">
      <Skeleton className="h-[520px] rounded-none md:h-[640px]" />
      <div className="section-shell">
        <Skeleton className="mb-4 h-5 w-32" />
        <Skeleton className="mb-8 h-12 w-[520px] max-w-full" />
        <ProductRowsSkeleton count={3} />
      </div>
    </LoadingShell>
  );
}
