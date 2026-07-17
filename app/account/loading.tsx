import { LoadingShell, Skeleton } from "@/components/ui/loading-skeleton";

export default function AccountLoading() {
  return (
    <LoadingShell label="Loading account">
      <div className="section-shell">
        <Skeleton className="mb-8 h-12 w-72 max-w-full" />
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <Skeleton className="h-80" />
          <div className="grid gap-5 sm:grid-cols-2"><Skeleton className="h-44" /><Skeleton className="h-44" /><Skeleton className="h-64 sm:col-span-2" /></div>
        </div>
      </div>
    </LoadingShell>
  );
}
