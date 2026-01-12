"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-destructive">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground max-w-md">
          {error.message ||
            "An unexpected error occurred while loading this page."}
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
