import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import { Button } from "./button";
import { DirectionProvider } from "./direction";

const meta = {
  title: "Components/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "inline-radio", options: ["ltr", "rtl"] },
  },
} satisfies Meta<typeof DirectionProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// DirectionProvider is a context-only Base UI provider with no visual output of
// its own — it tells Base UI components which reading direction to use. The
// native `dir` attribute is mirrored on the wrapper so the effect is visible.
function DemoRow({ direction }: { direction: "ltr" | "rtl" }) {
  return (
    <DirectionProvider direction={direction}>
      <div
        dir={direction}
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "2",
          rounded: "md",
          borderWidth: "1px",
          borderColor: "border",
          p: "4",
        })}
      >
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </DirectionProvider>
  );
}

export const Default: Story = {
  args: { direction: "ltr" },
  render: (args) => <DemoRow direction={args.direction ?? "ltr"} />,
};

export const RightToLeft: Story = {
  args: { direction: "rtl" },
  render: (args) => <DemoRow direction={args.direction ?? "rtl"} />,
};

export const SideBySide: Story = {
  render: () => (
    <div className={css({ spaceY: "4" })}>
      <div>
        <p className={css({ mb: "1", fontSize: "sm", color: "muted.foreground" })}>LTR</p>
        <DemoRow direction="ltr" />
      </div>
      <div>
        <p className={css({ mb: "1", fontSize: "sm", color: "muted.foreground" })}>RTL</p>
        <DemoRow direction="rtl" />
      </div>
    </div>
  ),
};
