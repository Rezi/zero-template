import * as React from "react";
import { card } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={clsx(card().root, className)}
      {...props}
    />
  );
}

function CardHeader({
  className,
  bordered,
  ...props
}: React.ComponentProps<"div"> & { bordered?: boolean }) {
  return (
    <div
      data-slot="card-header"
      className={clsx(card({ headerBordered: bordered }).header, className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={clsx(card().title, className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={clsx(card().description, className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={clsx(card().action, className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={clsx(card().content, className)}
      {...props}
    />
  );
}

function CardFooter({
  className,
  bordered,
  ...props
}: React.ComponentProps<"div"> & { bordered?: boolean }) {
  return (
    <div
      data-slot="card-footer"
      className={clsx(card({ footerBordered: bordered }).footer, className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
