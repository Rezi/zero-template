"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const toggleVariants = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1",
    rounded: "2xl",
    fontSize: "sm",
    fontWeight: "medium",
    whiteSpace: "nowrap",
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    outline: "none",
    _hover: { bg: "muted", color: "foreground" },
    _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
    _disabled: { pointerEvents: "none", opacity: "0.5" },
    "&[aria-invalid='true']": { borderColor: "destructive", ringC: "destructive/20" },
    "&[aria-pressed='true']": { bg: "muted" },
    _dark: {
      "&[aria-invalid='true']": { ringC: "destructive/40" },
    },
    "& svg": { pointerEvents: "none", flexShrink: "0" },
    "& svg:not([class*='size-'])": { size: "4" },
  },
  variants: {
    variant: {
      default: { bg: "transparent" },
      outline: {
        borderWidth: "1px",
        borderColor: "input",
        bg: "transparent",
        _hover: { bg: "muted" },
      },
    },
    size: {
      default: {
        h: "8",
        minW: "8",
        px: "2.5",
        "&:has([data-icon=inline-end])": { pr: "2" },
        "&:has([data-icon=inline-start])": { pl: "2" },
      },
      sm: {
        h: "7",
        minW: "7",
        px: "2.5",
        "&:has([data-icon=inline-end])": { pr: "1.5" },
        "&:has([data-icon=inline-start])": { pl: "1.5" },
      },
      lg: {
        h: "9",
        minW: "9",
        px: "2.5",
        "&:has([data-icon=inline-end])": { pr: "2" },
        "&:has([data-icon=inline-start])": { pl: "2" },
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ToggleVariantProps = RecipeVariantProps<typeof toggleVariants>;

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & ToggleVariantProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn("group/toggle", toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
