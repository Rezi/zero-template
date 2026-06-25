import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { contentAnimationStyles, overlayAnimationStyles } from "../../lib/animations";
import { Button } from "./button";
import { XIcon } from "lucide-react";

const shadowXl = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";

const dialogOverlayStyles = css({
  position: "fixed",
  inset: "0",
  isolation: "isolate",
  zIndex: "50",
  bg: "black/30",
  "@supports ((backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0)))": {
    backdropFilter: "blur(4px)",
  },
});

const dialogContentStyles = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: "50",
  display: "grid",
  w: "full",
  maxW: "calc(100% - 2rem)",
  transform: "translate(-50%, -50%)",
  gap: "6",
  borderRadius: "min(var(--radius-4xl), 24px)",
  bg: "popover",
  p: "6",
  fontSize: "sm",
  color: "popover.foreground",
  // shadow-xl + ring-1 ring-foreground/5 composed into one box-shadow
  boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowXl}`,
  outline: "none",
  sm: { maxW: "md" },
  _dark: {
    boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowXl}`,
  },
});

const dialogCloseButtonStyles = css({
  position: "absolute",
  top: "4",
  right: "4",
  bg: "secondary",
});

const dialogHeaderStyles = css({ display: "flex", flexDirection: "column", gap: "1.5" });

const dialogFooterStyles = css({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "2",
  sm: { flexDirection: "row", justifyContent: "flex-end" },
});

const dialogTitleStyles = css({
  fontFamily: "var(--font-heading)",
  fontSize: "1rem",
  lineHeight: "none",
  fontWeight: "medium",
});

const dialogDescriptionStyles = css({
  fontSize: "sm",
  color: "muted.foreground",
  "& > a": { textDecoration: "underline", textUnderlineOffset: "3px" },
  "& > a:hover": { color: "foreground" },
});

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
      className={cn(dialogOverlayStyles, overlayAnimationStyles, className)}
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
        className={cn(dialogContentStyles, contentAnimationStyles, className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={<Button variant="ghost" className={dialogCloseButtonStyles} size="icon-sm" />}
          >
            <XIcon />
            <span className={css({ srOnly: true })}>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn(dialogHeaderStyles, className)} {...props} />;
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
    <div data-slot="dialog-footer" className={cn(dialogFooterStyles, className)} {...props}>
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
      className={cn(dialogTitleStyles, className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(dialogDescriptionStyles, className)}
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
