import { defineSlotRecipe } from "./define-recipe";

export const toggleGroupRecipe = defineSlotRecipe({
  className: "toggle-group",
  slots: ["root", "item"],
  base: {
    root: {
      display: "flex",
      w: "fit",
      flexDirection: "row",
      alignItems: "center",
      gap: "calc(var(--spacing, 0.25rem) * var(--gap))",
      "&[data-spacing='0'][data-variant='outline']": { rounded: "2xl" },
      "&[data-orientation='vertical']": { flexDirection: "column", alignItems: "stretch" },
    },
    item: {
      flexShrink: "0",
      _focus: { zIndex: "10" },
      _focusVisible: { zIndex: "10" },
      "&[data-state='on']": { bg: "muted" },
      "[data-slot='toggle-group'][data-spacing='0'] &": {
        rounded: "none",
        px: "2",
        boxShadow: "none",
        "&:has([data-icon=inline-end])": { pr: "1.5" },
        "&:has([data-icon=inline-start])": { pl: "1.5" },
      },
      "[data-slot='toggle-group'][data-orientation='horizontal'] &": {
        "&[data-spacing='0']:first-child": {
          borderTopLeftRadius: "2xl",
          borderBottomLeftRadius: "2xl",
        },
        "&[data-spacing='0']:last-child": {
          borderTopRightRadius: "2xl",
          borderBottomRightRadius: "2xl",
        },
        "&[data-spacing='0'][data-variant='outline']": { borderLeftWidth: "0" },
        "&[data-spacing='0'][data-variant='outline']:first-child": { borderLeftWidth: "1px" },
      },
      "[data-slot='toggle-group'][data-orientation='vertical'] &": {
        "&[data-spacing='0']:first-child": {
          borderTopLeftRadius: "2xl",
          borderTopRightRadius: "2xl",
        },
        "&[data-spacing='0']:last-child": {
          borderBottomLeftRadius: "2xl",
          borderBottomRightRadius: "2xl",
        },
        "&[data-spacing='0'][data-variant='outline']": { borderTopWidth: "0" },
        "&[data-spacing='0'][data-variant='outline']:first-child": { borderTopWidth: "1px" },
      },
    },
  },
});
