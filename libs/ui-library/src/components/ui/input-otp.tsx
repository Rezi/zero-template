import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { MinusIcon } from "lucide-react";

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
      containerClassName={cn(
        "cn-input-otp",
        css({
          display: "flex",
          alignItems: "center",
          "&:has(:disabled)": { opacity: 0.5 },
        }),
        containerClassName,
      )}
      spellCheck={false}
      className={cn(
        css({
          _disabled: { cursor: "not-allowed" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        css({
          display: "flex",
          alignItems: "center",
          borderRadius: "2xl",
          "&:has([aria-invalid])": {
            borderColor: "destructive",
            boxShadow:
              "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
          },
          _dark: {
            "&:has([aria-invalid])": {
              boxShadow:
                "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
            },
          },
        }),
        className,
      )}
      {...props}
    />
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
      className={cn(
        css({
          position: "relative",
          display: "flex",
          width: "8",
          height: "8",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: "1px",
          borderBottomWidth: "1px",
          borderRightWidth: "1px",
          borderColor: "input",
          bg: "input/50",
          fontSize: "sm",
          transitionProperty: "color, box-shadow",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          "&:first-child": {
            borderLeftWidth: "1px",
            borderTopLeftRadius: "2xl",
            borderBottomLeftRadius: "2xl",
          },
          "&:last-child": {
            borderTopRightRadius: "2xl",
            borderBottomRightRadius: "2xl",
          },
          _ariaInvalid: {
            borderColor: "destructive",
          },
          '&[data-active="true"]': {
            zIndex: 10,
            borderColor: "ring",
            boxShadow:
              "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)",
          },
          '&[data-active="true"][aria-invalid]': {
            boxShadow:
              "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
          },
          _dark: {
            '&[data-active="true"][aria-invalid]': {
              boxShadow:
                "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
            },
          },
        }),
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div
          className={css({
            pointerEvents: "none",
            position: "absolute",
            inset: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <div
            className={css({
              height: "4",
              width: "1px",
              animation: "caret-blink 1000ms ease-out infinite",
              bg: "foreground",
            })}
          />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className={css({
        display: "flex",
        alignItems: "center",
        "& svg:not([class*='size-'])": {
          width: "4",
          height: "4",
        },
      })}
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
