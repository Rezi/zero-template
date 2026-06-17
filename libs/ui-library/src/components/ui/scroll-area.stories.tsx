import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea } from "@zero-app/ui-library";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 40 }, (_, i) => `v1.0.0-tag-${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-2xl border">
      <div className="flex flex-col gap-2 p-4">
        <h4 className="text-sm font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm text-muted-foreground">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <ScrollArea className="h-48 w-80 rounded-2xl border p-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        {Array.from({ length: 12 })
          .map(
            () =>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          )
          .join(" ")}
      </p>
    </ScrollArea>
  ),
};
