"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    // global-error must include html and body tags
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-destructive">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground max-w-md">
            A critical error occurred. Please refresh the page or contact
            support if the problem persists.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
