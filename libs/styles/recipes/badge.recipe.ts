import { defineRecipe } from "./define-recipe";

export const badgeRecipe = defineRecipe({
  className: "badge",
  base: {
    display: "inline-flex",
    h: "5",
    w: "fit",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    gap: "1",
    overflow: "hidden",
    rounded: "2xl",
    borderWidth: "1px",
    borderColor: "transparent",
    px: "2",
    py: "0.5",
    fontSize: "xs",
    fontWeight: "medium",
    whiteSpace: "nowrap",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/50" },
    "&:has([data-icon='inline-end'])": { pr: "1.5" },
    "&:has([data-icon='inline-start'])": { pl: "1.5" },
    "&[aria-invalid='true']": { borderColor: "destructive", ringC: "destructive/20" },
    _dark: { "&[aria-invalid='true']": { ringC: "destructive/40" } },
    "& > svg": { pointerEvents: "none", size: "3" },
  },
  variants: {
    variant: {
      default: {
        bg: "primary",
        color: "primary.foreground",
        "&:is(a):hover": { bg: "primary/80" },
      },
      secondary: {
        bg: "secondary",
        color: "secondary.foreground",
        "&:is(a):hover": { bg: "secondary/80" },
      },
      destructive: {
        bg: "destructive/10",
        color: "destructive",
        _focusVisible: { ringC: "destructive/20" },
        _dark: { bg: "destructive/20", _focusVisible: { ringC: "destructive/40" } },
        "&:is(a):hover": { bg: "destructive/20" },
      },
      outline: {
        borderColor: "border",
        color: "foreground",
        "&:is(a):hover": { bg: "muted", color: "muted.foreground" },
      },
      ghost: {
        _hover: { bg: "muted", color: "muted.foreground" },
        _dark: { _hover: { bg: "muted/50" } },
      },
      link: {
        color: "primary",
        textUnderlineOffset: "4px",
        _hover: { textDecoration: "underline" },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
