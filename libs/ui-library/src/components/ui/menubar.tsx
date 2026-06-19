"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";

import { css, cx } from "@zero-app/styled-system/css";
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

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        css({
          display: 'flex',
          height: '8',
          alignItems: 'center',
          borderRadius: '2xl',
          borderWidth: '1px',
          p: '[3px]',
        }),
        className,
      )}
      {...props}
    />
  );
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
      className={cn(
        css({
          display: 'flex',
          alignItems: 'center',
          borderRadius: '2xl',
          px: '1.5',
          py: '[2px]',
          fontSize: 'sm',
          fontWeight: 'medium',
          outline: 'none',
          userSelect: 'none',
          _hover: {
            bg: 'muted',
          },
          _ariaExpanded: {
            bg: 'muted',
          },
        }),
        className,
      )}
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
      className={cn(
        css({
          minWidth: '36',
          borderRadius: '2xl',
          bg: 'popover',
          p: '1',
          color: 'popover-foreground',
          boxShadow: 'lg',
          transitionDuration: '100ms',
          boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)',
          _dark: {
            boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
          },
          '&[data-side="bottom"]': { '--enter-translate-y': '-0.5rem' },
          '&[data-side="left"]': { '--enter-translate-x': '0.5rem' },
          '&[data-side="right"]': { '--enter-translate-x': '-0.5rem' },
          '&[data-side="top"]': { '--enter-translate-y': '0.5rem' },
          '&[data-side="inline-end"]': { '--enter-translate-x': '-0.5rem' },
          '&[data-side="inline-start"]': { '--enter-translate-x': '0.5rem' },
          _dataOpen: {
            animationName: 'enter',
            animationDuration: '150ms',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            animationFillMode: 'both',
            '--enter-opacity': '0',
            '--enter-scale': '.95',
          },
        }),
        className,
      )}
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
      className={cn(
        cx("group/menubar-item", css({
          minHeight: '7',
          gap: '2',
          borderRadius: 'xl',
          px: '2',
          py: '1.5',
          fontSize: 'sm',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&:not([data-variant="destructive"]):focus & *': {
            color: 'accent-foreground',
          },
          '&[data-inset]': {
            pl: '7',
          },
          '&[data-variant="destructive"]': {
            color: 'destructive',
          },
          '&[data-variant="destructive"]:focus': {
            bg: 'destructive/10',
            color: 'destructive',
          },
          _dark: {
            '&[data-variant="destructive"]:focus': {
              bg: 'destructive/20',
            },
          },
          _dataDisabled: {
            opacity: 0.5,
          },
          '& svg:not([class*="size-"])': {
            width: '4',
            height: '4',
          },
          '&[data-variant="destructive"] > svg': {
            color: 'destructive !important',
          },
        })),
        className,
      )}
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
      className={cn(
        css({
          position: 'relative',
          display: 'flex',
          minHeight: '7',
          cursor: 'default',
          alignItems: 'center',
          gap: '2',
          borderRadius: 'xl',
          py: '1.5',
          pr: '1.5',
          pl: '7',
          fontSize: 'sm',
          outline: 'none',
          userSelect: 'none',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&:focus & *': {
            color: 'accent-foreground',
          },
          '&[data-inset]': {
            pl: '7',
          },
          _dataDisabled: {
            pointerEvents: 'none',
            opacity: 0.5,
          },
          '& svg': {
            pointerEvents: 'none',
            flexShrink: 0,
          },
        }),
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className={css({
          pointerEvents: 'none',
          position: 'absolute',
          left: '1.5',
          display: 'flex',
          width: '4',
          height: '4',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg:not([class*="size-"])': {
            width: '4',
            height: '4',
          },
        })}
      >
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
      className={cn(
        css({
          position: 'relative',
          display: 'flex',
          minHeight: '7',
          cursor: 'default',
          alignItems: 'center',
          gap: '2',
          borderRadius: 'xl',
          py: '1.5',
          pr: '1.5',
          pl: '7',
          fontSize: 'sm',
          outline: 'none',
          userSelect: 'none',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&:focus & *': {
            color: 'accent-foreground',
          },
          '&[data-inset]': {
            pl: '7',
          },
          _dataDisabled: {
            pointerEvents: 'none',
            opacity: 0.5,
          },
          '& svg': {
            pointerEvents: 'none',
            flexShrink: 0,
          },
          '& svg:not([class*="size-"])': {
            width: '4',
            height: '4',
          },
        }),
        className,
      )}
      {...props}
    >
      <span
        className={css({
          pointerEvents: 'none',
          position: 'absolute',
          left: '1.5',
          display: 'flex',
          width: '4',
          height: '4',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg:not([class*="size-"])': {
            width: '4',
            height: '4',
          },
        })}
      >
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
      className={cn(
        css({
          px: '2',
          py: '1',
          fontSize: 'sm',
          color: 'muted-foreground',
          '&[data-inset]': {
            pl: '7',
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      className={cn(
        css({
          mx: '-1',
          my: '1',
          height: '[1px]',
          bg: 'border/50',
        }),
        className,
      )}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={cn(
        css({
          ml: 'auto',
          fontSize: 'xs',
          letterSpacing: 'widest',
          color: 'muted-foreground',
          '.group\/menubar-item:focus &': {
            color: 'accent-foreground',
          },
        }),
        className,
      )}
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
      className={cn(
        css({
          minHeight: '7',
          gap: '2',
          borderRadius: 'xl',
          px: '2',
          py: '1.5',
          fontSize: 'sm',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&[data-inset]': {
            pl: '7',
          },
          _dataOpen: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '& svg:not([class*="size-"])': {
            width: '4',
            height: '4',
          },
        }),
        className,
      )}
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
      className={cn(
        css({
          minWidth: '32',
          borderRadius: '2xl',
          bg: 'popover',
          p: '1',
          color: 'popover-foreground',
          boxShadow: 'lg',
          transitionDuration: '100ms',
          boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)',
          _dark: {
            boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
          },
          '&[data-side="bottom"]': { '--enter-translate-y': '-0.5rem' },
          '&[data-side="left"]': { '--enter-translate-x': '0.5rem' },
          '&[data-side="right"]': { '--enter-translate-x': '-0.5rem' },
          '&[data-side="top"]': { '--enter-translate-y': '0.5rem' },
          _dataOpen: {
            animationName: 'enter',
            animationDuration: '150ms',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            animationFillMode: 'both',
            '--enter-opacity': '0',
            '--enter-scale': '.95',
          },
          _dataClosed: {
            animationName: 'exit',
            animationDuration: '150ms',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            animationFillMode: 'both',
            '--exit-opacity': '0',
            '--exit-scale': '.95',
          },
        }),
        className,
      )}
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
