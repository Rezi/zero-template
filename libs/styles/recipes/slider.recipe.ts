import { defineSlotRecipe } from "./define-recipe";

const shadowMd = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
const thumbRingHover = `0 0 0 4px color-mix(in oklab, var(--ring) 30%, transparent), ${shadowMd}`;

export const sliderRecipe = defineSlotRecipe({
  className: "slider",
  slots: ["root", "control", "track", "indicator", "thumb"],
  base: {
    root: {
      "&[data-orientation='horizontal']": { w: "full" },
      "&[data-orientation='vertical']": { h: "full" },
    },
    control: {
      position: "relative",
      display: "flex",
      w: "full",
      touchAction: "none",
      alignItems: "center",
      userSelect: "none",
      "&:where([data-state='disabled'], [data-disabled]:not([data-disabled='false']))": {
        opacity: "0.5",
      },
      "&[data-orientation='vertical']": {
        h: "full",
        minH: "40",
        w: "auto",
        flexDirection: "column",
      },
    },
    track: {
      position: "relative",
      flexGrow: "1",
      overflow: "hidden",
      rounded: "2xl",
      bg: "input/90",
      userSelect: "none",
      "&[data-orientation='horizontal']": { h: "1", w: "full" },
      "&[data-orientation='vertical']": { h: "full", w: "1" },
    },
    indicator: {
      bg: "primary",
      userSelect: "none",
      "&[data-orientation='horizontal']": { h: "full" },
      "&[data-orientation='vertical']": { w: "full" },
    },
    thumb: {
      display: "block",
      size: "4",
      flexShrink: "0",
      rounded: "2xl",
      bg: "white",
      boxShadow: `0 0 0 1px rgb(0 0 0 / 0.1), ${shadowMd}`,
      transitionProperty: "color, box-shadow",
      transitionDuration: "200ms",
      userSelect: "none",
      "&:not(.dark *)": { backgroundClip: "padding-box" },
      _hover: { boxShadow: thumbRingHover },
      _focusVisible: { boxShadow: thumbRingHover, outline: "none" },
      _disabled: { pointerEvents: "none", opacity: "0.5" },
    },
  },
});
