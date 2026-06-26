import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";
import { css } from "@zero-app/styled-system/css";

import { Button } from "./button";
import { Toaster } from "./sonner";

const meta = {
  title: "Components/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  // `toast()` writes to a single GLOBAL store, so every <Toaster/> mounted in the
  // same document renders the same toast. Render each story in its own iframe so
  // each gets an isolated document/store — a story's trigger only shows its own
  // toast and never bleeds into the others on the docs page.
  parameters: {
    docs: { story: { inline: false, height: "180px" } },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Show toast
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        }
      >
        Show toast with description
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={css({ display: "flex", flexWrap: "wrap", gap: "3" })}>
      <Toaster />
      <Button variant="outline" onClick={() => toast.success("Profile updated")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("New update available")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Storage almost full")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
    </div>
  ),
};
