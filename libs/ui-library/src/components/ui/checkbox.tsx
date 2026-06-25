"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { CheckIcon } from "lucide-react";

const checkboxStyles = css({
  position: "relative",
  display: "flex",
  size: "4",
  flexShrink: "0",
  alignItems: "center",
  justifyContent: "center",
  rounded: "5px",
  borderWidth: "1px",
  borderColor: "transparent",
  bg: "input/90",
  transitionProperty: "box-shadow",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  outline: "none",
  "[data-slot='field'][data-disabled='true'] &": { opacity: "0.5" },
  "&::after": { content: '""', position: "absolute", insetInline: "-3", insetBlock: "-2" },
  _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
  _disabled: { cursor: "not-allowed", opacity: "0.5" },
  "&[aria-invalid='true']": {
    borderColor: "destructive",
    ringW: "3",
    ringC: "destructive/20",
  },
  "&[aria-invalid='true'][aria-checked='true']": { borderColor: "primary" },
  "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
    borderColor: "primary",
    bg: "primary",
    color: "primary.foreground",
  },
  _dark: {
    "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
    "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
      bg: "primary",
    },
  },
});

const checkboxIndicatorStyles = css({
  display: "grid",
  placeContent: "center",
  color: "current",
  transition: "none",
  "& > svg": { size: "3.5" },
});

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={clsx("peer", checkboxStyles, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkboxIndicatorStyles}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
