import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { item, type ItemVariantProps } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
import { Separator } from "./separator";

type ItemMediaVariantProps = { variant?: "default" | "icon" | "image" };

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={clsx(item().group, className)}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={clsx(item().separator, className)}
      {...props}
    />
  );
}

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & ItemVariantProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: clsx(item({ variant, size }).root, className),
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

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & ItemMediaVariantProps) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={clsx(item({ mediaVariant: variant }).media, className)}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={clsx(item().content, className)} {...props} />;
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-title" className={clsx(item().title, className)} {...props} />;
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="item-description" className={clsx(item().description, className)} {...props} />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={clsx(item().actions, className)} {...props} />;
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-header" className={clsx(item().header, className)} {...props} />;
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-footer" className={clsx(item().footer, className)} {...props} />;
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
export type { ItemMediaVariantProps };
