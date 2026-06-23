import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

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

const w72 = css({ w: "72" });

export const Default: Story = {
  render: (args) => <Progress {...args} className={w72} />,
};

export const Steps: Story = {
  render: () => (
    <div className={css({ display: "flex", w: "72", flexDirection: "column", gap: "4" })}>
      <Progress value={0} />
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <Progress {...args} className={w72}>
      <div
        className={css({
          display: "flex",
          w: "full",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <ProgressLabel>Uploading…</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
};

export const Indeterminate: Story = {
  render: () => <Progress value={null} className={w72} />,
};
