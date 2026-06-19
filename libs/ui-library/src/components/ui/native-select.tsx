import * as React from "react";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { ChevronDownIcon } from "lucide-react";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

function NativeSelect({ className, size = "default", ...props }: NativeSelectProps) {
  return (
    <div
      className={cn(
        cx(
          "group/native-select",
          css({
            position: "relative",
            width: "fit-content",
            "&:has(select:disabled)": { opacity: 0.5 },
          }),
        ),
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={css({
          height: "8",
          width: "full",
          minWidth: "0",
          appearance: "none",
          borderRadius: "2xl",
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "input/50",
          py: "1",
          pr: "8",
          pl: "2.5",
          fontSize: "sm",
          transitionProperty: "color, box-shadow",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          userSelect: "none",
          "& ::selection": { bg: "primary", color: "primary-foreground" },
          _placeholder: { color: "muted-foreground" },
          _focusVisible: {
            borderColor: "ring",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)",
          },
          _disabled: {
            pointerEvents: "none",
            cursor: "not-allowed",
          },
          _ariaInvalid: {
            borderColor: "destructive",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
          },
          _dataSizeSm: {
            height: "7",
          },
          _dark: {
            _ariaInvalid: {
              borderColor: "destructive/50",
              boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
            },
          },
        })}
        {...props}
      />
      <ChevronDownIcon
        className={css({
          pointerEvents: "none",
          position: "absolute",
          top: "1/2",
          right: "2.5",
          width: "4",
          height: "4",
          translateY: "-50%",
          color: "muted-foreground",
          userSelect: "none",
        })}
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn(
        css({
          bg: "Canvas",
          color: "CanvasText",
        }),
        className,
      )}
      {...props}
    />
  );
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(
        css({
          bg: "Canvas",
          color: "CanvasText",
        }),
        className,
      )}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
