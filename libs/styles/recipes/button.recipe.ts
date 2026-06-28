import { defineRecipe } from "./define-recipe";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "inline-flex",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    rounded: "2xl",
    borderWidth: "1px",
    borderColor: "transparent",
    borderStyle: "solid",
    backgroundClip: "padding-box",
    fontWeight: "medium",
    whiteSpace: "nowrap",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    outline: "none",
    userSelect: "none",
    _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
    // active:not-aria-[haspopup]:translate-y-px
    "&:active:not([aria-haspopup])": { transform: "translateY(1px)" },
    _disabled: { pointerEvents: "none", opacity: "0.5" },
    // aria-invalid:*
    "&[aria-invalid='true']": {
      borderColor: "destructive",
      ringW: "3",
      ringC: "destructive/20",
    },
    _dark: {
      "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
    },
    "& svg": { pointerEvents: "none", flexShrink: "0" },
    "& svg:not([class*='size-'])": { size: "4" },
  },
  variants: {
    variant: {
      default: {
        bg: "primary",
        color: "primary.foreground",
        _hover: { bg: "primary/80" },
      },
      outline: {
        borderColor: "border",
        bg: "background",
        _hover: { bg: "muted", color: "foreground" },
        "&[aria-expanded='true']": { bg: "muted", color: "foreground" },
        _dark: { bg: "transparent", _hover: { bg: "input/30" } },
      },
      secondary: {
        bg: "secondary",
        color: "secondary.foreground",
        _hover: { bg: "color-mix(in oklch, var(--secondary), var(--foreground) 5%)" },
        "&[aria-expanded='true']": { bg: "secondary", color: "secondary.foreground" },
      },
      ghost: {
        _hover: { bg: "muted", color: "foreground" },
        "&[aria-expanded='true']": { bg: "muted", color: "foreground" },
        _dark: { _hover: { bg: "muted/50" } },
      },
      transparent: {
        _hover: { bg: "transparent", color: "foreground" },
      },
      destructive: {
        bg: "destructive/10",
        color: "destructive",
        _hover: { bg: "destructive/20" },
        _focusVisible: { borderColor: "destructive/40", ringC: "destructive/20" },
        _dark: {
          bg: "destructive/20",
          _hover: { bg: "destructive/30" },
          _focusVisible: { ringC: "destructive/40" },
        },
      },
      link: {
        color: "primary",
        textUnderlineOffset: "4px",
        _hover: { textDecoration: "underline" },
      },
    },
    size: {
      default: {
        h: "8",
        gap: "1.5",
        px: "3",
        "&:has([data-icon='inline-end'])": { pr: "2.5" },
        "&:has([data-icon='inline-start'])": { pl: "2.5" },
      },
      xs: {
        h: "6",
        gap: "1",
        px: "2.5",
        fontSize: "xs",
        "&:has([data-icon='inline-end'])": { pr: "2" },
        "&:has([data-icon='inline-start'])": { pl: "2" },
        "& svg:not([class*='size-'])": { size: "3" },
      },
      sm: {
        h: "7",
        gap: "1",
        px: "3",
        fontSize: "sm",

        "&:has([data-icon='inline-end'])": { pr: "2" },
        "&:has([data-icon='inline-start'])": { pl: "2" },
      },
      lg: {
        h: "9",
        gap: "1.5",
        px: "4",
        "&:has([data-icon='inline-end'])": { pr: "3" },
        "&:has([data-icon='inline-start'])": { pl: "3" },
      },
      icon: { size: "8" },
      "icon-xs": { size: "6", "& svg:not([class*='size-'])": { size: "3" } },
      "icon-sm": { size: "7" },
      "icon-lg": { size: "9" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
