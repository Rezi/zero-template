import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { Label, RadioGroup, RadioGroupItem } from "@zero-app/ui-library";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const w64 = css({ w: "64" });
const gap3 = css({ gap: "3" });

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className={w64}>
      <Label className={gap3}>
        <RadioGroupItem value="default" />
        Default
      </Label>
      <Label className={gap3}>
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label className={gap3}>
        <RadioGroupItem value="compact" />
        Compact
      </Label>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("monthly");
    return (
      <div className={css({ display: "flex", flexDirection: "column", gap: "4" })}>
        <RadioGroup value={value} onValueChange={setValue} className={w64}>
          <Label className={gap3}>
            <RadioGroupItem value="monthly" />
            Monthly
          </Label>
          <Label className={gap3}>
            <RadioGroupItem value="yearly" />
            Yearly
          </Label>
        </RadioGroup>
        <p className={css({ fontSize: "sm", color: "muted.foreground" })}>Selected: {value}</p>
      </div>
    );
  },
};

export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className={w64}>
      <Label className={gap3}>
        <RadioGroupItem value="card" />
        Credit card
      </Label>
      <Label className={gap3}>
        <RadioGroupItem value="paypal" />
        PayPal
      </Label>
      <Label className={gap3}>
        <RadioGroupItem value="wire" disabled />
        Wire transfer (unavailable)
      </Label>
    </RadioGroup>
  ),
};
