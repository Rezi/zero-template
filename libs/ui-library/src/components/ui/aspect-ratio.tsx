import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const aspectRatioStyles = css({ position: "relative", aspectRatio: "var(--ratio)" });

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
      className={cn(aspectRatioStyles, className)}
      {...props}
    />
  );
}

export { AspectRatio };
