"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { CheckIcon } from "lucide-react";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        css({
          peer: true,
          position: "relative",
          display: "flex",
          width: "4",
          height: "4",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "input/90",
          transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          _after: {
            content: '""',
            position: "absolute",
            insetInline: "-0.75rem",
            insetBlock: "-0.5rem",
          },
          _focusVisible: {
            borderColor: "ring",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)",
          },
          _disabled: {
            cursor: "not-allowed",
            opacity: 0.5,
          },
          _ariaInvalid: {
            borderColor: "destructive",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
          },
          _dark: {
            _ariaInvalid: {
              borderColor: "destructive/50",
              boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
            },
          },
          _dataChecked: {
            borderColor: "primary",
            bg: "primary",
            color: "primary-foreground",
          },
          ".group:has([disabled]) &": {
            opacity: 0.5,
          },
          "&[aria-invalid][aria-checked='true']": {
            borderColor: "primary",
          },
          ".dark &[data-checked]": {
            bg: "primary",
          },
        }),
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={css({
          display: "grid",
          placeContent: "center",
          color: "currentColor",
          transitionProperty: "none",
          "& > svg": {
            width: "3.5",
            height: "3.5",
          },
        })}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
