"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { css, cx } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

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
      className={cn(
        css({
          position: "fixed",
          inset: "0",
          zIndex: 50,
          bg: "black/30",
          "@supports (backdrop-filter: blur(0))": {
            backdropFilter: "blur(4px)",
          },
          _dataOpen: {
            animationName: "enter",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--enter-opacity": "0",
          },
          _dataClosed: {
            animationName: "exit",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--exit-opacity": "0",
          },
        }),
        className,
      )}
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
        className={cn(
          cx(
            "group/drawer-content",
            css({
              position: "fixed",
              zIndex: 50,
              display: "flex",
              height: "auto",
              flexDirection: "column",
              bg: "transparent",
              p: "4",
              fontSize: "sm",
              _before: {
                content: '""',
                position: "absolute",
                inset: "2",
                zIndex: -10,
                borderRadius: "min(2rem, 24px)",
                borderWidth: "1px",
                borderColor: "border",
                bg: "popover",
                boxShadow: "xl",
              },
              '&[data-vaul-drawer-direction="bottom"]': {
                insetX: "0",
                bottom: "0",
                mt: "24",
                maxHeight: "80vh",
              },
              '&[data-vaul-drawer-direction="left"]': {
                insetY: "0",
                left: "0",
                width: "3/4",
                "@media (min-width: 640px)": {
                  maxWidth: "sm",
                },
              },
              '&[data-vaul-drawer-direction="right"]': {
                insetY: "0",
                right: "0",
                width: "3/4",
                "@media (min-width: 640px)": {
                  maxWidth: "sm",
                },
              },
              '&[data-vaul-drawer-direction="top"]': {
                insetX: "0",
                top: "0",
                mb: "24",
                maxHeight: "80vh",
              },
            }),
          ),
          className,
        )}
        {...props}
      >
        <div
          className={css({
            mx: "auto",
            mt: "4",
            display: "none",
            height: "1.5",
            width: "100px",
            flexShrink: 0,
            borderRadius: "full",
            bg: "muted",
            '.group\/drawer-content[data-vaul-drawer-direction="bottom"] &': {
              display: "block",
            },
          })}
        />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        css({
          display: "flex",
          flexDirection: "column",
          gap: "0.5",
          p: "4",
          '.group\/drawer-content[data-vaul-drawer-direction="bottom"] &': {
            textAlign: "center",
          },
          '.group\/drawer-content[data-vaul-drawer-direction="top"] &': {
            textAlign: "center",
          },
          "@media (min-width: 768px)": {
            gap: "1.5",
            textAlign: "left",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        css({
          mt: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "2",
          p: "4",
        }),
        className,
      )}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
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

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
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
