"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { Button } from "./button";

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
      className={cn(
        css({
          position: 'fixed',
          inset: '0',
          isolation: 'isolate',
          zIndex: 50,
          bg: 'black/30',
          transitionDuration: '100ms',
          '@supports (backdrop-filter: blur(0))': { backdropFilter: 'blur(4px)' },
          _dataOpen: {
            animationName: 'enter',
            animationDuration: '100ms',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            animationFillMode: 'both',
            '--enter-opacity': '0',
          },
          _dataClosed: {
            animationName: 'exit',
            animationDuration: '100ms',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            animationFillMode: 'both',
            '--exit-opacity': '0',
          },
        }),
        className,
      )}
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
        className={cn(
          cx(
            "group/alert-dialog-content",
            css({
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 50,
              display: 'grid',
              width: 'full',
              translateX: '-50%',
              translateY: '-50%',
              gap: '6',
              borderRadius: 'min(var(--radius-4xl), 24px)',
              bg: 'popover',
              p: '6',
              color: 'popover-foreground',
              boxShadow: 'xl',
              outline: 'none',
              transitionDuration: '100ms',
              '&[data-size="default"]': { maxWidth: 'xs', '@media (min-width: 640px)': { maxWidth: 'md' } },
              '&[data-size="sm"]': { maxWidth: 'xs' },
              _dark: {
                boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
              },
              boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)',
              _dataOpen: {
                animationName: 'enter',
                animationDuration: '100ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                animationFillMode: 'both',
                '--enter-opacity': '0',
                '--enter-scale': '.95',
              },
              _dataClosed: {
                animationName: 'exit',
                animationDuration: '100ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                animationFillMode: 'both',
                '--exit-opacity': '0',
                '--exit-scale': '.95',
              },
            }),
          ),
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        css({
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          placeItems: 'center',
          gap: '1.5',
          textAlign: 'center',
          '&:has([data-slot="alert-dialog-media"])': {
            gridTemplateRows: 'auto auto 1fr',
            columnGap: '6',
          },
          '.group\\/alert-dialog-content[data-size="default"] &': {
            '@media (min-width: 640px)': {
              placeItems: 'start',
              textAlign: 'left',
              '&:has([data-slot="alert-dialog-media"])': {
                gridTemplateRows: 'auto 1fr',
              },
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '2',
          '.group\\/alert-dialog-content[data-size="sm"] &': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (min-width: 640px)': {
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        css({
          mb: '2',
          display: 'inline-flex',
          width: '16',
          height: '16',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'full',
          bg: 'muted',
          '.group\\/alert-dialog-content[data-size="default"] &': {
            '@media (min-width: 640px)': { gridRowSpan: 2 },
          },
          '& svg:not([class*="size-"])': { width: '8', height: '8' },
        }),
        className,
      )}
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
      className={cn(
        css({
          fontSize: 'lg',
          fontWeight: 'medium',
          '.group\\/alert-dialog-content[data-size="default"]:has([data-slot="alert-dialog-media"]) &': {
            '@media (min-width: 640px)': { gridColumnStart: 2 },
          },
        }),
        className,
      )}
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
      className={cn(
        css({
          fontSize: 'sm',
          textWrap: 'balance',
          color: 'muted-foreground',
          '@media (min-width: 768px)': { textWrap: 'pretty' },
          '& a': {
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            _hover: { color: 'foreground' },
          },
        }),
        className,
      )}
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
