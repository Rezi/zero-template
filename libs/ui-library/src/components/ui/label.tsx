"use client";

import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const labelStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
  fontSize: "sm",
  lineHeight: "none",
  fontWeight: "medium",
  userSelect: "none",
  // group-data-[disabled=true]:*
  ".group[data-disabled='true'] &": { pointerEvents: "none", opacity: "0.5" },
  // peer-disabled:*
  ".peer:disabled ~ &": { cursor: "not-allowed", opacity: "0.5" },
});

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label data-slot="label" className={clsx(labelStyles, className)} {...props} />;
}

export { Label };
