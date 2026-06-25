import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const switchStyles = css({
  position: "relative",
  display: "inline-flex",
  flexShrink: "0",
  alignItems: "center",
  rounded: "2xl",
  borderWidth: "2px",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  outline: "none",
  "&::after": { content: '""', position: "absolute", insetInline: "-3", insetBlock: "-2" },
  _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
  "&[aria-invalid='true']": {
    borderColor: "destructive",
    ringW: "3",
    ringC: "destructive/20",
  },
  "&[data-size='default']": { h: "5", w: "8" },
  "&[data-size='sm']": { h: "4", w: "6" },
  "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
    borderColor: "primary",
    bg: "primary",
  },
  "&:where([data-state='unchecked'], [data-unchecked]:not([data-unchecked='false']))": {
    borderColor: "transparent",
    bg: "input/90",
  },
  "&:where([data-state='disabled'], [data-disabled]:not([data-disabled='false']))": {
    cursor: "not-allowed",
    opacity: "0.5",
  },
  _dark: {
    "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
  },
});

const switchThumbStyles = css({
  pointerEvents: "none",
  display: "block",
  rounded: "2xl",
  bg: "background",
  boxShadow: "sm",
  transitionProperty: "transform",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  "&:not(.dark *)": { backgroundClip: "padding-box" },
  "[data-slot='switch'][data-size='default'] &": { size: "4" },
  "[data-slot='switch'][data-size='sm'] &": { size: "3" },
  "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
    transform: "translateX(calc(100% - 4px))",
  },
  "&:where([data-state='unchecked'], [data-unchecked]:not([data-unchecked='false']))": {
    transform: "translateX(0)",
  },
  _dark: {
    "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
      bg: "primary.foreground",
    },
    "&:where([data-state='unchecked'], [data-unchecked]:not([data-unchecked='false']))": {
      bg: "foreground",
    },
  },
});

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={clsx("peer", switchStyles, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={switchThumbStyles} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
