import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "@zero-app/ui-library";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">UI Library</h4>
        <p className="text-sm text-muted-foreground">A Base UI component collection.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-3 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Source</span>
        <Separator orientation="vertical" className="h-4" />
        <span>About</span>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-4">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Center</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};
