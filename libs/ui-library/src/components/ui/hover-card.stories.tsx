import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarIcon } from "lucide-react";

import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@zero-app/ui-library";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link">@zero-app</Button>} />
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <h4 className="font-heading text-sm font-medium">@zero-app</h4>
          <p className="text-sm text-muted-foreground">
            The shadcn-style component library built on Base UI.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarIcon className="size-3" />
            Joined December 2025
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const RightSide: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="outline">Hover me</Button>} />
      <HoverCardContent side="right">
        <p className="text-sm">This preview card opens to the right of the trigger.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
