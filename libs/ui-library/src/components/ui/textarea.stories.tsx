import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Type your message here.",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const w80 = css({ w: "80" });
const fieldGroup = css({ display: "flex", w: "80", flexDirection: "column", gap: "2" });

export const Default: Story = {
  render: (args) => <Textarea {...args} className={w80} />,
};

export const WithLabel: Story = {
  render: (args) => (
    <div className={fieldGroup}>
      <Label htmlFor="message">Your message</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Textarea {...args} className={w80} />,
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Not enough detail." },
  render: (args) => <Textarea {...args} className={w80} />,
};
