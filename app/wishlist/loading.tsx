import { LoadingShell, ProductRowsSkeleton, Skeleton } from "@/components/ui/loading-skeleton";

export default function WishlistLoading() {
  return (
    <LoadingShell label="Loading wishlist">
      <div className="section-shell">
        <Skeleton className="mb-4 h-5 w-24" />
        <Skeleton className="mb-8 h-12 w-72 max-w-full" />
        <Skeleton className="mb-6 h-20 w-full" />
        <ProductRowsSkeleton count={3} />
      </div>
    </LoadingShell>
  );
}
