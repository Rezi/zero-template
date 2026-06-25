import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarIcon } from "lucide-react";
import { css } from "@zero-app/styled-system/css";

import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@zero-app/ui-library";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mutedSm = css({ fontSize: "sm", color: "muted.foreground" });

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link">@zero-app</Button>} />
      <HoverCardContent>
        <div className={css({ display: "flex", flexDirection: "column", gap: "2" })}>
          <h4
            className={css({
              fontFamily: "var(--font-heading)",
              fontSize: "sm",
              fontWeight: "medium",
            })}
          >
            @zero-app
          </h4>
          <p className={mutedSm}>The shadcn-style component library built on Base UI.</p>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "2",
              fontSize: "xs",
              color: "muted.foreground",
            })}
          >
            <CalendarIcon className={css({ size: "3" })} />
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
        <p className={css({ fontSize: "sm" })}>
          This preview card opens to the right of the trigger.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};
