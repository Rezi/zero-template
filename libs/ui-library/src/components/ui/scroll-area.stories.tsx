import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { ScrollArea } from "./scroll-area";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 40 }, (_, i) => `v1.0.0-tag-${i + 1}`);

const mutedSm = css({ fontSize: "sm", color: "muted.foreground" });

export const Default: Story = {
  render: () => (
    <ScrollArea className={css({ h: "64", w: "56", rounded: "2xl", borderWidth: "1px" })}>
      <div className={css({ display: "flex", flexDirection: "column", gap: "2", p: "4" })}>
        <h4 className={css({ fontSize: "sm", fontWeight: "medium" })}>Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className={mutedSm}>
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <ScrollArea className={css({ h: "48", w: "80", rounded: "2xl", borderWidth: "1px", p: "4" })}>
      <p className={css({ fontSize: "sm", lineHeight: "relaxed", color: "muted.foreground" })}>
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
