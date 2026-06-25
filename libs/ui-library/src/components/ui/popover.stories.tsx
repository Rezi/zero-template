import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className={css({ display: "flex", flexDirection: "column", gap: "2" })}>
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "3",
        })}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button>{open ? "Opened" : "Open"}</Button>} />
          <PopoverContent>
            <PopoverDescription>This popover is controlled via state.</PopoverDescription>
            <Button size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </PopoverContent>
        </Popover>
        <p className={css({ fontSize: "sm", color: "muted.foreground" })}>Open: {String(open)}</p>
      </div>
    );
  },
};
