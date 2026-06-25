import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

// shadcn cards round to `min(var(--radius-4xl), 24px)`; reused by several slots.
const cardRadius = "min(var(--radius-4xl), 24px)";
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
      className={clsx(
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

const cardHeaderBorderedStyles = css({
  borderBottomWidth: "1px",
  borderColor: "border",
  pb: "var(--card-spacing)",
});

function CardHeader({
  className,
  bordered,
  ...props
}: React.ComponentProps<"div"> & { bordered?: boolean }) {
  return (
    <div
      data-slot="card-header"
      className={clsx(
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
        }),
        bordered && cardHeaderBorderedStyles,
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
      className={clsx(
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
      className={clsx(css({ fontSize: "sm", color: "muted.foreground" }), className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={clsx(
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
      className={clsx(css({ px: "var(--card-spacing)" }), className)}
      {...props}
    />
  );
}

// Top divider for a footer (the `border-t` counterpart of cardHeaderBorderedStyles).
const cardFooterBorderedStyles = css({
  borderTopWidth: "1px",
  borderColor: "border",
  pt: "var(--card-spacing)",
});

function CardFooter({
  className,
  bordered,
  ...props
}: React.ComponentProps<"div"> & { bordered?: boolean }) {
  return (
    <div
      data-slot="card-footer"
      className={clsx(
        css({
          display: "flex",
          alignItems: "center",
          borderBottomLeftRadius: cardRadius,
          borderBottomRightRadius: cardRadius,
          px: "var(--card-spacing)",
        }),
        bordered && cardFooterBorderedStyles,
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
