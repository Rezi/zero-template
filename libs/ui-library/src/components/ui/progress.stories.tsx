import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress, ProgressLabel, ProgressValue } from "@zero-app/ui-library";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  args: {
    value: 66,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Progress {...args} className="w-72" />,
};

export const Steps: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Progress value={0} />
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <Progress {...args} className="w-72">
      <div className="flex w-full items-center justify-between">
        <ProgressLabel>Uploading…</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
};

export const Indeterminate: Story = {
  render: () => <Progress value={null} className="w-72" />,
};
