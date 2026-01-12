import { Suspense, useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Loading({ children, fallback }: LoadingProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <Spinner />
    </div>
  );

  return <Suspense fallback={fallback ?? defaultFallback}>{children}</Suspense>;
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Spinner />
        <p className="text-muted-foreground">Loading page...</p>
      </div>
    </div>
  );
}

export function ContentLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}

export function CardLoading() {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function ListLoading({ items = 3 }: { items?: number }) {
  // Stable keys – no index usage, no hydration bugs
  const keys = useMemo(
    () => Array.from({ length: items }, () => crypto.randomUUID()),
    [items],
  );

  return (
    <div className="space-y-3">
      {keys.map((key) => (
        <div key={key} className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
