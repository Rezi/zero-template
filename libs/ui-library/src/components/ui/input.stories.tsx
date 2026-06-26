import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    type: "text",
    placeholder: "Type something…",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const w72 = css({ w: "72" });

export const Default: Story = {
  render: (args) => <Input {...args} className={w72} />,
};

export const WithValue: Story = {
  args: { defaultValue: "Hello world" },
  render: (args) => <Input {...args} className={w72} />,
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Disabled input" },
  render: (args) => <Input {...args} className={w72} />,
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
  render: (args) => <Input {...args} className={w72} />,
};

export const Types: Story = {
  args: { placeholder: undefined },
  render: () => (
    <div className={css({ display: "flex", w: "72", flexDirection: "column", gap: "3" })}>
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="search" placeholder="Search" />
    </div>
  ),
};
