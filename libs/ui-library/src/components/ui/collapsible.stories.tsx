import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { css } from "@zero-app/styled-system/css";

import { Button } from "./button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

const root = css({ w: "72", "& > * + *": { mt: "2" } });
const stackGap2 = css({ "& > * + *": { mt: "2" } });
const repoItem = css({ rounded: "md", borderWidth: "1px", px: "4", py: "2", fontSize: "sm" });

export const Default: Story = {
  render: () => (
    <Collapsible className={root}>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "4",
        })}
      >
        <span className={css({ fontSize: "sm", fontWeight: "medium" })}>
          @zero-app starred 3 repositories
        </span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Toggle">
              <ChevronsUpDownIcon />
            </Button>
          }
        />
      </div>
      <div className={repoItem}>@base-ui/react</div>
      <CollapsibleContent className={stackGap2}>
        <div className={repoItem}>@radix-ui/react</div>
        <div className={repoItem}>@shadcn/ui</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className={root}>
        <CollapsibleTrigger render={<Button variant="outline" />}>
          {open ? "Hide" : "Show"} details
        </CollapsibleTrigger>
        <CollapsibleContent className={repoItem}>
          This content is toggled via controlled state.
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
