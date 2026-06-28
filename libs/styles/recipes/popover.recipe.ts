import { defineSlotRecipe } from "./define-recipe";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export const popoverRecipe = defineSlotRecipe({
  className: "popover",
  slots: ["positioner", "content", "header", "title", "description"],
  base: {
    positioner: {
      isolation: "isolate",
      zIndex: "50",
    },
    content: {
      zIndex: "50",
      display: "flex",
      w: "72",
      transformOrigin: "var(--transform-origin)",
      flexDirection: "column",
      gap: "4",
      rounded: "3xl",
      bg: "popover",
      p: "4",
      fontSize: "sm",
      color: "popover.foreground",
      // shadow-lg + ring-1 ring-foreground/5 composed into one box-shadow
      boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowLg}`,
      outline: "none",
      _dark: {
        boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowLg}`,
      },
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
    },
    header: {
      display: "flex",
      flexDirection: "column",
      gap: "1",
      fontSize: "sm",
    },
    title: {
      fontSize: "1rem",
      fontWeight: "medium",
    },
    description: {
      color: "muted.foreground",
    },
  },
});
