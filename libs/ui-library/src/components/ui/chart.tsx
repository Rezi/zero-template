import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type { TooltipValueType } from "recharts";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";

const chartContainerStyles = css({
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
});

const chartTooltipStyles = css({
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
});

const chartTooltipListStyles = css({ display: "grid", gap: "1.5" });
const chartLabelStyles = css({ fontWeight: "medium" });

const chartTooltipRowStyles = css({
  display: "flex",
  w: "full",
  flexWrap: "wrap",
  alignItems: "stretch",
  gap: "2",
  "& > svg": { h: "2.5", w: "2.5", color: "muted.foreground" },
});

const chartIndicatorBaseStyles = css({
  flexShrink: "0",
  rounded: "2px",
  borderColor: "var(--color-border)",
  bg: "var(--color-bg)",
});

const chartLegendItemStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "1.5",
  "& > svg": { h: "3", w: "3", color: "muted.foreground" },
});

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;
type TooltipNameType = number | string;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  initialDimension?: {
    width: number;
    height: number;
  };
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={clsx(chartContainerStyles, className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme ?? config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
    "accessibilityLayer"
  >) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string" ? (config[label]?.label ?? label) : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={clsx(chartLabelStyles, labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={clsx(chartLabelStyles, labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div className={clsx(chartTooltipStyles, className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className={chartTooltipListStyles}>
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color ?? item.payload?.fill ?? item.color;

            return (
              <div
                key={index}
                className={clsx(
                  chartTooltipRowStyles,
                  indicator === "dot" && css({ alignItems: "center" }),
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={clsx(
                            chartIndicatorBaseStyles,
                            indicator === "dot" && css({ h: "2.5", w: "2.5" }),
                            indicator === "line" && css({ w: "1" }),
                            indicator === "dashed" &&
                              css({
                                w: "0",
                                borderWidth: "1.5px",
                                borderStyle: "dashed",
                                bg: "transparent",
                              }),
                            nestLabel && indicator === "dashed" && css({ my: "0.5" }),
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={clsx(
                        css({
                          display: "flex",
                          flex: "1",
                          justifyContent: "space-between",
                          lineHeight: "none",
                        }),
                        nestLabel ? css({ alignItems: "flex-end" }) : css({ alignItems: "center" }),
                      )}
                    >
                      <div className={chartTooltipListStyles}>
                        {nestLabel ? tooltipLabel : null}
                        <span className={css({ color: "muted.foreground" })}>
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span
                          className={css({
                            fontFamily: "var(--font-mono)",
                            fontWeight: "medium",
                            color: "foreground",
                            fontVariantNumeric: "tabular-nums",
                          })}
                        >
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        css({ display: "flex", alignItems: "center", justifyContent: "center", gap: "4" }),
        verticalAlign === "top" ? css({ pb: "3" }) : css({ pt: "3" }),
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div key={index} className={chartLegendItemStyles}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className={css({ h: "2", w: "2", flexShrink: "0", rounded: "2px" })}
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
