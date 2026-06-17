import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@zero-app/ui-library";

const meta = {
  title: "Components/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  // OTPInput requires `maxLength` + `children`; each story overrides them via
  // its own `render`, but the meta-level args satisfy the typed contract.
  args: {
    maxLength: 6,
    children: <></>,
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col items-start gap-3">
        <InputOTP maxLength={4} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground">Entered value: {value || "(empty)"}</p>
      </div>
    );
  },
};
