import { defineSlotRecipe } from "./define-recipe";

export const nativeSelectRecipe = defineSlotRecipe({
  className: "native-select",
  slots: ["wrapper", "select", "icon", "option"],
  base: {
    wrapper: {
      position: "relative",
      w: "fit",
      "&:has(select:disabled)": { opacity: "0.5" },
    },
    select: {
      h: "8",
      w: "full",
      minW: "0",
      appearance: "none",
      rounded: "2xl",
      borderWidth: "1px",
      borderColor: "transparent",
      bg: "input/50",
      py: "1",
      pr: "8",
      pl: "2.5",
      fontSize: "sm",
      transitionProperty: "color, box-shadow",
      transitionDuration: "200ms",
      outline: "none",
      userSelect: "none",
      "&::selection": { bg: "primary", color: "primary.foreground" },
      _placeholder: { color: "muted.foreground" },
      _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
      _disabled: { pointerEvents: "none", cursor: "not-allowed" },
      "&[aria-invalid='true']": {
        borderColor: "destructive",
        ringW: "3",
        ringC: "destructive/20",
      },
      "&[data-size='sm']": { h: "7" },
      _dark: {
        "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
      },
    },
    icon: {
      pointerEvents: "none",
      position: "absolute",
      top: "50%",
      right: "2.5",
      size: "4",
      transform: "translateY(-50%)",
      color: "muted.foreground",
      userSelect: "none",
    },
    option: {
      bg: "Canvas",
      color: "CanvasText",
    },
  },
});
