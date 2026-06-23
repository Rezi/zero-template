"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { InputGroup, InputGroupAddon } from "./input-group";
import { SearchIcon, CheckIcon } from "lucide-react";

const commandStyles = css({
  display: "flex",
  size: "full",
  flexDirection: "column",
  overflow: "hidden",
  rounded: "3xl",
  bg: "popover",
  p: "1",
  color: "popover.foreground",
});

const commandDialogContentStyles = css({
  top: "33.333333%",
  // override DialogContent's translate(-50%,-50%) — `!important` because Panda
  // atomic transform classes don't dedupe the way Tailwind/twMerge would.
  transform: "translateX(-50%)!",
  overflow: "hidden",
  borderRadius: "3xl!",
  p: "0",
});

const commandInputWrapperStyles = css({ p: "1", pb: "0" });
const commandInputGroupStyles = css({ h: "8!", bg: "input/50" });
const commandInputStyles = css({
  w: "full",
  fontSize: "sm",
  outline: "none",
  _disabled: { cursor: "not-allowed", opacity: "0.5" },
});
const commandInputIconStyles = css({ size: "4", flexShrink: "0", opacity: "0.5" });

const commandListStyles = css({
  maxH: "72",
  scrollPaddingBlock: "1",
  overflowX: "hidden",
  overflowY: "auto",
  outline: "none",
});

const commandEmptyStyles = css({ py: "6", textAlign: "center", fontSize: "sm" });

const commandGroupStyles = css({
  overflow: "hidden",
  p: "1",
  color: "foreground",
  "& [cmdk-group-heading]": {
    px: "2",
    py: "1.5",
    fontSize: "xs",
    fontWeight: "medium",
    color: "muted.foreground",
  },
});

const commandSeparatorStyles = css({ my: "1", h: "1px", bg: "border/50" });

const commandItemStyles = css({
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
  "[data-slot=dialog-content] &": { rounded: "2xl" },
  "&[data-disabled=true]": { pointerEvents: "none", opacity: "0.5" },
  "&[data-selected='true']": { bg: "muted", color: "foreground" },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
  "&[data-selected='true'] > svg": { color: "foreground" },
});

const commandItemCheckStyles = css({
  ml: "auto",
  opacity: "0",
  "[data-slot='command-item']:has([data-slot=command-shortcut]) &": { display: "none" },
  "[data-slot='command-item'][data-checked=true] &": { opacity: "1" },
});

const commandShortcutStyles = css({
  ml: "auto",
  fontSize: "xs",
  letterSpacing: "widest",
  color: "muted.foreground",
  "[data-slot='command-item'][data-selected='true'] &": { color: "foreground" },
});

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(commandStyles, className)}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className={css({ srOnly: true })}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(commandDialogContentStyles, className)}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className={commandInputWrapperStyles}>
      <InputGroup className={commandInputGroupStyles}>
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(commandInputStyles, className)}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className={commandInputIconStyles} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("no-scrollbar", commandListStyles, className)}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(commandEmptyStyles, className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(commandGroupStyles, className)}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(commandSeparatorStyles, className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(commandItemStyles, className)}
      {...props}
    >
      {children}
      <CheckIcon className={commandItemCheckStyles} />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(commandShortcutStyles, className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
