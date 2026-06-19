import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn(css({ position: "relative", aspectRatio: "var(--ratio)" }), className)}
      {...props}
    />
  );
}

export { AspectRatio };
