import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { AspectRatio } from "@zero-app/ui-library";

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  args: {
    ratio: 16 / 9,
  },
  argTypes: {
    ratio: { control: "number" },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className={css({ w: "96" })}>
      <AspectRatio {...args} className={css({ overflow: "hidden", rounded: "2xl" })}>
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
          alt="Landscape"
          className={css({ size: "full", objectFit: "cover" })}
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <div className={css({ w: "64" })}>
      <AspectRatio
        {...args}
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          rounded: "2xl",
          bg: "muted",
          color: "muted.foreground",
        })}
      >
        1:1
      </AspectRatio>
    </div>
  ),
};
