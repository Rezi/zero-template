import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

// shadcn cards round to `min(var(--radius-4xl), 24px)`; reused by several slots.
const cardRadius = "min(var(--radius-4xl), 24px)";
// Tailwind `shadow-sm` composed with `ring-1`. The ring colour is the only part
// that changes between light/dark.
const cardShadow = (ringColor: string) =>
  `0 0 0 1px ${ringColor}, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`;

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
        css({
          display: "flex",
          flexDirection: "column",
          gap: "var(--card-spacing)",
          overflow: "hidden",
          borderRadius: cardRadius,
          bg: "card",
          py: "var(--card-spacing)",
          fontSize: "sm",
          color: "card.foreground",
          boxShadow: cardShadow("color-mix(in oklab, var(--foreground) 5%, transparent)"),
          "--card-spacing": "1.25rem",
          "&:has(> img:first-child)": { pt: "0" },
          "&[data-size='sm']": { "--card-spacing": "1rem" },
          _dark: {
            boxShadow: cardShadow("color-mix(in oklab, var(--foreground) 10%, transparent)"),
          },
          "& > img:first-child": {
            borderTopLeftRadius: cardRadius,
            borderTopRightRadius: cardRadius,
          },
          "& > img:last-child": {
            borderBottomLeftRadius: cardRadius,
            borderBottomRightRadius: cardRadius,
          },
        }),
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
        css({
          containerType: "inline-size",
          containerName: "card-header",
          display: "grid",
          gridAutoRows: "min-content",
          alignItems: "flex-start",
          gap: "1.5",
          borderTopLeftRadius: cardRadius,
          borderTopRightRadius: cardRadius,
          px: "var(--card-spacing)",
          "&:has([data-slot='card-action'])": { gridTemplateColumns: "1fr auto" },
          "&:has([data-slot='card-description'])": { gridTemplateRows: "auto auto" },
          "&.border-b": { pb: "var(--card-spacing)" },
        }),
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
        css({ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: "medium" }),
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
      className={cn(css({ fontSize: "sm", color: "muted.foreground" }), className)}
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
          gridColumnStart: "2",
          gridRow: "span 2 / span 2",
          gridRowStart: "1",
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
      className={cn(css({ px: "var(--card-spacing)" }), className)}
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
          borderBottomLeftRadius: cardRadius,
          borderBottomRightRadius: cardRadius,
          px: "var(--card-spacing)",
          "&.border-t": { pt: "var(--card-spacing)" },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
