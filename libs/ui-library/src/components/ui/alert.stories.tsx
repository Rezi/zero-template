import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircleIcon, CheckCircle2Icon, XIcon } from "lucide-react";

import { css } from "@zero-app/styled-system/css";

import { Alert, AlertAction, AlertDescription, AlertTitle, Button } from "@zero-app/ui-library";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "destructive"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className={css({ maxW: "md" })}>
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved.</AlertTitle>
      <AlertDescription>
        This alert displays a title and an optional description below it.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args} className={css({ maxW: "md" })}>
      <AlertCircleIcon />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>Please verify your billing information and try again.</AlertDescription>
    </Alert>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Alert {...args} className={css({ maxW: "md" })}>
      <AlertCircleIcon />
      <AlertTitle>Your trial is ending soon.</AlertTitle>
      <AlertDescription>Upgrade to keep access to all features.</AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-sm" aria-label="Dismiss">
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  ),
};
