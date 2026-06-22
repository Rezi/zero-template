import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

import { Header } from "@zero-app/zero-app-components";

// Header renders a TanStack Router `<Link>`, which throws without a router in
// context. Wrap each story in a throwaway in-memory router whose root route
// renders the story itself.
const withRouter: Decorator = (Story) => {
  const rootRoute = createRootRoute({ component: () => <Story /> });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};

const meta = {
  title: "App Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withRouter],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRightSlot: Story = {
  args: {
    rightSlot: <span>user@example.com</span>,
  },
};
