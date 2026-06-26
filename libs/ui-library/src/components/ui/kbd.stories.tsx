import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Kbd, KbdGroup } from "./kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  args: {
    children: "K",
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

const mutedText = css({ color: "muted.foreground" });
const shortcutRow = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8",
});

export const Default: Story = {};

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span className={mutedText}>+</span>
      <Kbd>Shift</Kbd>
      <span className={mutedText}>+</span>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
};

export const Shortcuts: Story = {
  render: () => (
    <div className={css({ display: "flex", flexDirection: "column", gap: "3" })}>
      <div className={shortcutRow}>
        <span className={css({ fontSize: "sm" })}>Open command palette</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className={shortcutRow}>
        <span className={css({ fontSize: "sm" })}>Save</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className={shortcutRow}>
        <span className={css({ fontSize: "sm" })}>Undo</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
};
