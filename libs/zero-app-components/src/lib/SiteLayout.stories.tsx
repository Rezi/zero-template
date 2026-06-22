import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

import { SiteLayout } from "@zero-app/zero-app-components";

// SiteLayout renders Header, which uses a TanStack Router `<Link>`. Provide a
// throwaway in-memory router so the link has a router in context.
const withRouter: Decorator = (Story) => {
  const rootRoute = createRootRoute({ component: () => <Story /> });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return <RouterProvider router={router} />;
};

const meta = {
  title: "App Components/SiteLayout",
  component: SiteLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withRouter],
} satisfies Meta<typeof SiteLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Page content goes here.</p>,
  },
};

export const WithRightSlot: Story = {
  args: {
    children: <p>Page content goes here.</p>,
    rightSlot: <span>user@example.com</span>,
  },
};
