import { defineRecipe, defineSlotRecipe } from "./define-recipe";

export const inputGroupRecipe = defineSlotRecipe({
  className: "input-group",
  slots: ["root", "text", "input", "textarea"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      h: "8",
      w: "full",
      minW: "0",
      alignItems: "center",
      rounded: "2xl",
      borderWidth: "1px",
      borderColor: "transparent",
      bg: "input/50",
      transitionProperty: "color, box-shadow",
      transitionDuration: "200ms",
      outline: "none",
      "[data-slot=combobox-content] &": {
        "&:focus-within": { borderColor: "inherit", ringW: "0" },
      },
      "&:has([data-slot=input-group-control]:focus-visible)": {
        borderColor: "ring",
        ringW: "3",
        ringC: "ring/30",
      },
      "&:has([data-slot][aria-invalid=true])": {
        borderColor: "destructive",
        ringW: "3",
        ringC: "destructive/20",
      },
      "&:has(> [data-align=block-end])": {
        h: "auto",
        flexDirection: "column",
        "& > input": { pt: "3" },
      },
      "&:has(> [data-align=block-start])": {
        h: "auto",
        flexDirection: "column",
        "& > input": { pb: "3" },
      },
      "&:has(> [data-align=inline-end])": { "& > input": { pr: "1.5" } },
      "&:has(> [data-align=inline-start])": { "& > input": { pl: "1.5" } },
      "&:has(> textarea)": { h: "auto" },
      _dark: { "&:has([data-slot][aria-invalid=true])": { ringC: "destructive/40" } },
    },
    text: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      fontSize: "sm",
      color: "muted.foreground",
      "& svg": { pointerEvents: "none" },
      "& svg:not([class*='size-'])": { size: "4" },
    },
    input: {
      flex: "1",
      rounded: "none",
      borderWidth: "0",
      bg: "transparent",
      boxShadow: "none",
      ringW: "0",
      _focusVisible: { boxShadow: "none!", borderColor: "transparent!" },
      "&[aria-invalid='true']": { boxShadow: "none!", borderColor: "transparent!" },
      _dark: { bg: "transparent" },
    },
    textarea: {
      flex: "1",
      resize: "none",
      rounded: "none",
      borderWidth: "0",
      bg: "transparent",
      py: "2",
      boxShadow: "none",
      ringW: "0",
      _focusVisible: { boxShadow: "none!", borderColor: "transparent!" },
      "&[aria-invalid='true']": { boxShadow: "none!", borderColor: "transparent!" },
      _dark: { bg: "transparent" },
    },
  },
});

export const inputGroupAddonRecipe = defineRecipe({
  className: "input-group-addon",
  base: {
    display: "flex",
    h: "auto",
    cursor: "text",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    py: "1.5",
    fontSize: "sm",
    fontWeight: "medium",
    color: "muted.foreground",
    userSelect: "none",
    "[data-slot='input-group'][data-disabled='true'] &": { opacity: "0.5" },
    "& [data-slot=kbd]": { rounded: "2xl", bg: "muted.foreground/10", px: "1.5" },
    "& > svg:not([class*='size-'])": { size: "4" },
  },
  variants: {
    align: {
      "inline-start": {
        order: "-9999",
        pl: "2",
        "&:has(> button)": { ml: "-0.3rem" },
        "&:has(> kbd)": { ml: "-0.15rem" },
      },
      "inline-end": {
        order: "9999",
        pr: "2",
        "&:has(> button)": { mr: "-0.3rem" },
        "&:has(> kbd)": { mr: "-0.15rem" },
      },
      "block-start": {
        order: "-9999",
        w: "full",
        justifyContent: "flex-start",
        px: "2.5",
        pt: "2",
        "[data-slot='input-group']:has(> input) &": { pt: "2" },
      },
      "block-end": {
        order: "9999",
        w: "full",
        justifyContent: "flex-start",
        px: "2.5",
        pb: "2",
        "[data-slot='input-group']:has(> input) &": { pb: "2" },
      },
    },
    // Opt-in divider. The side depends on the addon's placement: a block-start
    // addon gets a bottom border, a block-end addon a top border (was the
    bordered: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      align: "block-start",
      bordered: true,
      css: { borderBottomWidth: "1px", borderColor: "border", pb: "2" },
    },
    {
      align: "block-end",
      bordered: true,
      css: { borderTopWidth: "1px", borderColor: "border", pt: "2" },
    },
  ],
  defaultVariants: {
    align: "inline-start",
    bordered: false,
  },
});

export const inputGroupButtonRecipe = defineRecipe({
  className: "input-group-button",
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2",
    rounded: "2xl",
    fontSize: "sm",
    boxShadow: "none",
  },
  variants: {
    size: {
      xs: {
        h: "6",
        gap: "1",
        rounded: "xl",
        px: "1.5",
        "& > svg:not([class*='size-'])": { size: "3.5" },
      },
      sm: {},
      "icon-xs": { size: "6", rounded: "xl", p: "0", "&:has(> svg)": { p: "0" } },
      "icon-sm": { size: "8", p: "0", "&:has(> svg)": { p: "0" } },
    },
  },
  defaultVariants: {
    size: "xs",
  },
});
