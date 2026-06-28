import { defineSlotRecipe } from "./define-recipe";

export const tabsRecipe = defineSlotRecipe({
  className: "tabs",
  slots: ["root", "list", "trigger", "content"],
  base: {
    root: {
      display: "flex",
      gap: "2",
      "&[data-orientation='horizontal']": { flexDirection: "column" },
    },
    list: {
      display: "inline-flex",
      w: "fit",
      alignItems: "center",
      justifyContent: "center",
      rounded: "2xl",
      padding: "3px",
      color: "muted.foreground",
      "[data-slot='tabs'][data-orientation='horizontal'] &": { h: "8" },
      "[data-slot='tabs'][data-orientation='vertical'] &": {
        h: "fit",
        flexDirection: "column",
        p: "1",
      },
      "&[data-variant='line']": { rounded: "none" },
    },
    trigger: {
      position: "relative",
      display: "inline-flex",
      h: "calc(100% - 1px)",
      flex: "1",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5",
      rounded: "2xl",
      borderWidth: "1px",
      borderColor: "transparent!",
      px: "1.5",
      py: "0.5",
      fontSize: "sm",
      fontWeight: "medium",
      whiteSpace: "nowrap",
      color: "foreground/60",
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      _hover: { color: "foreground" },
      _focusVisible: {
        borderColor: "ring",
        ringW: "3",
        ringC: "ring/50",
        outlineWidth: "1px",
        outlineColor: "ring",
      },
      _disabled: { pointerEvents: "none", opacity: "0.5" },
      "&[aria-disabled='true']": { pointerEvents: "none", opacity: "0.5" },
      "& svg": { pointerEvents: "none", flexShrink: "0" },
      "& svg:not([class*='size-'])": { size: "4" },
      "[data-slot='tabs'][data-orientation='vertical'] &": {
        w: "full",
        justifyContent: "flex-start",
        px: "3",
        py: "0.5",
        "&::after": { insetBlock: "0", right: "-0.25rem", w: "0.5" },
      },
      "[data-slot='tabs'][data-orientation='horizontal'] &": {
        "&::after": { insetInline: "0", bottom: "-5px", h: "0.5" },
      },
      "&:where([data-state='active'], [data-active]:not([data-active='false']))": {
        bg: "background",
        color: "foreground",
      },
      "[data-slot='tabs-list'][data-variant='line'] &": {
        bg: "transparent",
        "&:where([data-state='active'], [data-active]:not([data-active='false']))": {
          bg: "transparent",
          _dark: { borderColor: "transparent", bg: "transparent" },
        },
        "&:where([data-state='active'], [data-active]:not([data-active='false']))::after": {
          opacity: "1",
        },
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bg: "foreground",
        opacity: "0",
        transitionProperty: "opacity",
      },
      _dark: {
        color: "muted.foreground",
        _hover: { color: "foreground" },
        "&:where([data-state='active'], [data-active]:not([data-active='false']))": {
          borderColor: "input",
          bg: "input/30",
          color: "foreground",
        },
      },
    },
    content: { flex: "1", fontSize: "sm", outline: "none" },
  },
  variants: {
    variant: {
      default: { list: { bg: "muted" } },
      line: { list: { gap: "1", bg: "transparent" } },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
