"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { selectAnimationStyles } from "../../lib/animations";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";

const selectGroupStyles = css({ scrollMarginBlock: "1.5", p: "1" });
const selectValueStyles = css({ display: "flex", flex: "1", textAlign: "left" });

const selectTriggerStyles = css({
  display: "flex",
  w: "fit",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.5",
  rounded: "2xl",
  borderWidth: "1px",
  borderColor: "transparent",
  bg: "input/50",
  px: "3",
  py: "2",
  fontSize: "sm",
  whiteSpace: "nowrap",
  transitionProperty: "color, box-shadow",
  transitionDuration: "200ms",
  outline: "none",
  _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
  _disabled: { cursor: "not-allowed", opacity: "0.5" },
  "&[aria-invalid='true']": { borderColor: "destructive", ringW: "3", ringC: "destructive/20" },
  "&[data-placeholder]": { color: "muted.foreground" },
  "&[data-size=default]": { h: "8" },
  "&[data-size=sm]": { h: "7" },
  "& > [data-slot=select-value]": {
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    gap: "1.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
  _dark: {
    "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
  },
});

const selectTriggerIconStyles = css({
  pointerEvents: "none",
  size: "4",
  color: "muted.foreground",
});

const selectPositionerStyles = css({ isolation: "isolate", zIndex: "50" });

const selectContentStyles = css({
  position: "relative",
  isolation: "isolate",
  zIndex: "50",
  maxH: "var(--available-height)",
  w: "var(--anchor-width)",
  minW: "36",
  transformOrigin: "var(--transform-origin)",
  overflowX: "hidden",
  overflowY: "auto",
  rounded: "2xl",
  bg: "popover",
  color: "popover.foreground",
  boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowLg}`,
  _dark: {
    boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowLg}`,
  },
});

const selectLabelStyles = css({ px: "2", py: "1", fontSize: "xs", color: "muted.foreground" });

const selectItemStyles = css({
  position: "relative",
  display: "flex",
  minH: "7",
  w: "full",
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
  "&:not([data-variant=destructive]):focus *": { color: "accent.foreground" },
  "&:where([data-disabled]:not([data-disabled='false']))": {
    pointerEvents: "none",
    opacity: "0.5",
  },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
  "& > span:last-child": { display: "flex", alignItems: "center", gap: "2" },
});

const selectItemTextStyles = css({
  display: "flex",
  flex: "1",
  flexShrink: "0",
  gap: "2",
  whiteSpace: "nowrap",
});

const selectItemIndicatorStyles = css({
  pointerEvents: "none",
  position: "absolute",
  right: "2",
  display: "flex",
  size: "4",
  alignItems: "center",
  justifyContent: "center",
});

const selectSeparatorStyles = css({
  pointerEvents: "none",
  mx: "-1",
  my: "1",
  h: "1px",
  bg: "border",
});

const selectScrollButtonStyles = css({
  zIndex: "10",
  display: "flex",
  w: "full",
  cursor: "default",
  alignItems: "center",
  justifyContent: "center",
  bg: "popover",
  py: "1",
  "& svg:not([class*='size-'])": { size: "4" },
});

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={clsx(selectGroupStyles, className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={clsx(selectValueStyles, className)}
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
      className={clsx(selectTriggerStyles, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronDownIcon className={selectTriggerIconStyles} />} />
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
        className={selectPositionerStyles}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={clsx(selectContentStyles, selectAnimationStyles, className)}
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
      className={clsx(selectLabelStyles, className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={clsx(selectItemStyles, className)}
      {...props}
    >
      <SelectPrimitive.ItemText className={selectItemTextStyles}>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator render={<span className={selectItemIndicatorStyles} />}>
        <CheckIcon className={css({ pointerEvents: "none" })} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={clsx(selectSeparatorStyles, className)}
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
      className={clsx(selectScrollButtonStyles, css({ top: "0" }), className)}
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
      className={clsx(selectScrollButtonStyles, css({ bottom: "0" }), className)}
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
