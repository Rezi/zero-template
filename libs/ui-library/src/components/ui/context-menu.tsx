"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

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
      className={cn(css({ userSelect: 'none' }), className)}
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
        className={css({
          isolation: 'isolate',
          zIndex: 50,
          outline: 'none',
        })}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            css({
              zIndex: 50,
              maxHeight: 'var(--available-height)',
              minWidth: '36',
              transformOrigin: 'var(--transform-origin)',
              overflowX: 'hidden',
              overflowY: 'auto',
              borderRadius: '2xl',
              bg: 'popover',
              p: '1',
              color: 'popover-foreground',
              boxShadow: 'lg',
              transitionDuration: '100ms',
              outline: 'none',
              // ring-1 ring-foreground/5
              '--tw-ring-shadow': '0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)',
              _dark: {
                '--tw-ring-shadow': '0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
              },
              // slide-in animations by side
              '&[data-side="bottom"]': { '--enter-translate-y': '-0.5rem' },
              '&[data-side="left"]': { '--enter-translate-x': '0.5rem' },
              '&[data-side="right"]': { '--enter-translate-x': '-0.5rem' },
              '&[data-side="top"]': { '--enter-translate-y': '0.5rem' },
              '&[data-side="inline-end"]': { '--enter-translate-x': '-0.5rem' },
              '&[data-side="inline-start"]': { '--enter-translate-x': '0.5rem' },
              // data-open animate-in
              _dataOpen: {
                animationName: 'enter',
                animationDuration: '150ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                animationFillMode: 'both',
                '--enter-opacity': '0',
                '--enter-scale': '.95',
              },
              // data-closed animate-out
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
      className={cn(
        css({
          px: '2',
          py: '1',
          fontSize: 'xs',
          color: 'muted-foreground',
          '&[data-inset]': { pl: '7' },
        }),
        className,
      )}
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
      className={cn(
        cx("group/context-menu-item", css({
          position: 'relative',
          display: 'flex',
          minHeight: '7',
          cursor: 'default',
          alignItems: 'center',
          gap: '2',
          borderRadius: 'xl',
          px: '2',
          py: '1.5',
          fontSize: 'sm',
          outline: 'none',
          userSelect: 'none',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&[data-inset]': { pl: '7' },
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
          '&:focus > svg': {
            color: 'accent-foreground',
          },
          '&[data-variant="destructive"] > svg': {
            color: 'destructive',
          },
        })),
        className,
      )}
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
      className={cn(
        css({
          display: 'flex',
          minHeight: '7',
          cursor: 'default',
          alignItems: 'center',
          borderRadius: 'xl',
          px: '2',
          py: '1.5',
          fontSize: 'sm',
          outline: 'none',
          userSelect: 'none',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&[data-inset]': { pl: '7' },
          _dataOpen: {
            bg: 'accent',
            color: 'accent-foreground',
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
      {children}
      <ChevronRightIcon className={css({ ml: 'auto' })} />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

function ContextMenuSubContent({ ...props }: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={css({ boxShadow: 'lg' })}
      side="right"
      {...props}
    />
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
          pr: '8',
          pl: '2',
          fontSize: 'sm',
          outline: 'none',
          userSelect: 'none',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&[data-inset]': { pl: '7' },
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
      checked={checked}
      {...props}
    >
      <span className={css({ pointerEvents: 'none', position: 'absolute', right: '2' })}>
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
          pr: '8',
          pl: '2',
          fontSize: 'sm',
          outline: 'none',
          userSelect: 'none',
          _focus: {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&[data-inset]': { pl: '7' },
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
      <span className={css({ pointerEvents: 'none', position: 'absolute', right: '2' })}>
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
      className={cn(
        css({
          mx: '-1',
          my: '1',
          height: 'px',
          bg: 'border/50',
        }),
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        css({
          ml: 'auto',
          fontSize: 'xs',
          letterSpacing: 'widest',
          color: 'muted-foreground',
          '.group\\/context-menu-item:focus &': {
            color: 'accent-foreground',
          },
        }),
        className,
      )}
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
