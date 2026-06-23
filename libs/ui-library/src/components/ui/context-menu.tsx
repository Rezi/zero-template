"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";

const contextMenuTriggerStyles = css({ userSelect: "none" });
const contextMenuPositionerStyles = css({ isolation: "isolate", zIndex: "50", outline: "none" });

const contextMenuContentStyles = css({
  zIndex: "50",
  maxH: "var(--available-height)",
  minW: "36",
  transformOrigin: "var(--transform-origin)",
  overflowX: "hidden",
  overflowY: "auto",
  rounded: "2xl",
  bg: "popover",
  p: "1",
  color: "popover.foreground",
  outline: "none",
  boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowLg}`,
  _dark: {
    boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowLg}`,
  },
});

// Enter/exit animations kept as literal Tailwind (tw-animate-css) — ported later as a dedicated pass.
const contextMenuContentAnimations =
  "duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

const contextMenuLabelStyles = css({
  px: "2",
  py: "1",
  fontSize: "xs",
  color: "muted.foreground",
  "&[data-inset]": { pl: "7" },
});

const contextMenuItemStyles = css({
  position: "relative",
  display: "flex",
  minH: "7",
  cursor: "default",
  alignItems: "center",
  gap: "2",
  rounded: "xl",
  px: "2",
  py: "1.5",
  fontSize: "sm",
  outline: "none",
  userSelect: "none",
  _focus: { bg: "accent", color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&[data-variant=destructive]": { color: "destructive" },
  "&[data-variant=destructive]:focus": { bg: "destructive/10", color: "destructive" },
  "&:where([data-disabled]:not([data-disabled='false']))": {
    pointerEvents: "none",
    opacity: "0.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
  "&:focus > svg": { color: "accent.foreground" },
  "&[data-variant=destructive] > svg": { color: "destructive" },
  _dark: { "&[data-variant=destructive]:focus": { bg: "destructive/20" } },
});

const contextMenuSubTriggerStyles = css({
  display: "flex",
  minH: "7",
  cursor: "default",
  alignItems: "center",
  rounded: "xl",
  px: "2",
  py: "1.5",
  fontSize: "sm",
  outline: "none",
  userSelect: "none",
  _focus: { bg: "accent", color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&:where([data-state='open'], [data-open]:not([data-open='false']))": {
    bg: "accent",
    color: "accent.foreground",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
});

const contextMenuCheckRadioItemStyles = css({
  position: "relative",
  display: "flex",
  minH: "7",
  cursor: "default",
  alignItems: "center",
  gap: "2",
  rounded: "xl",
  py: "1.5",
  pr: "8",
  pl: "2",
  fontSize: "sm",
  outline: "none",
  userSelect: "none",
  _focus: { bg: "accent", color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&:where([data-disabled]:not([data-disabled='false']))": {
    pointerEvents: "none",
    opacity: "0.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
});

const contextMenuIndicatorStyles = css({ pointerEvents: "none", position: "absolute", right: "2" });
const contextMenuSeparatorStyles = css({ mx: "-1", my: "1", h: "1px", bg: "border/50" });
const contextMenuShortcutStyles = css({
  ml: "auto",
  fontSize: "xs",
  letterSpacing: "widest",
  color: "muted.foreground",
  "[data-slot='context-menu-item']:focus &": { color: "accent.foreground" },
});

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />;
}

function ContextMenuTrigger({ className, ...props }: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn(contextMenuTriggerStyles, className)}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className={contextMenuPositionerStyles}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(contextMenuContentStyles, contextMenuContentAnimations, className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(contextMenuLabelStyles, className)}
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(contextMenuItemStyles, className)}
      {...props}
    />
  );
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />;
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(contextMenuSubTriggerStyles, className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className={css({ ml: "auto" })} />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

function ContextMenuSubContent({ ...props }: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent data-slot="context-menu-sub-content" side="right" {...props} />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(contextMenuCheckRadioItemStyles, className)}
      checked={checked}
      {...props}
    >
      <span className={contextMenuIndicatorStyles}>
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioGroup({ ...props }: ContextMenuPrimitive.RadioGroup.Props) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(contextMenuCheckRadioItemStyles, className)}
      {...props}
    >
      <span className={contextMenuIndicatorStyles}>
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuSeparator({ className, ...props }: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn(contextMenuSeparatorStyles, className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(contextMenuShortcutStyles, className)}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
