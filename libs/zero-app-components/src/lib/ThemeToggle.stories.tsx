import type { Meta, StoryObj } from "@storybook/react-vite";
import ThemeToggle from "./ThemeToggle";

// ThemeToggle cycles the document's theme (light → dark → auto) and persists it
// to localStorage, so clicking it here will also drive Storybook's own theme.
const meta = {
  title: "App Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
