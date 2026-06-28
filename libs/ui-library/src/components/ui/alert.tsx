import * as React from "react";
import { alert, type AlertVariantProps } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & AlertVariantProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={clsx(alert({ variant }).root, className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={clsx(alert().title, className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-description" className={clsx(alert().description, className)} {...props} />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-action" className={clsx(alert().action, className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
