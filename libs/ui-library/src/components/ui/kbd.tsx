import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const kbdStyles = css({
  pointerEvents: "none",
  display: "inline-flex",
  h: "5",
  w: "fit",
  minW: "5",
  alignItems: "center",
  justifyContent: "center",
  gap: "1",
  rounded: "lg",
  bg: "muted",
  px: "1",
  fontFamily: "var(--font-sans)",
  fontSize: "xs",
  fontWeight: "medium",
  color: "muted.foreground",
  userSelect: "none",
  "[data-slot='input-group'] &": { bg: "input" },
  "[data-slot='tooltip-content'] &": {
    bg: "background/20",
    color: "background",
    _dark: { bg: "background/10" },
  },
  "& svg:not([class*='size-'])": { size: "3" },
});

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" className={cn(kbdStyles, className)} {...props} />;
}

const kbdGroupStyles = css({ display: "inline-flex", alignItems: "center", gap: "1" });

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <kbd data-slot="kbd-group" className={cn(kbdGroupStyles, className)} {...props} />;
}

export { Kbd, KbdGroup };
