import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Label, Switch } from "@zero-app/ui-library";

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

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex items-center gap-2">
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
    <div className="flex items-center gap-4">
      <Switch {...args} size="sm" defaultChecked />
      <Switch {...args} size="default" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch {...args} disabled />
        <span className="text-sm text-muted-foreground">Disabled (off)</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch {...args} disabled defaultChecked />
        <span className="text-sm text-muted-foreground">Disabled (on)</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch {...args} aria-invalid />
        <span className="text-sm text-muted-foreground">Invalid</span>
      </div>
    </div>
  ),
};
