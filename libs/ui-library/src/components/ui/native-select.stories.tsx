import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import {
  Label,
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args} defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className={css({ display: "flex", flexDirection: "column", gap: "2" })}>
      <Label htmlFor="country">Country</Label>
      <NativeSelect {...args} id="country" defaultValue="cz">
        <NativeSelectOption value="cz">Czechia</NativeSelectOption>
        <NativeSelectOption value="sk">Slovakia</NativeSelectOption>
        <NativeSelectOption value="de">Germany</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const WithGroups: Story = {
  render: (args) => (
    <NativeSelect {...args} defaultValue="cat">
      <NativeSelectOptGroup label="Pets">
        <NativeSelectOption value="cat">Cat</NativeSelectOption>
        <NativeSelectOption value="dog">Dog</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Wild">
        <NativeSelectOption value="lion">Lion</NativeSelectOption>
        <NativeSelectOption value="tiger">Tiger</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <NativeSelect {...args} defaultValue="one">
      <NativeSelectOption value="one">One</NativeSelectOption>
      <NativeSelectOption value="two">Two</NativeSelectOption>
      <NativeSelectOption value="three">Three</NativeSelectOption>
    </NativeSelect>
  ),
};
