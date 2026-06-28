import { defineSlotRecipe } from "./define-recipe";

export const kbdRecipe = defineSlotRecipe({
  className: "kbd",
  slots: ["root", "group"],
  base: {
    root: {
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
    },
    group: {
      display: "inline-flex",
      alignItems: "center",
      gap: "1",
    },
  },
});
