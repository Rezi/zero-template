"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { XIcon } from "lucide-react";

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        css({
          position: "fixed",
          inset: "0",
          zIndex: 50,
          bg: "black/30",
          transitionProperty: "opacity",
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          _dataEndingStyle: { opacity: 0 },
          _dataStartingStyle: { opacity: 0 },
          "@supports (backdrop-filter: blur(0))": {
            backdropFilter: "blur(4px)",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          css({
            position: "fixed",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            bg: "popover",
            backgroundClip: "padding-box",
            fontSize: "sm",
            color: "popover-foreground",
            boxShadow: "xl",
            transitionProperty: "all",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-in-out",
            _dataEndingStyle: { opacity: 0 },
            _dataStartingStyle: { opacity: 0 },
            '&[data-side="bottom"]': {
              insetX: "0",
              bottom: "0",
              height: "auto",
              borderTopWidth: "1px",
            },
            '&[data-side="bottom"][data-ending-style]': {
              transform: "translateY(2.5rem)",
            },
            '&[data-side="bottom"][data-starting-style]': {
              transform: "translateY(2.5rem)",
            },
            '&[data-side="left"]': {
              insetY: "0",
              left: "0",
              height: "full",
              width: "3/4",
              borderRightWidth: "1px",
            },
            '&[data-side="left"][data-ending-style]': {
              transform: "translateX(-2.5rem)",
            },
            '&[data-side="left"][data-starting-style]': {
              transform: "translateX(-2.5rem)",
            },
            '&[data-side="right"]': {
              insetY: "0",
              right: "0",
              height: "full",
              width: "3/4",
              borderLeftWidth: "1px",
            },
            '&[data-side="right"][data-ending-style]': {
              transform: "translateX(2.5rem)",
            },
            '&[data-side="right"][data-starting-style]': {
              transform: "translateX(2.5rem)",
            },
            '&[data-side="top"]': {
              insetX: "0",
              top: "0",
              height: "auto",
              borderBottomWidth: "1px",
            },
            '&[data-side="top"][data-ending-style]': {
              transform: "translateY(-2.5rem)",
            },
            '&[data-side="top"][data-starting-style]': {
              transform: "translateY(-2.5rem)",
            },
            '@media (min-width: 640px)': {
              '&[data-side="left"]': { maxWidth: "sm" },
              '&[data-side="right"]': { maxWidth: "sm" },
            },
          }),
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className={css({
                  position: "absolute",
                  top: "4",
                  right: "4",
                  bg: "secondary",
                })}
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span
              className={css({
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: "0",
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
                borderWidth: "0",
              })}
            >
              Close
            </span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        css({
          display: "flex",
          flexDirection: "column",
          gap: "1.5",
          p: "6",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        css({
          mt: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "2",
          p: "6",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        css({
          fontFamily: "heading",
          fontSize: "md",
          fontWeight: "medium",
          color: "foreground",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        css({
          fontSize: "sm",
          color: "muted-foreground",
        }),
        className,
      )}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
