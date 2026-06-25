import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { popoverAnimationStyles } from "../../lib/animations";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";

const dropdownPositionerStyles = css({ isolation: "isolate", zIndex: "50", outline: "none" });

const dropdownContentStyles = css({
  zIndex: "50",
  maxH: "var(--available-height)",
  w: "var(--anchor-width)",
  minW: "32",
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

// `overflow: hidden` while closing prevents submenu content from spilling during
// the exit animation; the enter/exit motion itself comes from popoverAnimationStyles.
const dropdownContentClosedOverflow = css({ "&[data-ending-style]": { overflow: "hidden" } });

const dropdownSubContentStyles = css({ w: "auto!", minW: "96px!" });

const dropdownLabelStyles = css({
  px: "2",
  py: "1",
  fontSize: "xs",
  color: "muted.foreground",
  "&[data-inset]": { pl: "7" },
});

const dropdownItemStyles = css({
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
  "&:not([data-variant=destructive]):focus *": { color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&[data-variant=destructive]": { color: "destructive" },
  "&[data-variant=destructive]:focus": { bg: "destructive/10", color: "destructive" },
  "&:where([data-disabled]:not([data-disabled='false']))": {
    pointerEvents: "none",
    opacity: "0.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
  "&[data-variant=destructive] > svg": { color: "destructive" },
  _dark: { "&[data-variant=destructive]:focus": { bg: "destructive/20" } },
});

const dropdownSubTriggerStyles = css({
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
  "&:not([data-variant=destructive]):focus *": { color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&[data-popup-open]": { bg: "accent", color: "accent.foreground" },
  "&:where([data-state='open'], [data-open]:not([data-open='false']))": {
    bg: "accent",
    color: "accent.foreground",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
});

const dropdownCheckRadioItemStyles = css({
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
  "&:focus *": { color: "accent.foreground" },
  "&[data-inset]": { pl: "7" },
  "&:where([data-disabled]:not([data-disabled='false']))": {
    pointerEvents: "none",
    opacity: "0.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
});

const dropdownIndicatorStyles = css({
  pointerEvents: "none",
  position: "absolute",
  right: "2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const dropdownSeparatorStyles = css({ mx: "-1", my: "1", h: "1px", bg: "border/50" });

const dropdownShortcutStyles = css({
  ml: "auto",
  fontSize: "xs",
  letterSpacing: "widest",
  color: "muted.foreground",
  "[data-slot='dropdown-menu-item']:focus &": { color: "accent.foreground" },
});

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className={dropdownPositionerStyles}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            dropdownContentStyles,
            popoverAnimationStyles,
            dropdownContentClosedOverflow,
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(dropdownLabelStyles, className)}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(dropdownItemStyles, className)}
      {...props}
    />
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(dropdownSubTriggerStyles, className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className={css({ ml: "auto" })} />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(dropdownSubContentStyles, className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
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
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(dropdownCheckRadioItemStyles, className)}
      checked={checked}
      {...props}
    >
      <span className={dropdownIndicatorStyles} data-slot="dropdown-menu-checkbox-item-indicator">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(dropdownCheckRadioItemStyles, className)}
      {...props}
    >
      <span className={dropdownIndicatorStyles} data-slot="dropdown-menu-radio-item-indicator">
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(dropdownSeparatorStyles, className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(dropdownShortcutStyles, className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
