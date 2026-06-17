import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zero-app/ui-library";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("overview");
    return (
      <Tabs
        {...args}
        value={value}
        onValueChange={(next) => setValue(String(next))}
        className="w-96"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel — selected: {value}</TabsContent>
        <TabsContent value="analytics">Analytics panel — selected: {value}</TabsContent>
        <TabsContent value="reports">Reports panel — selected: {value}</TabsContent>
      </Tabs>
    );
  },
};

export const Line: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="one" className="w-80">
      <TabsList variant="line">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel.</TabsContent>
      <TabsContent value="two">Second panel.</TabsContent>
      <TabsContent value="three">Third panel.</TabsContent>
    </Tabs>
  ),
};
