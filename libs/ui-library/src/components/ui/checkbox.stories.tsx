import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  render: () => (
    <div className={css({ display: "flex", alignItems: "center", gap: "4" })}>
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Label className={css({ display: "flex", alignItems: "center", gap: "2" })}>
      <Checkbox defaultChecked />
      Accept terms and conditions
    </Label>
  ),
};
