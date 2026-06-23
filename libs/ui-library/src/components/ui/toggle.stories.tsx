import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { css } from "@zero-app/styled-system/css";

import { Toggle } from "@zero-app/ui-library";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["default", "sm", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <Toggle {...args}>
      <ItalicIcon /> Italic
    </Toggle>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
      <Toggle {...args} variant="default" aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle {...args} variant="outline" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
      <Toggle {...args} size="sm" aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle {...args} size="default" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle {...args} size="lg" aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
};
