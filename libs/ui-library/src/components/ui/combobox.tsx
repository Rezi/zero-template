import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { popoverAnimationStyles } from "../../lib/animations";
import { Button } from "./button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
const iconNone = css({ pointerEvents: "none" });

const comboboxTriggerStyles = css({ "& svg:not([class*='size-'])": { size: "4" } });
const comboboxTriggerIconStyles = css({
  pointerEvents: "none",
  size: "4",
  color: "muted.foreground",
});

const comboboxInputButtonStyles = css({
  "[data-slot='input-group']:has([data-slot=combobox-clear]) &": { display: "none" },
  "&[data-pressed]": { bg: "transparent" },
});

const comboboxPositionerStyles = css({ isolation: "isolate", zIndex: "50" });

const comboboxContentStyles = css({
  position: "relative",
  maxH: "var(--available-height)",
  w: "var(--anchor-width)",
  maxW: "var(--available-width)",
  minW: "calc(var(--anchor-width) + var(--spacing, 0.25rem) * 7)",
  transformOrigin: "var(--transform-origin)",
  overflow: "hidden",
  rounded: "2xl",
  bg: "popover",
  color: "popover.foreground",
  boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowLg}`,
  "&[data-chips=true]": { minW: "var(--anchor-width)" },
  "& > [data-slot=input-group]": {
    m: "1",
    mb: "0",
    h: "8",
    borderColor: "input/30",
    bg: "input/50",
    boxShadow: "none",
  },
  _dark: {
    boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowLg}`,
  },
});

const comboboxListStyles = css({
  maxH: "min(calc(var(--spacing, 0.25rem) * 72 - var(--spacing, 0.25rem) * 9), calc(var(--available-height) - var(--spacing, 0.25rem) * 9))",
  scrollPaddingBlock: "1",
  overflowY: "auto",
  overscrollBehavior: "contain",
  p: "1",
  "&[data-empty]": { p: "0" },
});

const comboboxItemStyles = css({
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
  "&[data-highlighted]": { bg: "accent", color: "accent.foreground" },
  "&:not([data-variant=destructive])[data-highlighted] *": { color: "accent.foreground" },
  "&[data-disabled]": { pointerEvents: "none", opacity: "0.5" },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
  "& svg:not([class*='size-'])": { size: "4" },
});

const comboboxItemIndicatorStyles = css({
  pointerEvents: "none",
  position: "absolute",
  right: "2",
  display: "flex",
  size: "4",
  alignItems: "center",
  justifyContent: "center",
});

const comboboxLabelStyles = css({ px: "2", py: "1.5", fontSize: "xs", color: "muted.foreground" });

const comboboxEmptyStyles = css({
  display: "none",
  w: "full",
  justifyContent: "center",
  py: "2",
  textAlign: "center",
  fontSize: "sm",
  color: "muted.foreground",
  "[data-slot='combobox-content'][data-empty] &": { display: "flex" },
});

const comboboxSeparatorStyles = css({ mx: "-1", my: "1", h: "1px", bg: "border" });

const comboboxChipsStyles = css({
  display: "flex",
  minH: "8",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "1",
  rounded: "2xl",
  borderWidth: "1px",
  borderColor: "transparent",
  bg: "input/50",
  backgroundClip: "padding-box",
  px: "2.5",
  py: "1",
  fontSize: "sm",
  transitionProperty: "color, box-shadow",
  transitionDuration: "200ms",
  _focusWithin: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
  "&:has([aria-invalid='true'])": {
    borderColor: "destructive",
    ringW: "3",
    ringC: "destructive/20",
  },
  "&:has([data-slot=combobox-chip])": { px: "1" },
  _dark: {
    "&:has([aria-invalid='true'])": { borderColor: "destructive/50", ringC: "destructive/40" },
  },
});

const comboboxChipStyles = css({
  display: "flex",
  h: "calc(var(--spacing, 0.25rem) * 5.25)",
  w: "fit",
  alignItems: "center",
  justifyContent: "center",
  gap: "1",
  rounded: "2xl",
  bg: "input",
  px: "1.5",
  fontSize: "xs",
  fontWeight: "medium",
  whiteSpace: "nowrap",
  color: "foreground",
  "&:has(:disabled)": { pointerEvents: "none", cursor: "not-allowed", opacity: "0.5" },
  "&:has([data-slot=combobox-chip-remove])": { pr: "0.5" },
  _dark: { bg: "input/60" },
});

const comboboxChipRemoveStyles = css({
  ml: "-0.5",
  size: "4.5",
  opacity: "0.5",
  _hover: { opacity: "1" },
  "&[aria-disabled='true']": { pointerEvents: "none" },
});

const comboboxChipsInputStyles = css({ minW: "16", flex: "1", outline: "none" });

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={clsx(comboboxTriggerStyles, className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className={comboboxTriggerIconStyles} />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={clsx(className)}
      {...props}
    >
      <XIcon className={iconNone} />
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
    <InputGroup className={clsx(css({ w: "auto" }), className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="transparent"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className={comboboxInputButtonStyles}
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
        className={comboboxPositionerStyles}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={clsx(comboboxContentStyles, popoverAnimationStyles, className)}
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
      className={clsx("no-scrollbar", comboboxListStyles, className)}
      {...props}
    />
  );
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={clsx(comboboxItemStyles, className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator render={<span className={comboboxItemIndicatorStyles} />}>
        <CheckIcon className={iconNone} />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group data-slot="combobox-group" className={clsx(className)} {...props} />
  );
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={clsx(comboboxLabelStyles, className)}
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
      className={clsx(comboboxEmptyStyles, className)}
      {...props}
    />
  );
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={clsx(comboboxSeparatorStyles, className)}
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
      className={clsx(comboboxChipsStyles, className)}
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
      className={clsx(comboboxChipStyles, className)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className={comboboxChipRemoveStyles}
          data-slot="combobox-chip-remove"
        >
          <XIcon className={iconNone} />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={clsx(comboboxChipsInputStyles, className)}
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
