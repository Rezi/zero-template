import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { XIcon } from "lucide-react";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        css({
          position: 'fixed',
          inset: '0',
          isolation: 'isolate',
          zIndex: 50,
          bg: 'black/30',
          transitionDuration: '100ms',
          '@supports (backdrop-filter: blur(0))': {
            backdropFilter: 'blur(4px)',
          },
          _dataOpen: {
            animationName: 'enter',
            animationDuration: '150ms',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            animationFillMode: 'both',
            '--enter-opacity': '0',
          },
          _dataClosed: {
            animationName: 'exit',
            animationDuration: '150ms',
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

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          css({
            position: 'fixed',
            top: '1/2',
            left: '1/2',
            zIndex: 50,
            display: 'grid',
            width: 'full',
            maxWidth: 'calc(100% - 2rem)',
            translateX: '-50%',
            translateY: '-50%',
            gap: '6',
            borderRadius: 'min(2rem, 24px)',
            bg: 'popover',
            p: '6',
            fontSize: 'sm',
            color: 'popover-foreground',
            boxShadow: 'xl',
            outline: 'none',
            transitionDuration: '100ms',
            '@media (min-width: 640px)': {
              maxWidth: 'md',
            },
            _dark: {
              boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
            },
            _dataOpen: {
              animationName: 'enter',
              animationDuration: '150ms',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              animationFillMode: 'both',
              '--enter-opacity': '0',
              '--enter-scale': '.95',
            },
            _dataClosed: {
              animationName: 'exit',
              animationDuration: '150ms',
              animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              animationFillMode: 'both',
              '--exit-opacity': '0',
              '--exit-scale': '.95',
            },
          }),
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className={css({
                  position: 'absolute',
                  top: '4',
                  right: '4',
                  bg: 'secondary',
                })}
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className={css({
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: '0',
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)',
              whiteSpace: 'nowrap',
              borderWidth: '0',
            })}>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5',
        }),
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '2',
          '@media (min-width: 640px)': {
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
        }),
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        css({
          fontFamily: 'heading',
          fontSize: 'md',
          lineHeight: 'none',
          fontWeight: 'medium',
        }),
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        css({
          fontSize: 'sm',
          color: 'muted-foreground',
          '& a': {
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            _hover: {
              color: 'foreground',
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
