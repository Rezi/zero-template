import { defineSlotRecipe } from "./define-recipe";

export const sonnerRecipe = defineSlotRecipe({
  className: "sonner",
  slots: ["icon", "iconSpin"],
  base: {
    icon: { size: "4" },
    iconSpin: { size: "4", animation: "spin" },
  },
});
