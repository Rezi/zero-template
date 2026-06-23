import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const radioGroupStyles = css({ display: "grid", w: "full", gap: "3" });

const radioGroupItemStyles = css({
  position: "relative",
  display: "flex",
  aspectRatio: "square",
  size: "4",
  flexShrink: "0",
  rounded: "2xl",
  borderWidth: "1px",
  borderColor: "transparent",
  bg: "input/90",
  outline: "none",
  "&::after": { content: '""', position: "absolute", insetInline: "-3", insetBlock: "-2" },
  _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
  _disabled: { cursor: "not-allowed", opacity: "0.5" },
  "&[aria-invalid='true']": {
    borderColor: "destructive",
    ringW: "3",
    ringC: "destructive/20",
  },
  "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
    bg: "primary",
    color: "primary.foreground",
  },
  _dark: {
    "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
    "&:where([data-state='checked'], [data-checked]:not([data-checked='false']))": {
      bg: "primary",
    },
  },
});

const radioGroupIndicatorStyles = css({
  display: "flex",
  size: "4",
  alignItems: "center",
  justifyContent: "center",
});

const radioGroupDotStyles = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  size: "2",
  transform: "translate(-50%, -50%)",
  rounded: "full",
  bg: "primary.foreground",
  _dark: { size: "2.5" },
});

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn(radioGroupStyles, className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn("group/radio-group-item peer", radioGroupItemStyles, className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={radioGroupIndicatorStyles}
      >
        <span className={radioGroupDotStyles} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
