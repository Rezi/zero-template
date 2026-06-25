import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { MinusIcon } from "lucide-react";

const inputOTPContainerStyles = css({
  display: "flex",
  alignItems: "center",
  "&:has(:disabled)": { opacity: "0.5" },
});

const inputOTPGroupStyles = css({
  display: "flex",
  alignItems: "center",
  rounded: "2xl",
  "&:has([aria-invalid='true'])": {
    borderColor: "destructive",
    ringW: "3",
    ringC: "destructive/20",
  },
  _dark: { "&:has([aria-invalid='true'])": { ringC: "destructive/40" } },
});

const inputOTPSlotStyles = css({
  position: "relative",
  display: "flex",
  size: "8",
  alignItems: "center",
  justifyContent: "center",
  borderBlockWidth: "1px",
  borderRightWidth: "1px",
  borderColor: "input",
  bg: "input/50",
  fontSize: "sm",
  transitionProperty: "color, box-shadow",
  transitionDuration: "200ms",
  outline: "none",
  "&:first-child": {
    borderTopLeftRadius: "2xl",
    borderBottomLeftRadius: "2xl",
    borderLeftWidth: "1px",
  },
  "&:last-child": { borderTopRightRadius: "2xl", borderBottomRightRadius: "2xl" },
  "&[aria-invalid='true']": { borderColor: "destructive" },
  "&[data-active='true']": {
    zIndex: "10",
    borderColor: "ring",
    ringW: "3",
    ringC: "ring/30",
  },
  "&[data-active='true'][aria-invalid='true']": { ringC: "destructive/20" },
  _dark: { "&[data-active='true'][aria-invalid='true']": { ringC: "destructive/40" } },
});

const inputOTPCaretWrapperStyles = css({
  pointerEvents: "none",
  position: "absolute",
  inset: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const inputOTPCaretStyles = css({
  h: "4",
  w: "1px",
  bg: "foreground",
  animationName: "caretBlink",
  animationDuration: "1s",
  animationTimingFunction: "ease-out",
  animationIterationCount: "infinite",
});

const inputOTPSeparatorStyles = css({
  display: "flex",
  alignItems: "center",
  "& svg:not([class*='size-'])": { size: "4" },
});

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("cn-input-otp", inputOTPContainerStyles, containerClassName)}
      spellCheck={false}
      className={cn(css({ _disabled: { cursor: "not-allowed" } }), className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-group" className={cn(inputOTPGroupStyles, className)} {...props} />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(inputOTPSlotStyles, className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={inputOTPCaretWrapperStyles}>
          <div className={inputOTPCaretStyles} />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className={inputOTPSeparatorStyles}
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
