import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <output aria-live="polite" aria-label="Loading">
      <Loader2Icon
        {...props}
        className={cn("size-4 animate-spin", className)}
      />
    </output>
  );
}

export { Spinner };
