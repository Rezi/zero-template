import { defineSlotRecipe } from "./define-recipe";

export const buttonGroupRecipe = defineSlotRecipe({
  className: "button-group",
  slots: ["root", "text", "separator"],
  base: {
    root: {
      display: "flex",
      w: "fit",
      alignItems: "stretch",
      "& > *:focus-visible": { position: "relative", zIndex: "10" },
      "&:has(> [data-slot=button-group])": { gap: "2" },
      "&:has(> [data-variant=outline]) > [data-slot=input-group]": { borderColor: "border" },
      "&:has(> [data-variant=outline]) > [data-slot=select-trigger]": { borderColor: "border" },
      "&:has(> [data-variant=outline]) > [data-slot=input-group]:has(:focus-visible)": {
        borderColor: "ring",
      },
      "&:has(> [data-variant=outline]) > [data-slot=select-trigger]:focus-visible": {
        borderColor: "ring",
      },
      "&:has(select[aria-hidden=true]:last-child) > [data-slot=select-trigger]:last-of-type": {
        borderTopRightRadius: "2xl",
        borderBottomRightRadius: "2xl",
      },
      "& > [data-slot=select-trigger]:not([class*='w-'])": { w: "fit" },
      "& > input": { flex: "1" },
      "&:has(> [data-variant=outline]) > input": { borderColor: "border" },
      "&:has(> [data-variant=outline]) > input:focus-visible": { borderColor: "ring" },
    },
    text: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      rounded: "2xl",
      borderWidth: "1px",
      bg: "muted",
      px: "2.5",
      fontSize: "sm",
      fontWeight: "medium",
      "& svg": { pointerEvents: "none" },
      "& svg:not([class*='size-'])": { size: "4" },
    },
    separator: {
      position: "relative",
      alignSelf: "stretch",
      bg: "input",
      "&[data-orientation='horizontal']": { mx: "1px", w: "auto" },
      "&[data-orientation='vertical']": { my: "1px", h: "auto" },
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          "& > [data-slot]": { borderTopRightRadius: "0", borderBottomRightRadius: "0" },
          "& > [data-slot]:not(:has(~ [data-slot]))": {
            borderTopRightRadius: "2xl!",
            borderBottomRightRadius: "2xl!",
          },
          "& > [data-slot] ~ [data-slot]": {
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            borderLeftWidth: "0",
          },
        },
      },
      vertical: {
        root: {
          flexDirection: "column",
          "& > [data-slot]": { borderBottomLeftRadius: "0", borderBottomRightRadius: "0" },
          "& > [data-slot]:not(:has(~ [data-slot]))": {
            borderBottomLeftRadius: "2xl!",
            borderBottomRightRadius: "2xl!",
          },
          "& > [data-slot] ~ [data-slot]": {
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderTopWidth: "0",
          },
        },
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
