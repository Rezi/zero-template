import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Separator } from "./separator";

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

const textSm = css({ fontSize: "sm" });

export const Horizontal: Story = {
  render: () => (
    <div className={css({ w: "64" })}>
      <div className={css({ "& > * + *": { mt: "1" } })}>
        <h4 className={css({ fontSize: "sm", fontWeight: "medium" })}>UI Library</h4>
        <p className={css({ fontSize: "sm", color: "muted.foreground" })}>
          A Base UI component collection.
        </p>
      </div>
      <Separator className={css({ my: "4" })} />
      <div className={css({ display: "flex", alignItems: "center", gap: "3", fontSize: "sm" })}>
        <span>Docs</span>
        <Separator orientation="vertical" className={css({ h: "4" })} />
        <span>Source</span>
        <Separator orientation="vertical" className={css({ h: "4" })} />
        <span>About</span>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className={css({ display: "flex", h: "16", alignItems: "center", gap: "4" })}>
      <span className={textSm}>Left</span>
      <Separator orientation="vertical" />
      <span className={textSm}>Center</span>
      <Separator orientation="vertical" />
      <span className={textSm}>Right</span>
    </div>
  ),
};
