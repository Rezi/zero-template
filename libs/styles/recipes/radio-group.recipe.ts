import { defineSlotRecipe } from "./define-recipe";

export const radioGroupRecipe = defineSlotRecipe({
  className: "radio-group",
  slots: ["root", "item", "indicator", "dot"],
  base: {
    root: { display: "grid", w: "full", gap: "3" },
    item: {
      position: "relative",
      display: "flex",
      aspectRatio: "square",
      size: "4",
      flexShrink: "0",
      rounded: "2xl",
      borderWidth: "1px",
      borderColor: "transparent",
      bg: "input/90",
      outline: "none",
      "&::after": { content: '""', position: "absolute", insetInline: "-3", insetBlock: "-2" },
      _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
      _disabled: { cursor: "not-allowed", opacity: "0.5" },
      "&[aria-invalid='true']": {
        borderColor: "destructive",
        ringW: "3",
        ringC: "destructive/20",
      },
      "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
        bg: "primary",
        color: "primary.foreground",
      },
      _dark: {
        "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
        "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
          bg: "primary",
        },
      },
    },
    indicator: {
      display: "flex",
      size: "4",
      alignItems: "center",
      justifyContent: "center",
    },
    dot: {
      position: "absolute",
      top: "50%",
      left: "50%",
      size: "2",
      transform: "translate(-50%, -50%)",
      rounded: "full",
      bg: "primary.foreground",
      _dark: { size: "2.5" },
    },
  },
});
