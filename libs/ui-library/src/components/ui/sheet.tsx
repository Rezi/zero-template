"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { XIcon } from "lucide-react";

const sheetOverlayStyles = css({
  position: "fixed",
  inset: "0",
  zIndex: "50",
  bg: "black/30",
  transitionProperty: "opacity",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  "&[data-ending-style]": { opacity: "0" },
  "&[data-starting-style]": { opacity: "0" },
  "@supports ((backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0)))": {
    backdropFilter: "blur(4px)",
  },
});

const sheetContentStyles = css({
  position: "fixed",
  zIndex: "50",
  display: "flex",
  flexDirection: "column",
  bg: "popover",
  backgroundClip: "padding-box",
  fontSize: "sm",
  color: "popover.foreground",
  boxShadow: "xl",
  transitionProperty: "opacity, translate",
  transitionTimingFunction: "ease-in-out",
  transitionDuration: "200ms",
  "&[data-ending-style]": { opacity: "0" },
  "&[data-starting-style]": { opacity: "0" },
  "&[data-side='bottom']": {
    insetInline: "0",
    bottom: "0",
    h: "auto",
    borderTopWidth: "1px",
    "&[data-ending-style]": { translate: "0 2.5rem" },
    "&[data-starting-style]": { translate: "0 2.5rem" },
  },
  "&[data-side='left']": {
    insetBlock: "0",
    left: "0",
    h: "full",
    w: "75%",
    borderRightWidth: "1px",
    sm: { maxW: "sm" },
    "&[data-ending-style]": { translate: "-2.5rem" },
    "&[data-starting-style]": { translate: "-2.5rem" },
  },
  "&[data-side='right']": {
    insetBlock: "0",
    right: "0",
    h: "full",
    w: "75%",
    borderLeftWidth: "1px",
    sm: { maxW: "sm" },
    "&[data-ending-style]": { translate: "2.5rem" },
    "&[data-starting-style]": { translate: "2.5rem" },
  },
  "&[data-side='top']": {
    insetInline: "0",
    top: "0",
    h: "auto",
    borderBottomWidth: "1px",
    "&[data-ending-style]": { translate: "0 -2.5rem" },
    "&[data-starting-style]": { translate: "0 -2.5rem" },
  },
});

const sheetCloseButtonStyles = css({ position: "absolute", top: "4", right: "4", bg: "secondary" });

const sheetHeaderStyles = css({ display: "flex", flexDirection: "column", gap: "1.5", p: "6" });

const sheetFooterStyles = css({
  mt: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "2",
  p: "6",
});

const sheetTitleStyles = css({
  fontFamily: "var(--font-heading)",
  fontSize: "1rem",
  fontWeight: "medium",
  color: "foreground",
});

const sheetDescriptionStyles = css({ fontSize: "sm", color: "muted.foreground" });

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
      className={cn(sheetOverlayStyles, className)}
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
        className={cn(sheetContentStyles, className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" className={sheetCloseButtonStyles} size="icon-sm" />}
          >
            <XIcon />
            <span className={css({ srOnly: true })}>Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn(sheetHeaderStyles, className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn(sheetFooterStyles, className)} {...props} />;
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(sheetTitleStyles, className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(sheetDescriptionStyles, className)}
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
