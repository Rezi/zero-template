import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label, Textarea } from "@zero-app/ui-library";

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

export const Default: Story = {
  render: (args) => <Textarea {...args} className="w-80" />,
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Textarea {...args} className="w-80" />,
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Not enough detail." },
  render: (args) => <Textarea {...args} className="w-80" />,
};
