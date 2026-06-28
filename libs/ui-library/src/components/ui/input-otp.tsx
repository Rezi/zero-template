import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { inputOtp } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
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
      containerClassName={clsx("cn-input-otp", inputOtp().root, containerClassName)}
      spellCheck={false}
      className={clsx(inputOtp().input, className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-group" className={clsx(inputOtp().group, className)} {...props} />
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
      className={clsx(inputOtp().slot, className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={inputOtp().caretWrapper}>
          <div className={inputOtp().caret} />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className={inputOtp().separator}
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
