"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { contentAnimationStyles, overlayAnimationStyles } from "../../lib/animations";
import { Button } from "./button";

const shadowXl = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";

const alertDialogOverlayStyles = css({
  position: "fixed",
  inset: "0",
  isolation: "isolate",
  zIndex: "50",
  bg: "black/30",
  "@supports ((backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0)))": {
    backdropFilter: "blur(4px)",
  },
});

const alertDialogContentStyles = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: "50",
  display: "grid",
  w: "full",
  transform: "translate(-50%, -50%)",
  gap: "6",
  borderRadius: "min(var(--radius-4xl), 24px)",
  bg: "popover",
  p: "6",
  color: "popover.foreground",
  // shadow-xl + ring-1 ring-foreground/5 composed into one box-shadow
  boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowXl}`,
  outline: "none",
  "&[data-size='default']": { maxW: "xs", sm: { maxW: "md" } },
  "&[data-size='sm']": { maxW: "xs" },
  _dark: {
    boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowXl}`,
  },
});

const alertDialogHeaderStyles = css({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  placeItems: "center",
  gap: "1.5",
  textAlign: "center",
  "&:has([data-slot=alert-dialog-media])": {
    gridTemplateRows: "auto auto 1fr",
    columnGap: "6",
  },
  "[data-slot='alert-dialog-content'][data-size='default'] &": {
    sm: {
      placeItems: "start",
      textAlign: "left",
      "&:has([data-slot=alert-dialog-media])": { gridTemplateRows: "auto 1fr" },
    },
  },
});

const alertDialogFooterStyles = css({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "2",
  sm: { flexDirection: "row", justifyContent: "flex-end" },
  "[data-slot='alert-dialog-content'][data-size='sm'] &": {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
});

const alertDialogMediaStyles = css({
  mb: "2",
  display: "inline-flex",
  size: "16",
  alignItems: "center",
  justifyContent: "center",
  rounded: "full",
  bg: "muted",
  "& > svg:not([class*='size-'])": { size: "8" },
  "[data-slot='alert-dialog-content'][data-size='default'] &": {
    sm: { gridRow: "span 2 / span 2" },
  },
});

const alertDialogTitleStyles = css({
  fontFamily: "var(--font-heading)",
  fontSize: "lg",
  fontWeight: "medium",
  "[data-slot='alert-dialog-content'][data-size='default']:has([data-slot='alert-dialog-media']) &":
    {
      sm: { gridColumnStart: "2" },
    },
});

const alertDialogDescriptionStyles = css({
  fontSize: "sm",
  textWrap: "balance",
  color: "muted.foreground",
  md: { textWrap: "pretty" },
  "& > a": { textDecoration: "underline", textUnderlineOffset: "3px" },
  "& > a:hover": { color: "foreground" },
});

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(alertDialogOverlayStyles, overlayAnimationStyles, className)}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm";
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(alertDialogContentStyles, contentAnimationStyles, className)}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(alertDialogHeaderStyles, className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(alertDialogFooterStyles, className)}
      {...props}
    />
  );
}

function AlertDialogMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(alertDialogMediaStyles, className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(alertDialogTitleStyles, className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(alertDialogDescriptionStyles, className)}
      {...props}
    />
  );
}

function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="alert-dialog-action" className={cn(className)} {...props} />;
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
