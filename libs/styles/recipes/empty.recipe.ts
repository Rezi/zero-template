import { defineSlotRecipe } from "./define-recipe";

export const emptyRecipe = defineSlotRecipe({
  className: "empty",
  slots: ["root", "header", "media", "title", "description", "content"],
  base: {
    root: {
      display: "flex",
      w: "full",
      minW: "0",
      flex: "1",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "4",
      rounded: "3xl",
      borderStyle: "dashed",
      p: "12",
      textAlign: "center",
      textWrap: "balance",
    },
    header: {
      display: "flex",
      maxW: "sm",
      flexDirection: "column",
      alignItems: "center",
      gap: "2",
    },
    media: {
      mb: "2",
      display: "flex",
      flexShrink: "0",
      alignItems: "center",
      justifyContent: "center",
      "& svg": { pointerEvents: "none", flexShrink: "0" },
    },
    title: {
      fontFamily: "var(--font-heading)",
      fontSize: "lg",
      fontWeight: "medium",
      letterSpacing: "tight",
    },
    description: {
      fontSize: "sm",
      lineHeight: "relaxed",
      color: "muted.foreground",
      "& > a": { textDecoration: "underline", textUnderlineOffset: "4px" },
      "& > a:hover": { color: "primary" },
    },
    content: {
      display: "flex",
      w: "full",
      maxW: "sm",
      minW: "0",
      flexDirection: "column",
      alignItems: "center",
      gap: "4",
      fontSize: "sm",
      textWrap: "balance",
    },
  },
  variants: {
    mediaVariant: {
      default: { media: { bg: "transparent" } },
      icon: {
        media: {
          size: "10",
          flexShrink: "0",
          rounded: "xl",
          bg: "muted",
          color: "foreground",
          "& svg:not([class*='size-'])": { size: "5" },
        },
      },
    },
  },
  defaultVariants: {
    mediaVariant: "default",
  },
});
