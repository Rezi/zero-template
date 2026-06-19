import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { css, cx } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

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
        className={css({
          isolation: "isolate",
          zIndex: 50,
          outline: "none",
        })}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            css({
              zIndex: 50,
              maxHeight: "var(--available-height)",
              width: "var(--anchor-width)",
              minWidth: "32",
              transformOrigin: "var(--transform-origin)",
              overflowX: "hidden",
              overflowY: "auto",
              borderRadius: "2xl",
              bg: "popover",
              p: "1",
              color: "popover-foreground",
              boxShadow: "lg",
              outline: "none",
              transitionDuration: "100ms",
              // ring-1 ring-foreground/5
              "--ring-shadow": "0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)",
              _dark: {
                "--ring-shadow": "0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)",
              },
              // Panda doesn't support boxShadow multi-value directly with tokens here, so combine ring and shadow:
              // Actually set via CSS variable trick - use raw boxShadow combining shadow and ring
              // We'll just set boxShadow directly combining shadow-lg equivalent and ring
              _dataOpen: {
                animationName: "enter",
                animationDuration: "150ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                animationFillMode: "both",
                "--enter-opacity": "0",
                "--enter-scale": ".95",
              },
              _dataClosed: {
                animationName: "exit",
                animationDuration: "150ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                animationFillMode: "both",
                "--exit-opacity": "0",
                "--exit-scale": ".95",
                overflow: "hidden",
              },
              // slide-in-from-side animations
              '&[data-side="bottom"]': { "--enter-translate-y": "-0.5rem" },
              '&[data-side="left"]': { "--enter-translate-x": "0.5rem" },
              '&[data-side="right"]': { "--enter-translate-x": "-0.5rem" },
              '&[data-side="top"]': { "--enter-translate-y": "0.5rem" },
              '&[data-side="inline-end"]': { "--enter-translate-x": "-0.5rem" },
              '&[data-side="inline-start"]': { "--enter-translate-x": "0.5rem" },
            }),
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
      className={cn(
        css({
          px: "2",
          py: "1",
          fontSize: "xs",
          color: "muted-foreground",
          "&[data-inset]": {
            pl: "7",
          },
        }),
        className,
      )}
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
      className={cn(
        cx(
          "group/dropdown-menu-item",
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
            userSelect: "none",
            _focus: {
              bg: "accent",
              color: "accent-foreground",
            },
            // not-data-[variant=destructive]:focus:**:text-accent-foreground
            "&:not([data-variant=destructive]):focus * svg": {
              color: "accent-foreground",
            },
            "&[data-inset]": {
              pl: "7",
            },
            '&[data-variant="destructive"]': {
              color: "destructive",
            },
            '&[data-variant="destructive"]:focus': {
              bg: "destructive/10",
              color: "destructive",
            },
            _dark: {
              '&[data-variant="destructive"]:focus': {
                bg: "destructive/20",
              },
            },
            _dataDisabled: {
              pointerEvents: "none",
              opacity: 0.5,
            },
            "& svg": {
              pointerEvents: "none",
              flexShrink: 0,
            },
            "& svg:not([class*='size-'])": {
              width: "4",
              height: "4",
            },
            // data-[variant=destructive]:*:[svg]:text-destructive
            '&[data-variant="destructive"] > svg': {
              color: "destructive",
            },
          }),
        ),
        className,
      )}
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
      className={cn(
        css({
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
          userSelect: "none",
          _focus: {
            bg: "accent",
            color: "accent-foreground",
          },
          // not-data-[variant=destructive]:focus:**:text-accent-foreground
          "&:not([data-variant=destructive]):focus * svg": {
            color: "accent-foreground",
          },
          "&[data-inset]": {
            pl: "7",
          },
          // data-popup-open
          "&[data-popup-open]": {
            bg: "accent",
            color: "accent-foreground",
          },
          _dataOpen: {
            bg: "accent",
            color: "accent-foreground",
          },
          "& svg": {
            pointerEvents: "none",
            flexShrink: 0,
          },
          "& svg:not([class*='size-'])": {
            width: "4",
            height: "4",
          },
        }),
        className,
      )}
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
      className={cn(
        css({
          width: "auto",
          minWidth: "96px",
          borderRadius: "2xl",
          bg: "popover",
          p: "1",
          color: "popover-foreground",
          boxShadow: "lg",
          transitionDuration: "100ms",
          _dataOpen: {
            animationName: "enter",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--enter-opacity": "0",
            "--enter-scale": ".95",
          },
          _dataClosed: {
            animationName: "exit",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--exit-opacity": "0",
            "--exit-scale": ".95",
          },
          '&[data-side="bottom"]': { "--enter-translate-y": "-0.5rem" },
          '&[data-side="left"]': { "--enter-translate-x": "0.5rem" },
          '&[data-side="right"]': { "--enter-translate-x": "-0.5rem" },
          '&[data-side="top"]': { "--enter-translate-y": "0.5rem" },
        }),
        className,
      )}
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
      className={cn(
        css({
          position: "relative",
          display: "flex",
          minHeight: "7",
          cursor: "default",
          alignItems: "center",
          gap: "2",
          borderRadius: "xl",
          py: "1.5",
          pr: "8",
          pl: "2",
          fontSize: "sm",
          outline: "none",
          userSelect: "none",
          _focus: {
            bg: "accent",
            color: "accent-foreground",
            "& *": {
              color: "accent-foreground",
            },
          },
          "&[data-inset]": {
            pl: "7",
          },
          _dataDisabled: {
            pointerEvents: "none",
            opacity: 0.5,
          },
          "& svg": {
            pointerEvents: "none",
            flexShrink: 0,
          },
          "& svg:not([class*='size-'])": {
            width: "4",
            height: "4",
          },
        }),
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className={css({
          pointerEvents: "none",
          position: "absolute",
          right: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
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
      className={cn(
        css({
          position: "relative",
          display: "flex",
          minHeight: "7",
          cursor: "default",
          alignItems: "center",
          gap: "2",
          borderRadius: "xl",
          py: "1.5",
          pr: "8",
          pl: "2",
          fontSize: "sm",
          outline: "none",
          userSelect: "none",
          _focus: {
            bg: "accent",
            color: "accent-foreground",
            "& *": {
              color: "accent-foreground",
            },
          },
          "&[data-inset]": {
            pl: "7",
          },
          _dataDisabled: {
            pointerEvents: "none",
            opacity: 0.5,
          },
          "& svg": {
            pointerEvents: "none",
            flexShrink: 0,
          },
          "& svg:not([class*='size-'])": {
            width: "4",
            height: "4",
          },
        }),
        className,
      )}
      {...props}
    >
      <span
        className={css({
          pointerEvents: "none",
          position: "absolute",
          right: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
        data-slot="dropdown-menu-radio-item-indicator"
      >
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
      className={cn(
        css({
          mx: "-1",
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

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        css({
          ml: "auto",
          fontSize: "xs",
          letterSpacing: "widest",
          color: "muted-foreground",
          // group-focus/dropdown-menu-item:text-accent-foreground
          ".group\\/dropdown-menu-item:focus &": {
            color: "accent-foreground",
          },
        }),
        className,
      )}
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
