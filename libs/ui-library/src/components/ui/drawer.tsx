"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const drawerOverlayStyles = css({
  position: "fixed",
  inset: "0",
  zIndex: "50",
  bg: "black/30",
  "@supports ((backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0)))": {
    backdropFilter: "blur(4px)",
  },
});

// Enter/exit animations kept as literal Tailwind (tw-animate-css) — ported later as a dedicated pass.
const drawerOverlayAnimations =
  "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0";

const drawerContentStyles = css({
  position: "fixed",
  zIndex: "50",
  display: "flex",
  h: "auto",
  flexDirection: "column",
  bg: "transparent",
  p: "4",
  fontSize: "sm",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "2",
    zIndex: "-10",
    borderRadius: "min(var(--radius-4xl), 24px)",
    borderWidth: "1px",
    borderColor: "border",
    bg: "popover",
    boxShadow: "xl",
  },
  "&[data-vaul-drawer-direction='bottom']": {
    insetInline: "0",
    bottom: "0",
    mt: "24",
    maxH: "80vh",
  },
  "&[data-vaul-drawer-direction='left']": {
    insetBlock: "0",
    left: "0",
    w: "75%",
    sm: { maxW: "sm" },
  },
  "&[data-vaul-drawer-direction='right']": {
    insetBlock: "0",
    right: "0",
    w: "75%",
    sm: { maxW: "sm" },
  },
  "&[data-vaul-drawer-direction='top']": {
    insetInline: "0",
    top: "0",
    mb: "24",
    maxH: "80vh",
  },
});

const drawerHandleStyles = css({
  mx: "auto",
  mt: "4",
  display: "none",
  h: "1.5",
  w: "100px",
  flexShrink: "0",
  rounded: "full",
  bg: "muted",
  "[data-slot='drawer-content'][data-vaul-drawer-direction='bottom'] &": { display: "block" },
});

const drawerHeaderStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5",
  p: "4",
  md: { gap: "1.5", textAlign: "left" },
  "[data-slot='drawer-content'][data-vaul-drawer-direction='bottom'] &": { textAlign: "center" },
  "[data-slot='drawer-content'][data-vaul-drawer-direction='top'] &": { textAlign: "center" },
});

const drawerFooterStyles = css({
  mt: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "2",
  p: "4",
});

const drawerTitleStyles = css({
  fontFamily: "var(--font-heading)",
  fontSize: "1rem",
  fontWeight: "medium",
  color: "foreground",
});

const drawerDescriptionStyles = css({ fontSize: "sm", color: "muted.foreground" });

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(drawerOverlayStyles, drawerOverlayAnimations, className)}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(drawerContentStyles, className)}
        {...props}
      >
        <div className={drawerHandleStyles} />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="drawer-header" className={cn(drawerHeaderStyles, className)} {...props} />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="drawer-footer" className={cn(drawerFooterStyles, className)} {...props} />
  );
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(drawerTitleStyles, className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(drawerDescriptionStyles, className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
