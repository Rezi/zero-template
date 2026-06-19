import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const badgeVariants = cva({
  base: {
    display: "inline-flex",
    height: "5",
    width: "fit-content",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: "1",
    overflow: "hidden",
    borderRadius: "2xl",
    borderWidth: "1px",
    borderColor: "transparent",
    px: "2",
    py: "0.5",
    fontSize: "xs",
    fontWeight: "medium",
    whiteSpace: "nowrap",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    _focusVisible: {
      borderColor: "ring",
      boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent)",
    },
    "&:has([data-icon='inline-end'])": {
      pr: "1.5",
    },
    "&:has([data-icon='inline-start'])": {
      pl: "1.5",
    },
    _ariaInvalid: {
      borderColor: "destructive",
      boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
    },
    _dark: {
      _ariaInvalid: {
        boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
      },
    },
    "& > svg": {
      pointerEvents: "none",
      width: "3 !important",
      height: "3 !important",
    },
  },
  variants: {
    variant: {
      default: {
        bg: "primary",
        color: "primary-foreground",
        "a &": {
          _hover: { bg: "primary/80" },
        },
      },
      secondary: {
        bg: "secondary",
        color: "secondary-foreground",
        "a &": {
          _hover: { bg: "secondary/80" },
        },
      },
      destructive: {
        bg: "destructive/10",
        color: "destructive",
        _focusVisible: {
          boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
        },
        _dark: {
          bg: "destructive/20",
          _focusVisible: {
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
          },
        },
        "a &": {
          _hover: { bg: "destructive/20" },
        },
      },
      outline: {
        borderColor: "border",
        color: "foreground",
        "a &": {
          _hover: { bg: "muted", color: "muted-foreground" },
        },
      },
      ghost: {
        _hover: {
          bg: "muted",
          color: "muted-foreground",
        },
        _dark: {
          _hover: { bg: "muted/50" },
        },
      },
      link: {
        color: "primary",
        textUnderlineOffset: "4px",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & RecipeVariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
