import { defineSlotRecipe } from "./define-recipe";

export const paginationRecipe = defineSlotRecipe({
  className: "pagination",
  slots: ["root", "content", "label", "ellipsis", "previous", "next"],
  base: {
    root: { mx: "auto", display: "flex", w: "full", justifyContent: "center" },
    content: { display: "flex", alignItems: "center", gap: "1" },
    label: { display: "none", sm: { display: "block" } },
    ellipsis: {
      display: "flex",
      size: "8",
      alignItems: "center",
      justifyContent: "center",
      "& svg:not([class*='size-'])": { size: "4" },
    },
    previous: { pl: "1.5!" },
    next: { pr: "1.5!" },
  },
});
