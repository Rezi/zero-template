import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(css({ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', borderRadius: '2xl', bg: 'muted' }), className)}
      {...props}
    />
  );
}

export { Skeleton };
