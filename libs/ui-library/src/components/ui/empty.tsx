import * as React from "react";
import { cva, css, type RecipeVariantProps } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const emptyStyles = css({
  display: "flex",
  w: "full",
  minW: "0",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4",
  rounded: "3xl",
  borderStyle: "dashed",
  p: "12",
  textAlign: "center",
  textWrap: "balance",
});

const emptyHeaderStyles = css({
  display: "flex",
  maxW: "sm",
  flexDirection: "column",
  alignItems: "center",
  gap: "2",
});

const emptyMediaVariants = cva({
  base: {
    mb: "2",
    display: "flex",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    "& svg": { pointerEvents: "none", flexShrink: "0" },
  },
  variants: {
    variant: {
      default: { bg: "transparent" },
      icon: {
        display: "flex",
        size: "10",
        flexShrink: "0",
        alignItems: "center",
        justifyContent: "center",
        rounded: "xl",
        bg: "muted",
        color: "foreground",
        "& svg:not([class*='size-'])": { size: "5" },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const emptyTitleStyles = css({
  fontFamily: "var(--font-heading)",
  fontSize: "lg",
  fontWeight: "medium",
  letterSpacing: "tight",
});

const emptyDescriptionStyles = css({
  fontSize: "sm",
  lineHeight: "relaxed",
  color: "muted.foreground",
  "& > a": { textDecoration: "underline", textUnderlineOffset: "4px" },
  "& > a:hover": { color: "primary" },
});

const emptyContentStyles = css({
  display: "flex",
  w: "full",
  maxW: "sm",
  minW: "0",
  flexDirection: "column",
  alignItems: "center",
  gap: "4",
  fontSize: "sm",
  textWrap: "balance",
});

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty" className={clsx(emptyStyles, className)} {...props} />;
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={clsx(emptyHeaderStyles, className)} {...props} />;
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & RecipeVariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={clsx(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-title" className={clsx(emptyTitleStyles, className)} {...props} />;
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={clsx(emptyDescriptionStyles, className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="empty-content" className={clsx(emptyContentStyles, className)} {...props} />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
