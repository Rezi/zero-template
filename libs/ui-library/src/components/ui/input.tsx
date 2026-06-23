import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const inputStyles = css({
  h: "8",
  w: "full",
  minW: "0",
  rounded: "2xl",
  borderWidth: "1px",
  borderColor: "transparent",
  bg: "input/50",
  px: "2.5",
  py: "1",
  fontSize: "1rem",
  transitionProperty: "color, box-shadow",
  transitionDuration: "200ms",
  outline: "none",
  // file:*
  "&::file-selector-button": {
    display: "inline-flex",
    h: "6",
    borderWidth: "0",
    bg: "transparent",
    fontSize: "sm",
    fontWeight: "medium",
    color: "foreground",
  },
  _placeholder: { color: "muted.foreground" },
  _focusVisible: { borderColor: "ring", ringWidth: "3", ringColor: "ring/30" },
  _disabled: { pointerEvents: "none", cursor: "not-allowed", opacity: "0.5" },
  "&[aria-invalid='true']": {
    borderColor: "destructive",
    ringWidth: "3",
    ringColor: "destructive/20",
  },
  md: { fontSize: "sm" },
  _dark: {
    "&[aria-invalid='true']": { borderColor: "destructive/50", ringColor: "destructive/40" },
  },
});

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputStyles, className)}
      {...props}
    />
  );
}

export { Input };
