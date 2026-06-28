import { defineSlotRecipe } from "./define-recipe";

const shadowXl = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";

export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  slots: ["overlay", "content", "closeButton", "header", "footer", "title", "description"],
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
      maxW: "calc(100% - 2rem)",
      transform: "translate(-50%, -50%)",
      gap: "6",
      borderRadius: "min(var(--radius-4xl), 24px)",
      bg: "popover",
      p: "6",
      fontSize: "sm",
      color: "popover.foreground",
      boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowXl}`,
      outline: "none",
      sm: { maxW: "md" },
      _dark: {
        boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowXl}`,
      },
    },
    closeButton: {
      position: "absolute",
      top: "4",
      right: "4",
      bg: "secondary",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
    footer: {
      display: "flex",
      flexDirection: "column-reverse",
      gap: "2",
      sm: { flexDirection: "row", justifyContent: "flex-end" },
    },
    title: {
      fontFamily: "var(--font-heading)",
      fontSize: "1rem",
      lineHeight: "none",
      fontWeight: "medium",
    },
    description: {
      fontSize: "sm",
      color: "muted.foreground",
      "& > a": { textDecoration: "underline", textUnderlineOffset: "3px" },
      "& > a:hover": { color: "foreground" },
    },
  },
});
