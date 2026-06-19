"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { InputGroup, InputGroupAddon } from "./input-group";
import { SearchIcon, CheckIcon } from "lucide-react";

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        css({
          display: "flex",
          width: "full",
          height: "full",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "3xl",
          bg: "popover",
          p: "1",
          color: "popover-foreground",
        }),
        className,
      )}
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
      <DialogHeader
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
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          css({
            top: "1/3",
            translateY: "0",
            overflow: "hidden",
            borderRadius: "3xl !important",
            p: "0",
          }),
          className,
        )}
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
    <div
      data-slot="command-input-wrapper"
      className={css({
        p: "1",
        pb: "0",
      })}
    >
      <InputGroup
        className={css({
          height: "8 !important",
          bg: "input/50",
        })}
      >
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            css({
              width: "full",
              fontSize: "sm",
              outline: "none",
              outlineOffset: "0",
              _disabled: {
                cursor: "not-allowed",
                opacity: 0.5,
              },
            }),
            className,
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon
            className={css({
              width: "4",
              height: "4",
              flexShrink: 0,
              opacity: 0.5,
            })}
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        css({
          maxHeight: "72",
          scrollPaddingY: "1",
          overflowX: "hidden",
          overflowY: "auto",
          outline: "none",
          // no-scrollbar: hide scrollbar
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }),
        className,
      )}
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
      className={cn(
        css({
          py: "6",
          textAlign: "center",
          fontSize: "sm",
        }),
        className,
      )}
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
      className={cn(
        css({
          overflow: "hidden",
          p: "1",
          color: "foreground",
          "& * [cmdk-group-heading]": {
            px: "2",
            py: "1.5",
            fontSize: "xs",
            fontWeight: "medium",
            color: "muted-foreground",
          },
        }),
        className,
      )}
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
      className={cn(
        css({
          my: "1",
          height: "px",
          bg: "border/50",
        }),
        className,
      )}
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
      className={cn(
        cx(
          "group/command-item",
          css({
            position: "relative",
            display: "flex",
            minHeight: "7",
            cursor: "default",
            alignItems: "center",
            gap: "2",
            borderRadius: "xl",
            px: "2",
            py: "1.5",
            fontSize: "sm",
            outline: "none",
            outlineOffset: "0",
            userSelect: "none",
            "&:is([data-slot='dialog-content'] *)": {
              borderRadius: "2xl",
            },
            '&[data-disabled="true"]': {
              pointerEvents: "none",
              opacity: 0.5,
            },
            "&[data-selected]": {
              bg: "muted",
              color: "foreground",
            },
            "& svg": {
              pointerEvents: "none",
              flexShrink: 0,
            },
            "& svg:not([class*='size-'])": {
              width: "4",
              height: "4",
            },
            "&[data-selected] svg": {
              color: "foreground",
            },
          }),
        ),
        className,
      )}
      {...props}
    >
      {children}
      <CheckIcon
        className={css({
          ml: "auto",
          opacity: 0,
          ".group\\/command-item:has([data-slot='command-shortcut']) &": {
            display: "none",
          },
          '.group\\/command-item[data-checked="true"] &': {
            opacity: 1,
          },
        })}
      />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        css({
          ml: "auto",
          fontSize: "xs",
          letterSpacing: "widest",
          color: "muted-foreground",
          ".group\\/command-item[data-selected] &": {
            color: "foreground",
          },
        }),
        className,
      )}
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
