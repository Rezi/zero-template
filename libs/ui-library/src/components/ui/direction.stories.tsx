import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, DirectionProvider } from "@zero-app/ui-library";

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
      <div dir={direction} className="flex items-center gap-2 rounded-md border p-4">
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
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-sm text-muted-foreground">LTR</p>
        <DemoRow direction="ltr" />
      </div>
      <div>
        <p className="mb-1 text-sm text-muted-foreground">RTL</p>
        <DemoRow direction="rtl" />
      </div>
    </div>
  ),
};
