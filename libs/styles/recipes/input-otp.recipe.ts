import { defineSlotRecipe } from "./define-recipe";

export const inputOtpRecipe = defineSlotRecipe({
  className: "input-otp",
  slots: ["root", "input", "group", "slot", "caretWrapper", "caret", "separator"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      "&:has(:disabled)": { opacity: "0.5" },
    },
    input: {
      _disabled: { cursor: "not-allowed" },
    },
    group: {
      display: "flex",
      alignItems: "center",
      rounded: "2xl",
      "&:has([aria-invalid='true'])": {
        borderColor: "destructive",
        ringW: "3",
        ringC: "destructive/20",
      },
      _dark: { "&:has([aria-invalid='true'])": { ringC: "destructive/40" } },
    },
    slot: {
      position: "relative",
      display: "flex",
      size: "8",
      alignItems: "center",
      justifyContent: "center",
      borderBlockWidth: "1px",
      borderRightWidth: "1px",
      borderColor: "input",
      bg: "input/50",
      fontSize: "sm",
      transitionProperty: "color, box-shadow",
      transitionDuration: "200ms",
      outline: "none",
      "&:first-child": {
        borderTopLeftRadius: "2xl",
        borderBottomLeftRadius: "2xl",
        borderLeftWidth: "1px",
      },
      "&:last-child": { borderTopRightRadius: "2xl", borderBottomRightRadius: "2xl" },
      "&[aria-invalid='true']": { borderColor: "destructive" },
      "&[data-active='true']": {
        zIndex: "10",
        borderColor: "ring",
        ringW: "3",
        ringC: "ring/30",
      },
      "&[data-active='true'][aria-invalid='true']": { ringC: "destructive/20" },
      _dark: { "&[data-active='true'][aria-invalid='true']": { ringC: "destructive/40" } },
    },
    caretWrapper: {
      pointerEvents: "none",
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    caret: {
      h: "4",
      w: "1px",
      bg: "foreground",
      animationName: "caretBlink",
      animationDuration: "1s",
      animationTimingFunction: "ease-out",
      animationIterationCount: "infinite",
    },
    separator: {
      display: "flex",
      alignItems: "center",
      "& svg:not([class*='size-'])": { size: "4" },
    },
  },
});
