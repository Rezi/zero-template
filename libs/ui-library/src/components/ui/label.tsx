"use client";

import * as React from "react";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        css({
          display: "flex",
          alignItems: "center",
          gap: "2",
          fontSize: "sm",
          lineHeight: "none",
          fontWeight: "medium",
          userSelect: "none",
          '.group[data-disabled="true"] &': {
            pointerEvents: "none",
            opacity: 0.5,
          },
          _peerDisabled: {
            cursor: "not-allowed",
            opacity: 0.5,
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Label };
