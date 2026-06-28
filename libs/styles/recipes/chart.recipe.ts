import { defineSlotRecipe } from "./define-recipe";

const shadowLg =
  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";

export const chartRecipe = defineSlotRecipe({
  className: "chart",
  slots: [
    "container",
    "tooltip",
    "tooltipList",
    "label",
    "tooltipRow",
    "indicatorBase",
    "valueRow",
    "itemName",
    "itemValue",
    "legend",
    "legendItem",
    "legendIcon",
  ],
  base: {
    container: {
      display: "flex",
      aspectRatio: "16 / 9",
      justifyContent: "center",
      fontSize: "xs",
      "& .recharts-cartesian-axis-tick text": { fill: "muted.foreground" },
      "& .recharts-cartesian-grid line[stroke='#ccc']": { stroke: "border/50" },
      "& .recharts-curve.recharts-tooltip-cursor": { stroke: "border" },
      "& .recharts-dot[stroke='#fff']": { stroke: "transparent" },
      "& .recharts-layer": { outline: "none" },
      "& .recharts-polar-grid [stroke='#ccc']": { stroke: "border" },
      "& .recharts-radial-bar-background-sector": { fill: "muted" },
      "& .recharts-rectangle.recharts-tooltip-cursor": { fill: "muted" },
      "& .recharts-reference-line [stroke='#ccc']": { stroke: "border" },
      "& .recharts-sector": { outline: "none" },
      "& .recharts-sector[stroke='#fff']": { stroke: "transparent" },
      "& .recharts-surface": { outline: "none" },
    },
    tooltip: {
      display: "grid",
      minW: "32",
      alignItems: "flex-start",
      gap: "1.5",
      rounded: "xl",
      bg: "popover",
      px: "2.5",
      py: "1.5",
      fontSize: "xs",
      color: "popover.foreground",
      // shadow-lg + ring-1 ring-foreground/5 composed into one box-shadow
      boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowLg}`,
      _dark: {
        boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowLg}`,
      },
    },
    tooltipList: { display: "grid", gap: "1.5" },
    label: { fontWeight: "medium" },
    tooltipRow: {
      display: "flex",
      w: "full",
      flexWrap: "wrap",
      alignItems: "stretch",
      gap: "2",
      "& > svg": { h: "2.5", w: "2.5", color: "muted.foreground" },
    },
    indicatorBase: {
      flexShrink: "0",
      rounded: "2px",
      borderColor: "var(--color-border)",
      bg: "var(--color-bg)",
    },
    valueRow: {
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      lineHeight: "none",
      alignItems: "center",
    },
    itemName: { color: "muted.foreground" },
    itemValue: {
      fontFamily: "var(--font-mono)",
      fontWeight: "medium",
      color: "foreground",
      fontVariantNumeric: "tabular-nums",
    },
    legend: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "1.5",
      "& > svg": { h: "3", w: "3", color: "muted.foreground" },
    },
    legendIcon: { h: "2", w: "2", flexShrink: "0", rounded: "2px" },
  },
  variants: {
    indicator: {
      dot: {
        tooltipRow: { alignItems: "center" },
        indicatorBase: { h: "2.5", w: "2.5" },
      },
      line: {
        indicatorBase: { w: "1" },
      },
      dashed: {
        indicatorBase: {
          w: "0",
          borderWidth: "1.5px",
          borderStyle: "dashed",
          bg: "transparent",
        },
      },
    },
    nestLabel: {
      true: {
        valueRow: { alignItems: "flex-end" },
        indicatorBase: { my: "0.5" },
      },
    },
    verticalAlign: {
      top: {
        legend: { pb: "3" },
      },
      bottom: {
        legend: { pt: "3" },
      },
    },
  },
  defaultVariants: {
    indicator: "dot",
    nestLabel: false,
    verticalAlign: "bottom",
  },
});
