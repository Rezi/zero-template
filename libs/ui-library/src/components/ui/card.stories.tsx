import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className={css({ w: "80" })}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Help
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className={css({ color: "muted.foreground" })}>
          Name your project and pick a framework to get started.
        </p>
      </CardContent>
      <CardFooter
        className={css({
          justifyContent: "flex-end",
          gap: "2",
          borderTopWidth: "1px",
          borderColor: "border",
        })}
      >
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args} className={css({ w: "72" })}>
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Uses the tighter `sm` spacing.</CardDescription>
      </CardHeader>
      <CardContent>Less padding, same structure.</CardContent>
    </Card>
  ),
};
