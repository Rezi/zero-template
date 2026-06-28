import { defineSlotRecipe } from "./define-recipe";

// Slot recipe: one definition for every part of the Alert (root + title +
// description + action). The `variant` prop lives on the root call; cross-part
// variant styling (e.g. destructive dimming the description) stays as a root
// descendant selector, because the sub-part components (`AlertDescription`, …)
// are rendered independently and don't receive the variant prop themselves.
export const alertRecipe = defineSlotRecipe({
  className: "alert",
  slots: ["root", "title", "description", "action"],
  base: {
    root: {
      position: "relative",
      display: "grid",
      w: "full",
      gap: "0.5",
      rounded: "2xl",
      borderWidth: "1px",
      px: "4",
      py: "3",
      textAlign: "left",
      fontSize: "sm",
      "&:has([data-slot='alert-action'])": { position: "relative", pr: "4.5rem" },
      "&:has(> svg)": { gridTemplateColumns: "auto 1fr", columnGap: "2.5" },
      // *:[svg] = direct-child svg
      "& > svg": {
        gridRow: "span 2 / span 2",
        transform: "translateY(0.125rem)",
        color: "currentColor",
      },
      "& > svg:not([class*='size-'])": { size: "4" },
    },
    title: {
      fontWeight: "medium",
      "[data-slot='alert']:has(> svg) &": { gridColumnStart: "2" },
      "& a": { textDecoration: "underline", textUnderlineOffset: "3px" },
      "& a:hover": { color: "foreground" },
    },
    description: {
      fontSize: "sm",
      textWrap: "balance",
      color: "muted.foreground",
      md: { textWrap: "pretty" },
      "& a": { textDecoration: "underline", textUnderlineOffset: "3px" },
      "& a:hover": { color: "foreground" },
      "& p:not(:last-child)": { mb: "4" },
    },
    action: { position: "absolute", top: "2.5", right: "3" },
  },
  variants: {
    variant: {
      default: {
        root: { bg: "card", color: "card.foreground" },
      },
      destructive: {
        root: {
          bg: "card",
          color: "destructive",
          "& > [data-slot='alert-description']": { color: "destructive/90" },
          "& > svg": { color: "currentColor" },
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
