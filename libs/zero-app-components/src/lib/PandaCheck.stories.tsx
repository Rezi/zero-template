import type { Meta, StoryObj } from "@storybook/react-vite";

import { PandaCheck } from "@zero-app/zero-app-components";

const meta = {
  title: "App Components/PandaCheck",
  component: PandaCheck,
  tags: ["autodocs"],
} satisfies Meta<typeof PandaCheck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
