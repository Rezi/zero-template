import { defineSlotRecipe } from "./define-recipe";

export const breadcrumbRecipe = defineSlotRecipe({
  className: "breadcrumb",
  slots: ["root", "list", "item", "link", "page", "separator", "ellipsis"],
  base: {
    root: {},
    list: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "1.5",
      fontSize: "sm",
      overflowWrap: "break-word",
      color: "muted.foreground",
      sm: { gap: "2.5" },
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
      gap: "1.5",
    },
    link: {
      transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      _hover: { color: "foreground" },
    },
    page: {
      fontWeight: "normal",
      color: "foreground",
    },
    separator: {
      "& > svg": { size: "3.5" },
    },
    ellipsis: {
      display: "flex",
      size: "5",
      alignItems: "center",
      justifyContent: "center",
      "& > svg": { size: "4" },
    },
  },
});
