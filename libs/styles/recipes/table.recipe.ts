import { defineSlotRecipe } from "./define-recipe";

export const tableRecipe = defineSlotRecipe({
  className: "table",
  slots: ["container", "root", "header", "body", "footer", "row", "head", "cell", "caption"],
  base: {
    container: { position: "relative", w: "full", overflowX: "auto" },
    root: { w: "full", captionSide: "bottom", fontSize: "sm" },
    header: { "& tr": { borderBottomWidth: "1px" } },
    body: { "& tr:last-child": { borderWidth: "0" } },
    footer: {
      borderTopWidth: "1px",
      bg: "muted/50",
      fontWeight: "medium",
      "& > tr:last-child": { borderBottomWidth: "0" },
    },
    row: {
      borderBottomWidth: "1px",
      transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      _hover: { bg: "muted/50" },
      "&:has([aria-expanded='true'])": { bg: "muted/50" },
      "&[data-state='selected']": { bg: "muted" },
    },
    head: {
      h: "10",
      px: "2",
      textAlign: "left",
      verticalAlign: "middle",
      fontWeight: "medium",
      whiteSpace: "nowrap",
      color: "foreground",
      "&:has([role=checkbox])": { pr: "0" },
    },
    cell: {
      p: "2",
      verticalAlign: "middle",
      whiteSpace: "nowrap",
      "&:has([role=checkbox])": { pr: "0" },
    },
    caption: { mt: "4", fontSize: "sm", color: "muted.foreground" },
  },
});
