import * as React from "react";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        cx(
          "group/card",
          css({
            display: "flex",
            flexDirection: "column",
            gap: "var(--card-spacing)",
            overflow: "hidden",
            borderRadius: "min(var(--radius-4xl), 24px)",
            bg: "card",
            py: "var(--card-spacing)",
            fontSize: "sm",
            color: "card-foreground",
            "--card-spacing": "var(--spacing-5)",
            boxShadow: "0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)",
            "&:has(> img:first-child)": { pt: "0" },
            "&[data-size='sm']": { "--card-spacing": "var(--spacing-4)" },
            _dark: {
              boxShadow: "0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)",
            },
            "& > img:first-child": { borderTopLeftRadius: "min(var(--radius-4xl), 24px)", borderTopRightRadius: "min(var(--radius-4xl), 24px)" },
            "& > img:last-child": { borderBottomLeftRadius: "min(var(--radius-4xl), 24px)", borderBottomRightRadius: "min(var(--radius-4xl), 24px)" },
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        cx(
          "group/card-header",
          css({
            containerType: "inline-size",
            containerName: "card-header",
            display: "grid",
            gridAutoRows: "min-content",
            alignItems: "start",
            gap: "1.5",
            borderTopLeftRadius: "min(var(--radius-4xl), 24px)",
            borderTopRightRadius: "min(var(--radius-4xl), 24px)",
            px: "var(--card-spacing)",
            "&:has([data-slot='card-action'])": { gridTemplateColumns: "1fr auto" },
            "&:has([data-slot='card-description'])": { gridTemplateRows: "auto auto" },
            ".border-b &": { pb: "var(--card-spacing)" },
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        css({
          fontSize: "md",
          fontWeight: "medium",
        }),
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        css({
          fontSize: "sm",
          color: "muted-foreground",
        }),
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        css({
          gridColumnStart: 2,
          gridRowSpan: 2,
          gridRowStart: 1,
          alignSelf: "flex-start",
          justifySelf: "end",
        }),
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        css({
          px: "var(--card-spacing)",
        }),
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        css({
          display: "flex",
          alignItems: "center",
          borderBottomLeftRadius: "min(var(--radius-4xl), 24px)",
          borderBottomRightRadius: "min(var(--radius-4xl), 24px)",
          px: "var(--card-spacing)",
          ".border-t &": { pt: "var(--card-spacing)" },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
