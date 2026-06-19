import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { css, cx } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react";

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        css({
          "& svg:not([class*='size-'])": { width: '4', height: '4' },
        }),
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={css({
          pointerEvents: 'none',
          width: '4',
          height: '4',
          color: 'muted-foreground',
        })}
      />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className={css({ pointerEvents: 'none' })} />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn(css({ width: 'auto' }), className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className={css({
              '&:has([data-slot="combobox-clear"]) ~ &': { display: 'none' },
              '.group\/input-group:has([data-slot="combobox-clear"]) &': { display: 'none' },
              _dataPressed: { bg: 'transparent' },
            })}
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={css({ isolation: 'isolate', zIndex: 50 })}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            cx(
              "group/combobox-content",
              css({
                position: 'relative',
                maxHeight: 'var(--available-height)',
                width: 'var(--anchor-width)',
                maxWidth: 'var(--available-width)',
                minWidth: 'calc(var(--anchor-width) + var(--spacing-7, 1.75rem))',
                transformOrigin: 'var(--transform-origin)',
                overflow: 'hidden',
                borderRadius: '2xl',
                bg: 'popover',
                color: 'popover-foreground',
                boxShadow: 'lg',
                transitionDuration: '100ms',
                '&[data-chips="true"]': {
                  minWidth: 'var(--anchor-width)',
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
                '& [data-slot="input-group"]': {
                  m: '1',
                  mb: '0',
                  height: '8',
                  borderColor: 'input/30',
                  bg: 'input/50',
                  boxShadow: 'none',
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
            ),
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        css({
          scrollPaddingY: '1',
          maxHeight: 'min(calc(var(--spacing-72, 18rem) - var(--spacing-9, 2.25rem)), calc(var(--available-height) - var(--spacing-9, 2.25rem)))',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          p: '1',
          '&[data-empty]': { p: '0' },
          // no-scrollbar: hide scrollbar
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }),
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
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
          '&[data-highlighted]': {
            bg: 'accent',
            color: 'accent-foreground',
          },
          '&:not([data-variant="destructive"])[data-highlighted] & *': {
            color: 'accent-foreground',
          },
          '&[data-highlighted]:not([data-variant="destructive"]) *': {
            color: 'accent-foreground',
          },
          '&[data-disabled]': {
            pointerEvents: 'none',
            opacity: 0.5,
          },
          '& svg': {
            pointerEvents: 'none',
            flexShrink: 0,
          },
          "& svg:not([class*='size-'])": {
            width: '4',
            height: '4',
          },
        }),
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span
            className={css({
              pointerEvents: 'none',
              position: 'absolute',
              right: '2',
              display: 'flex',
              width: '4',
              height: '4',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          />
        }
      >
        <CheckIcon className={css({ pointerEvents: 'none' })} />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />
  );
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        css({
          px: '2',
          py: '1.5',
          fontSize: 'xs',
          color: 'muted-foreground',
        }),
        className,
      )}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        css({
          display: 'none',
          width: 'full',
          justifyContent: 'center',
          py: '2',
          textAlign: 'center',
          fontSize: 'sm',
          color: 'muted-foreground',
          '.group\/combobox-content[data-empty] &': {
            display: 'flex',
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn(
        css({
          mx: '-1',
          my: '1',
          height: 'px',
          bg: 'border',
        }),
        className,
      )}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        css({
          display: 'flex',
          minHeight: '8',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1',
          borderRadius: '2xl',
          borderWidth: '1px',
          borderColor: 'transparent',
          bg: 'input/50',
          backgroundClip: 'padding-box',
          px: '2.5',
          py: '1',
          fontSize: 'sm',
          transitionProperty: 'color, box-shadow',
          transitionDuration: '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus-within': {
            borderColor: 'ring',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)',
          },
          '&:has([aria-invalid])': {
            borderColor: 'destructive',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)',
          },
          '&:has([data-slot="combobox-chip"])': {
            px: '1',
          },
          _dark: {
            '&:has([aria-invalid])': {
              borderColor: 'destructive/50',
              boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)',
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        css({
          display: 'flex',
          height: 'calc(var(--spacing-5, 1.25rem) + var(--spacing-1, 0.25rem) * 0.25)',
          width: 'fit-content',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1',
          borderRadius: '2xl',
          bg: 'input',
          px: '1.5',
          fontSize: 'xs',
          fontWeight: 'medium',
          whiteSpace: 'nowrap',
          color: 'foreground',
          '&:has([disabled])': {
            pointerEvents: 'none',
            cursor: 'not-allowed',
            opacity: 0.5,
          },
          '&:has([data-slot="combobox-chip-remove"])': {
            pr: '0.5',
          },
          _dark: {
            bg: 'input/60',
          },
        }),
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className={css({
            ml: '-0.5',
            width: '4.5',
            height: '4.5',
            opacity: 0.5,
            _hover: { opacity: 1 },
            '&[aria-disabled]': { pointerEvents: 'none' },
          })}
          data-slot="combobox-chip-remove"
        >
          <XIcon className={css({ pointerEvents: 'none' })} />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn(
        css({
          minWidth: '16',
          flex: '1',
          outline: 'none',
        }),
        className,
      )}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
