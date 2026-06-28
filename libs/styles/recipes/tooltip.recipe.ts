import { defineSlotRecipe } from "./define-recipe";

export const tooltipRecipe = defineSlotRecipe({
  className: "tooltip",
  slots: ["positioner", "content", "arrow"],
  base: {
    positioner: {
      isolation: "isolate",
      zIndex: "50",
    },
    content: {
      zIndex: "50",
      display: "inline-flex",
      w: "fit",
      maxW: "xs",
      transformOrigin: "var(--transform-origin)",
      alignItems: "center",
      gap: "1.5",
      rounded: "xl",
      bg: "foreground",
      px: "3",
      py: "1.5",
      fontSize: "xs",
      color: "background",
      "&:has([data-slot=kbd])": { pr: "1.5" },
      "& [data-slot=kbd]": {
        position: "relative",
        isolation: "isolate",
        zIndex: "50",
        rounded: "lg",
      },
    },
    arrow: {
      zIndex: "50",
      size: "2.5",
      transform: "translateY(calc(-50% - 2px)) rotate(45deg)",
      rounded: "2px",
      bg: "foreground",
      fill: "foreground",
      "&[data-side='bottom']": { top: "1" },
      "&[data-side='inline-end']": {
        top: "50%!",
        left: "-1",
        transform: "translate(1.5px, -50%) rotate(45deg)",
      },
      "&[data-side='inline-start']": {
        top: "50%!",
        right: "-1",
        transform: "translate(-1.5px, -50%) rotate(45deg)",
      },
      "&[data-side='left']": {
        top: "50%!",
        right: "-1",
        transform: "translate(-1.5px, -50%) rotate(45deg)",
      },
      "&[data-side='right']": {
        top: "50%!",
        left: "-1",
        transform: "translate(1.5px, -50%) rotate(45deg)",
      },
      "&[data-side='top']": { bottom: "-2.5" },
    },
  },
});
