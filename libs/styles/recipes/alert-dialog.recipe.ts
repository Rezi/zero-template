import { defineSlotRecipe } from "./define-recipe";

const shadowXl = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";

export const alertDialogRecipe = defineSlotRecipe({
  className: "alert-dialog",
  slots: ["overlay", "content", "header", "footer", "media", "title", "description"],
  base: {
    overlay: {
      position: "fixed",
      inset: "0",
      isolation: "isolate",
      zIndex: "50",
      bg: "black/30",
      "@supports ((backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0)))": {
        backdropFilter: "blur(4px)",
      },
    },
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      zIndex: "50",
      display: "grid",
      w: "full",
      transform: "translate(-50%, -50%)",
      gap: "6",
      borderRadius: "min(var(--radius-4xl), 24px)",
      bg: "popover",
      p: "6",
      color: "popover.foreground",
      boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowXl}`,
      outline: "none",
      "&[data-size='default']": { maxW: "xs", sm: { maxW: "md" } },
      "&[data-size='sm']": { maxW: "xs" },
      _dark: {
        boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowXl}`,
      },
    },
    header: {
      display: "grid",
      gridTemplateRows: "auto 1fr",
      placeItems: "center",
      gap: "1.5",
      textAlign: "center",
      "&:has([data-slot=alert-dialog-media])": {
        gridTemplateRows: "auto auto 1fr",
        columnGap: "6",
      },
      "[data-slot='alert-dialog-content'][data-size='default'] &": {
        sm: {
          placeItems: "start",
          textAlign: "left",
          "&:has([data-slot=alert-dialog-media])": { gridTemplateRows: "auto 1fr" },
        },
      },
    },
    footer: {
      display: "flex",
      flexDirection: "column-reverse",
      gap: "2",
      sm: { flexDirection: "row", justifyContent: "flex-end" },
      "[data-slot='alert-dialog-content'][data-size='sm'] &": {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      },
    },
    media: {
      mb: "2",
      display: "inline-flex",
      size: "16",
      alignItems: "center",
      justifyContent: "center",
      rounded: "full",
      bg: "muted",
      "& > svg:not([class*='size-'])": { size: "8" },
      "[data-slot='alert-dialog-content'][data-size='default'] &": {
        sm: { gridRow: "span 2 / span 2" },
      },
    },
    title: {
      fontFamily: "var(--font-heading)",
      fontSize: "lg",
      fontWeight: "medium",
      "[data-slot='alert-dialog-content'][data-size='default']:has([data-slot='alert-dialog-media']) &":
        {
          sm: { gridColumnStart: "2" },
        },
    },
    description: {
      fontSize: "sm",
      textWrap: "balance",
      color: "muted.foreground",
      md: { textWrap: "pretty" },
      "& > a": { textDecoration: "underline", textUnderlineOffset: "3px" },
      "& > a:hover": { color: "foreground" },
    },
  },
});
