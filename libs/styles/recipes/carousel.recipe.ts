import { defineSlotRecipe } from "./define-recipe";

export const carouselRecipe = defineSlotRecipe({
  className: "carousel",
  slots: ["root", "contentWrapper", "content", "item", "previous", "next"],
  base: {
    root: {
      position: "relative",
    },
    contentWrapper: {
      overflow: "hidden",
    },
    content: {
      display: "flex",
    },
    item: {
      minW: "0",
      flexShrink: "0",
      flexGrow: "0",
      flexBasis: "full",
    },
    previous: {
      position: "absolute",
      touchAction: "manipulation",
      rounded: "2xl",
    },
    next: {
      position: "absolute",
      touchAction: "manipulation",
      rounded: "2xl",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        content: { ml: "-4" },
        item: { pl: "4" },
        previous: { top: "50%", left: "-12", transform: "translateY(-50%)" },
        next: { top: "50%", right: "-12", transform: "translateY(-50%)" },
      },
      vertical: {
        content: { mt: "-4", flexDirection: "column" },
        item: { pt: "4" },
        previous: { top: "-12", left: "50%", transform: "translateX(-50%) rotate(90deg)" },
        next: { bottom: "-12", left: "50%", transform: "translateX(-50%) rotate(90deg)" },
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
