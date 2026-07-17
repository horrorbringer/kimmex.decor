import { LoadingShell, SearchResultsSkeleton } from "@/components/ui/loading-skeleton";

export default function SearchLoading() {
  return <LoadingShell label="Loading search"><SearchResultsSkeleton /></LoadingShell>;
}
