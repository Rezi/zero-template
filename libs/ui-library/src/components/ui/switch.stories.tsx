import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const stateRow = css({ display: "flex", alignItems: "center", gap: "3" });
const stateText = css({ fontSize: "sm", color: "muted.foreground" });

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
        <Switch
          {...args}
          id="airplane"
          checked={checked}
          onCheckedChange={(value) => setChecked(value)}
        />
        <Label htmlFor="airplane">{checked ? "On" : "Off"}</Label>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className={css({ display: "flex", alignItems: "center", gap: "4" })}>
      <Switch {...args} size="sm" defaultChecked />
      <Switch {...args} size="default" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className={css({ display: "flex", flexDirection: "column", gap: "4" })}>
      <div className={stateRow}>
        <Switch {...args} disabled />
        <span className={stateText}>Disabled (off)</span>
      </div>
      <div className={stateRow}>
        <Switch {...args} disabled defaultChecked />
        <span className={stateText}>Disabled (on)</span>
      </div>
      <div className={stateRow}>
        <Switch {...args} aria-invalid />
        <span className={stateText}>Invalid</span>
      </div>
    </div>
  ),
};
