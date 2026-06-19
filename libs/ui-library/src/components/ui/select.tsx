"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn(css({ scrollMarginY: '1.5', p: '1' }), className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(css({ display: 'flex', flex: '1', textAlign: 'left' }), className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        css({
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5',
          borderRadius: '2xl',
          borderWidth: '1px',
          borderColor: 'transparent',
          bg: 'input/50',
          px: '3',
          py: '2',
          fontSize: 'sm',
          whiteSpace: 'nowrap',
          transitionProperty: 'color, box-shadow',
          transitionDuration: '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          outline: 'none',
          _focusVisible: {
            borderColor: 'ring',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)',
          },
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.5,
          },
          _ariaInvalid: {
            borderColor: 'destructive',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)',
          },
          _dark: {
            _ariaInvalid: {
              borderColor: 'destructive/50',
              boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)',
            },
          },
          '&[data-placeholder]': {
            color: 'muted-foreground',
          },
          _dataSizeDefault: {
            height: '8',
          },
          _dataSizeSm: {
            height: '7',
          },
          '& [data-slot="select-value"]': {
            lineClamp: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '1.5',
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
      <SelectPrimitive.Icon
        render={<ChevronDownIcon className={css({ pointerEvents: 'none', width: '4', height: '4', color: 'muted-foreground' })} />}
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className={css({ isolation: 'isolate', zIndex: 50 })}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            css({
              position: 'relative',
              isolation: 'isolate',
              zIndex: 50,
              maxHeight: 'var(--available-height)',
              width: 'var(--anchor-width)',
              minWidth: '36',
              transformOrigin: 'var(--transform-origin)',
              overflowX: 'hidden',
              overflowY: 'auto',
              borderRadius: '2xl',
              bg: 'popover',
              color: 'popover-foreground',
              boxShadow: 'lg',
              transitionDuration: '100ms',
              '&[data-align-trigger="true"]': {
                animationName: 'none',
              },
              '&[data-side="bottom"]': {
                '--enter-translate-y': '-0.5rem',
              },
              '&[data-side="inline-end"]': {
                '--enter-translate-x': '-0.5rem',
              },
              '&[data-side="inline-start"]': {
                '--enter-translate-x': '0.5rem',
              },
              '&[data-side="left"]': {
                '--enter-translate-x': '0.5rem',
              },
              '&[data-side="right"]': {
                '--enter-translate-x': '-0.5rem',
              },
              '&[data-side="top"]': {
                '--enter-translate-y': '0.5rem',
              },
              _dark: {
                boxShadow: '0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
              },
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
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(css({ px: '2', py: '1', fontSize: 'xs', color: 'muted-foreground' }), className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        css({
          position: 'relative',
          display: 'flex',
          minHeight: '7',
          width: 'full',
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
          '&:not([data-variant="destructive"]):focus & *': {
            color: 'accent-foreground',
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
          '& > span:last-child': {
            display: 'flex',
            alignItems: 'center',
            gap: '2',
          },
        }),
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className={css({ display: 'flex', flex: '1', flexShrink: 0, gap: '2', whiteSpace: 'nowrap' })}>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className={css({ pointerEvents: 'none', position: 'absolute', right: '2', display: 'flex', width: '4', height: '4', alignItems: 'center', justifyContent: 'center' })} />
        }
      >
        <CheckIcon className={css({ pointerEvents: 'none' })} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(css({ pointerEvents: 'none', mx: '-1', my: '1', height: 'px', bg: 'border' }), className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        css({
          top: '0',
          zIndex: 10,
          display: 'flex',
          width: 'full',
          cursor: 'default',
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'popover',
          py: '1',
          '& svg:not([class*="size-"])': {
            width: '4',
            height: '4',
          },
        }),
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        css({
          bottom: '0',
          zIndex: 10,
          display: 'flex',
          width: 'full',
          cursor: 'default',
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'popover',
          py: '1',
          '& svg:not([class*="size-"])': {
            width: '4',
            height: '4',
          },
        }),
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
