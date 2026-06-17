import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Label, RadioGroup, RadioGroupItem } from "@zero-app/ui-library";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="w-64">
      <Label className="gap-3">
        <RadioGroupItem value="default" />
        Default
      </Label>
      <Label className="gap-3">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label className="gap-3">
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
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue} className="w-64">
          <Label className="gap-3">
            <RadioGroupItem value="monthly" />
            Monthly
          </Label>
          <Label className="gap-3">
            <RadioGroupItem value="yearly" />
            Yearly
          </Label>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};

export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="w-64">
      <Label className="gap-3">
        <RadioGroupItem value="card" />
        Credit card
      </Label>
      <Label className="gap-3">
        <RadioGroupItem value="paypal" />
        PayPal
      </Label>
      <Label className="gap-3">
        <RadioGroupItem value="wire" disabled />
        Wire transfer (unavailable)
      </Label>
    </RadioGroup>
  ),
};
