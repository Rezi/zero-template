import { defineSlotRecipe } from "./define-recipe";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export const hoverCardRecipe = defineSlotRecipe({
  className: "hover-card",
  slots: ["positioner", "content"],
  base: {
    positioner: {
      isolation: "isolate",
      zIndex: "50",
    },
    content: {
      zIndex: "50",
      w: "72",
      transformOrigin: "var(--transform-origin)",
      rounded: "3xl",
      bg: "popover",
      p: "4",
      fontSize: "sm",
      color: "popover.foreground",
      boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowLg}`,
      outline: "none",
      // popover animation styles (fade + zoom + directional slide)
      transitionProperty: "opacity, scale, translate",
      transitionTimingFunction: EASE,
      transitionDuration: "100ms",
      "&[data-starting-style]": { opacity: "0", scale: "0.95" },
      "&[data-ending-style]": { opacity: "0", scale: "0.95" },
      "&[data-side='top'][data-starting-style]": { translate: "0 0.5rem" },
      "&[data-side='bottom'][data-starting-style]": { translate: "0 -0.5rem" },
      "&[data-side='left'][data-starting-style]": { translate: "0.5rem" },
      "&[data-side='right'][data-starting-style]": { translate: "-0.5rem" },
      "&[data-side='inline-start'][data-starting-style]": { translate: "0.5rem" },
      "&[data-side='inline-end'][data-starting-style]": { translate: "-0.5rem" },
      _dark: {
        boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowLg}`,
      },
    },
  },
});
