import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@zero-app/ui-library";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-72 space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">@zero-app starred 3 repositories</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Toggle">
              <ChevronsUpDownIcon />
            </Button>
          }
        />
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">@base-ui/react</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/react</div>
        <div className="rounded-md border px-4 py-2 text-sm">@shadcn/ui</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72 space-y-2">
        <CollapsibleTrigger render={<Button variant="outline" />}>
          {open ? "Hide" : "Show"} details
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-md border px-4 py-2 text-sm">
          This content is toggled via controlled state.
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
