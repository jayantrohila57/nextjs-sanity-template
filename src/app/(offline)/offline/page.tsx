"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  const handleRetry = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="space-y-6 max-w-sm">
        <div className="text-5xl" role="img" aria-label="Offline">
          📡
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">You are offline</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t reach the network. Check your connection and try
            again.
          </p>
        </div>
        <Button className="w-full" onClick={handleRetry}>
          Retry Connection
        </Button>
      </div>
    </div>
  );
}
