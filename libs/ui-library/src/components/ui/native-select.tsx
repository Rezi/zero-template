import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { ChevronDownIcon } from "lucide-react";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

const nativeSelectWrapperStyles = css({
  position: "relative",
  w: "fit",
  "&:has(select:disabled)": { opacity: "0.5" },
});

const nativeSelectStyles = css({
  h: "8",
  w: "full",
  minW: "0",
  appearance: "none",
  rounded: "2xl",
  borderWidth: "1px",
  borderColor: "transparent",
  bg: "input/50",
  py: "1",
  pr: "8",
  pl: "2.5",
  fontSize: "sm",
  transitionProperty: "color, box-shadow",
  transitionDuration: "200ms",
  outline: "none",
  userSelect: "none",
  "&::selection": { bg: "primary", color: "primary.foreground" },
  _placeholder: { color: "muted.foreground" },
  _focusVisible: { borderColor: "ring", ringW: "3", ringC: "ring/30" },
  _disabled: { pointerEvents: "none", cursor: "not-allowed" },
  "&[aria-invalid='true']": {
    borderColor: "destructive",
    ringW: "3",
    ringC: "destructive/20",
  },
  "&[data-size='sm']": { h: "7" },
  _dark: {
    "&[aria-invalid='true']": { borderColor: "destructive/50", ringC: "destructive/40" },
  },
});

const nativeSelectIconStyles = css({
  pointerEvents: "none",
  position: "absolute",
  top: "50%",
  right: "2.5",
  size: "4",
  transform: "translateY(-50%)",
  color: "muted.foreground",
  userSelect: "none",
});

const nativeSelectOptionStyles = css({ bg: "Canvas", color: "CanvasText" });

function NativeSelect({ className, size = "default", ...props }: NativeSelectProps) {
  return (
    <div
      className={clsx("group/native-select", nativeSelectWrapperStyles, className)}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={nativeSelectStyles}
        {...props}
      />
      <ChevronDownIcon
        className={nativeSelectIconStyles}
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
      className={clsx(nativeSelectOptionStyles, className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={clsx(nativeSelectOptionStyles, className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
