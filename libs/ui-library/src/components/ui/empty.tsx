import { css, cva, cx } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        css({
          display: "flex",
          width: "full",
          minWidth: "0",
          flex: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4",
          borderRadius: "3xl",
          borderStyle: "dashed",
          p: "12",
          textAlign: "center",
          textWrap: "balance",
        }),
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        css({
          display: "flex",
          maxWidth: "sm",
          flexDirection: "column",
          alignItems: "center",
          gap: "2",
        }),
        className,
      )}
      {...props}
    />
  );
}

const emptyMediaVariants = cva({
  base: {
    mb: "2",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      pointerEvents: "none",
      flexShrink: 0,
    },
  },
  variants: {
    variant: {
      default: {
        bg: "transparent",
      },
      icon: {
        display: "flex",
        width: "10",
        height: "10",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "xl",
        bg: "muted",
        color: "foreground",
        "& svg:not([class*='size-'])": {
          width: "5",
          height: "5",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & RecipeVariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        css({
          fontFamily: "heading",
          fontSize: "lg",
          fontWeight: "medium",
          letterSpacing: "tight",
        }),
        className,
      )}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        css({
          fontSize: "sm",
          lineHeight: "relaxed",
          color: "muted-foreground",
          "& > a": {
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          },
          "& > a:hover": {
            color: "primary",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        css({
          display: "flex",
          width: "full",
          maxWidth: "sm",
          minWidth: "0",
          flexDirection: "column",
          alignItems: "center",
          gap: "4",
          fontSize: "sm",
          textWrap: "balance",
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
