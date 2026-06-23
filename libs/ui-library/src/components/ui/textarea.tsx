import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const textareaStyles = css({
  display: "flex",
  fieldSizing: "content",
  minH: "16",
  w: "full",
  resize: "none",
  rounded: "2xl",
  borderWidth: "1px",
  borderColor: "transparent",
  bg: "input/50",
  px: "2.5",
  py: "2",
  fontSize: "1rem",
  transitionProperty: "color, box-shadow",
  transitionDuration: "200ms",
  outline: "none",
  _placeholder: { color: "muted.foreground" },
  _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
  _disabled: { cursor: "not-allowed", opacity: "0.5" },
  "&[aria-invalid='true']": {
    borderColor: "destructive",
    ringW: "3",
    ringC: "destructive/20",
  },
  md: { fontSize: "sm" },
  _dark: {
    "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
  },
});

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(textareaStyles, className)} {...props} />;
}

export { Textarea };
