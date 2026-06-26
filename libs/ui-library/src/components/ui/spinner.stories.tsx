import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Spinner } from "./spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className={css({ display: "flex", alignItems: "center", gap: "4" })}>
      <Spinner className={css({ size: "3" })} />
      <Spinner className={css({ size: "4" })} />
      <Spinner className={css({ size: "6" })} />
      <Spinner className={css({ size: "8" })} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "2",
        fontSize: "sm",
        color: "muted.foreground",
      })}
    >
      <Spinner />
      Loading…
    </div>
  ),
};
