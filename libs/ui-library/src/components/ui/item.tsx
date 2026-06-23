import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, css, type RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Separator } from "./separator";

const itemGroupStyles = css({
  display: "flex",
  w: "full",
  flexDirection: "column",
  gap: "4",
  "&:has([data-size=sm])": { gap: "2.5" },
  "&:has([data-size=xs])": { gap: "2" },
});

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="list" data-slot="item-group" className={cn(itemGroupStyles, className)} {...props} />;
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn(css({ my: "2" }), className)}
      {...props}
    />
  );
}

const itemVariants = cva({
  base: {
    display: "flex",
    w: "full",
    flexWrap: "wrap",
    alignItems: "center",
    rounded: "2xl",
    borderWidth: "1px",
    fontSize: "sm",
    transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
    transitionDuration: "100ms",
    outline: "none",
    _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/50" },
    "&:is(a)": {
      transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
      _hover: { bg: "muted" },
    },
  },
  variants: {
    variant: {
      default: { borderColor: "transparent" },
      outline: { borderColor: "border" },
      muted: { borderColor: "transparent", bg: "muted/50" },
    },
    size: {
      default: { gap: "3.5", px: "4", py: "3.5" },
      sm: { gap: "3.5", px: "3.5", py: "3" },
      xs: { gap: "2", px: "2.5", py: "2", "[data-slot=dropdown-menu-content] &": { p: "0" } },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & RecipeVariantProps<typeof itemVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  });
}

const itemMediaVariants = cva({
  base: {
    display: "flex",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    "[data-slot='item']:has([data-slot=item-description]) &": {
      transform: "translateY(0.125rem)",
      alignSelf: "flex-start",
    },
    "& svg": { pointerEvents: "none" },
  },
  variants: {
    variant: {
      default: { bg: "transparent" },
      icon: { "& svg:not([class*='size-'])": { size: "4" } },
      image: {
        size: "10",
        overflow: "hidden",
        rounded: "xl",
        "[data-slot='item'][data-size='sm'] &": { size: "8" },
        "[data-slot='item'][data-size='xs'] &": { size: "6", rounded: "lg" },
        "& img": { size: "full", objectFit: "cover" },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & RecipeVariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

const itemContentStyles = css({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  gap: "1",
  "[data-slot='item'][data-size='xs'] &": { gap: "0.5" },
  "& + [data-slot=item-content]": { flex: "none" },
});

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn(itemContentStyles, className)} {...props} />;
}

const itemTitleStyles = css({
  display: "flex",
  w: "fit",
  alignItems: "center",
  gap: "2",
  overflow: "hidden",
  fontSize: "sm",
  lineHeight: "snug",
  fontWeight: "medium",
  textUnderlineOffset: "4px",
});

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-title" className={cn(itemTitleStyles, className)} {...props} />;
}

const itemDescriptionStyles = css({
  lineClamp: "2",
  textAlign: "left",
  fontSize: "sm",
  fontWeight: "normal",
  color: "muted.foreground",
  "& > a": { textDecoration: "underline", textUnderlineOffset: "4px" },
  "& > a:hover": { color: "primary" },
});

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-description" className={cn(itemDescriptionStyles, className)} {...props} />;
}

const itemActionsStyles = css({ display: "flex", alignItems: "center", gap: "2" });

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn(itemActionsStyles, className)} {...props} />;
}

const itemHeaderFooterStyles = css({
  display: "flex",
  flexBasis: "full",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "2",
});

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-header" className={cn(itemHeaderFooterStyles, className)} {...props} />;
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-footer" className={cn(itemHeaderFooterStyles, className)} {...props} />;
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
