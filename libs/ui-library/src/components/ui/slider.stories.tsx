import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { Slider } from "./slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const w80 = css({ w: "80" });

export const Default: Story = {
  render: () => (
    <div className={w80}>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className={w80}>
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | readonly number[]>([40]);
    const display = Array.isArray(value) ? value.join(", ") : String(value);
    return (
      <div className={css({ display: "flex", w: "80", flexDirection: "column", gap: "3" })}>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className={css({ fontSize: "sm", color: "muted.foreground" })}>Value: {display}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className={w80}>
      <Slider defaultValue={[30]} max={100} disabled />
    </div>
  ),
};
