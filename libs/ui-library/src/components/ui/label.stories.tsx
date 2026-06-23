import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Input, Label } from "@zero-app/ui-library";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Email",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

const field72 = css({ display: "flex", w: "72", flexDirection: "column", gap: "2" });

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className={field72}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={field72}>
      <Label htmlFor="name">Full name</Label>
      <Input id="name" placeholder="Disabled input" disabled />
    </div>
  ),
};
