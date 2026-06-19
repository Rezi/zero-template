import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { Loader2Icon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(css({ width: '4', height: '4', animation: 'spin 1s linear infinite' }), className)}
      {...props}
    />
  );
}

export { Spinner };
