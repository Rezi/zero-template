import { defineSlotRecipe } from "./define-recipe";

export const progressRecipe = defineSlotRecipe({
  className: "progress",
  slots: ["root", "track", "indicator", "label", "value"],
  base: {
    root: { display: "flex", flexWrap: "wrap", gap: "3" },
    track: {
      position: "relative",
      display: "flex",
      h: "2",
      w: "full",
      alignItems: "center",
      overflowX: "hidden",
      rounded: "2xl",
      bg: "muted",
    },
    indicator: {
      h: "full",
      bg: "primary",
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
    },
    label: { fontSize: "sm", fontWeight: "medium" },
    value: {
      ml: "auto",
      fontSize: "sm",
      color: "muted.foreground",
      fontVariantNumeric: "tabular-nums",
    },
  },
});
