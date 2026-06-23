"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { CheckIcon } from "lucide-react";

const menubarStyles = css({
  display: "flex",
  h: "8",
  alignItems: "center",
  rounded: "2xl",
  borderWidth: "1px",
  p: "3px",
});

const menubarTriggerStyles = css({
  display: "flex",
  alignItems: "center",
  rounded: "2xl",
  px: "1.5",
  py: "2px",
  fontSize: "sm",
  fontWeight: "medium",
  outline: "none",
  userSelect: "none",
  _hover: { bg: "muted" },
  "&[aria-expanded='true']": { bg: "muted" },
});

// Overrides the dropdown content base (minW:32 → 36); `!important` beats the
// non-important base value (Panda atomics don't twMerge-dedupe).
const menubarContentStyles = css({ minW: "36!" });

const menubarItemStyles = css({
  minH: "7",
  gap: "2",
  rounded: "xl",
  px: "2",
  py: "1.5",
  fontSize: "sm",
  _focus: { bg: "accent", color: "accent.foreground" },
  "&:not([data-variant=destructive]):focus *": { color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&[data-variant=destructive]": { color: "destructive" },
  "&[data-variant=destructive]:focus": { bg: "destructive/10", color: "destructive" },
  "&:where([data-disabled]:not([data-disabled='false']))": { opacity: "0.5" },
  "& svg:not([class*='size-'])": { size: "4" },
  "&[data-variant=destructive] > svg": { color: "destructive!" },
  _dark: { "&[data-variant=destructive]:focus": { bg: "destructive/20" } },
});

const menubarCheckboxItemStyles = css({
  position: "relative",
  display: "flex",
  minH: "7",
  cursor: "default",
  alignItems: "center",
  gap: "2",
  rounded: "xl",
  py: "1.5",
  pr: "1.5",
  pl: "7",
  fontSize: "sm",
  outline: "none",
  userSelect: "none",
  _focus: { bg: "accent", color: "accent.foreground" },
  "&:focus *": { color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&:where([data-disabled]:not([data-disabled='false']))": {
    pointerEvents: "none",
    opacity: "0.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
});

const menubarRadioItemStyles = css({
  position: "relative",
  display: "flex",
  minH: "7",
  cursor: "default",
  alignItems: "center",
  gap: "2",
  rounded: "xl",
  py: "1.5",
  pr: "1.5",
  pl: "7",
  fontSize: "sm",
  outline: "none",
  userSelect: "none",
  _focus: { bg: "accent", color: "accent.foreground" },
  "&:focus *": { color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&:where([data-disabled]:not([data-disabled='false']))": {
    pointerEvents: "none",
    opacity: "0.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
});

const menubarIndicatorStyles = css({
  pointerEvents: "none",
  position: "absolute",
  left: "1.5",
  display: "flex",
  size: "4",
  alignItems: "center",
  justifyContent: "center",
  "& svg:not([class*='size-'])": { size: "4" },
});

const menubarLabelStyles = css({ fontSize: "sm!" });

const menubarShortcutStyles = css({
  "[data-slot='menubar-item']:focus &": { color: "accent.foreground" },
});

// Overrides the dropdown sub-content base (minW:96px! → 32). Needs the
// data-slot self-selector so its `!important` beats the base's `!important`
// (higher specificity wins among important declarations).
const menubarSubContentStyles = css({
  "&[data-slot='menubar-sub-content']": { minW: "32!" },
});

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return <MenubarPrimitive data-slot="menubar" className={cn(menubarStyles, className)} {...props} />;
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />;
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />;
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(menubarTriggerStyles, className)}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(menubarContentStyles, className)}
      {...props}
    />
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(menubarItemStyles, className)}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      className={cn(menubarCheckboxItemStyles, className)}
      checked={checked}
      {...props}
    >
      <span className={menubarIndicatorStyles}>
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      className={cn(menubarRadioItemStyles, className)}
      {...props}
    >
      <span className={menubarIndicatorStyles}>
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuLabel
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(menubarLabelStyles, className)}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator data-slot="menubar-separator" className={cn(className)} {...props} />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={cn(menubarShortcutStyles, className)}
      {...props}
    />
  );
}

function MenubarSub({ ...props }: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(className)}
      {...props}
    />
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      className={cn(menubarSubContentStyles, className)}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
