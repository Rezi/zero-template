import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Skeleton } from "@zero-app/ui-library";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className={css({ h: "6", w: "48" })} />,
};

export const Card: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        w: "72",
        flexDirection: "column",
        gap: "3",
        rounded: "2xl",
        borderWidth: "1px",
        borderColor: "border",
        p: "4",
      })}
    >
      <Skeleton className={css({ h: "32", w: "full", rounded: "xl" })} />
      <Skeleton className={css({ h: "4", w: "75%" })} />
      <Skeleton className={css({ h: "4", w: "50%" })} />
    </div>
  ),
};

export const Profile: Story = {
  render: () => (
    <div className={css({ display: "flex", alignItems: "center", gap: "4" })}>
      <Skeleton className={css({ size: "12", rounded: "full" })} />
      <div className={css({ display: "flex", flexDirection: "column", gap: "2" })}>
        <Skeleton className={css({ h: "4", w: "40" })} />
        <Skeleton className={css({ h: "4", w: "24" })} />
      </div>
    </div>
  ),
};
