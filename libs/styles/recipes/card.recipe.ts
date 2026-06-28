import { defineSlotRecipe } from "./define-recipe";

// shadcn cards round to `min(var(--radius-4xl), 24px)`; reused by several slots.
const cardRadius = "min(var(--radius-4xl), 24px)";
// Ring shadow; changes between light/dark.
const cardShadowLight =
  "0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
const cardShadowDark =
  "0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";

export const cardRecipe = defineSlotRecipe({
  className: "card",
  slots: ["root", "header", "title", "description", "action", "content", "footer"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--card-spacing)",
      overflow: "hidden",
      borderRadius: cardRadius,
      bg: "card",
      py: "var(--card-spacing)",
      fontSize: "sm",
      color: "card.foreground",
      boxShadow: cardShadowLight,
      "--card-spacing": "1.25rem",
      "&:has(> img:first-child)": { pt: "0" },
      "&[data-size='sm']": { "--card-spacing": "1rem" },
      _dark: {
        boxShadow: cardShadowDark,
      },
      "& > img:first-child": {
        borderTopLeftRadius: cardRadius,
        borderTopRightRadius: cardRadius,
      },
      "& > img:last-child": {
        borderBottomLeftRadius: cardRadius,
        borderBottomRightRadius: cardRadius,
      },
    },
    header: {
      containerType: "inline-size",
      containerName: "card-header",
      display: "grid",
      gridAutoRows: "min-content",
      alignItems: "flex-start",
      gap: "1.5",
      borderTopLeftRadius: cardRadius,
      borderTopRightRadius: cardRadius,
      px: "var(--card-spacing)",
      "&:has([data-slot='card-action'])": { gridTemplateColumns: "1fr auto" },
      "&:has([data-slot='card-description'])": { gridTemplateRows: "auto auto" },
    },
    title: {
      fontFamily: "var(--font-heading)",
      fontSize: "1rem",
      fontWeight: "medium",
    },
    description: {
      fontSize: "sm",
      color: "muted.foreground",
    },
    action: {
      gridColumnStart: "2",
      gridRow: "span 2 / span 2",
      gridRowStart: "1",
      alignSelf: "flex-start",
      justifySelf: "end",
    },
    content: {
      px: "var(--card-spacing)",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      borderBottomLeftRadius: cardRadius,
      borderBottomRightRadius: cardRadius,
      px: "var(--card-spacing)",
    },
  },
  variants: {
    headerBordered: {
      true: {
        header: {
          borderBottomWidth: "1px",
          borderColor: "border",
          pb: "var(--card-spacing)",
        },
      },
    },
    footerBordered: {
      true: {
        footer: {
          borderTopWidth: "1px",
          borderColor: "border",
          pt: "var(--card-spacing)",
        },
      },
    },
  },
});
