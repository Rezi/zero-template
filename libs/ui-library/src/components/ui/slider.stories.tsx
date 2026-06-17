import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Slider } from "@zero-app/ui-library";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | readonly number[]>([40]);
    const display = Array.isArray(value) ? value.join(", ") : String(value);
    return (
      <div className="flex w-80 flex-col gap-3">
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-sm text-muted-foreground">Value: {display}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[30]} max={100} disabled />
    </div>
  ),
};
