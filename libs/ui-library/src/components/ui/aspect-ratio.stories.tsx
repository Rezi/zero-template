import type { Meta, StoryObj } from "@storybook/react-vite";

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
    <div className="w-96">
      <AspectRatio {...args} className="overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
          alt="Landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <div className="w-64">
      <AspectRatio
        {...args}
        className="flex items-center justify-center rounded-2xl bg-muted text-muted-foreground"
      >
        1:1
      </AspectRatio>
    </div>
  ),
};
