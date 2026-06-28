import { defineSlotRecipe } from "./define-recipe";

export const resizableRecipe = defineSlotRecipe({
  className: "resizable",
  slots: ["panelGroup", "handle", "handleGrip"],
  base: {
    panelGroup: {
      display: "flex",
      h: "full",
      w: "full",
      "&[aria-orientation=vertical]": { flexDirection: "column" },
    },
    handle: {
      position: "relative",
      display: "flex",
      w: "1px",
      alignItems: "center",
      justifyContent: "center",
      bg: "border",
      "&::after": {
        content: '""',
        position: "absolute",
        insetBlock: "0",
        left: "50%",
        w: "1",
        transform: "translateX(-50%)",
      },
      _focusVisible: { ringW: "1", ringC: "ring", outline: "none" },
      "&[aria-orientation=horizontal]": {
        h: "1px",
        w: "full",
        "&::after": { left: "0", h: "1", w: "full", transform: "translateY(-50%)" },
      },
      "&[aria-orientation=horizontal] > div": { transform: "rotate(90deg)" },
    },
    handleGrip: {
      zIndex: "10",
      display: "flex",
      h: "6",
      w: "1",
      flexShrink: "0",
      rounded: "lg",
      bg: "border",
    },
  },
});
