import { defineSlotRecipe } from "./define-recipe";

export const scrollAreaRecipe = defineSlotRecipe({
  className: "scroll-area",
  slots: ["root", "viewport", "scrollbar", "thumb"],
  base: {
    root: { position: "relative" },
    viewport: {
      size: "full",
      borderRadius: "inherit",
      transitionProperty: "color, box-shadow",
      outline: "none",
      _focusVisible: { ringW: "3", ringC: "ring/50", outlineWidth: "1px" },
    },
    scrollbar: {
      display: "flex",
      touchAction: "none",
      p: "1px",
      transitionProperty:
        "color, background-color, border-color, text-decoration-color, fill, stroke",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      userSelect: "none",
      "&[data-orientation='horizontal']": {
        h: "2.5",
        flexDirection: "column",
        borderTopWidth: "1px",
        borderTopColor: "transparent",
      },
      "&[data-orientation='vertical']": {
        h: "full",
        w: "2.5",
        borderLeftWidth: "1px",
        borderLeftColor: "transparent",
      },
    },
    thumb: { position: "relative", flex: "1", rounded: "full", bg: "border" },
  },
});
