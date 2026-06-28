import * as React from "react";
import { empty } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

type EmptyMediaVariantProps = { variant?: "default" | "icon" };

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty" className={clsx(empty().root, className)} {...props} />;
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={clsx(empty().header, className)} {...props} />;
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & EmptyMediaVariantProps) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={clsx(empty({ mediaVariant: variant }).media, className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-title" className={clsx(empty().title, className)} {...props} />;
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={clsx(empty().description, className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="empty-content" className={clsx(empty().content, className)} {...props} />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
export type { EmptyMediaVariantProps };
