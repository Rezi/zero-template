import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRightIcon, MusicIcon } from "lucide-react";
import { css } from "@zero-app/styled-system/css";

import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/Item",
  component: Item,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline", "muted"],
    },
    size: {
      control: "inline-radio",
      options: ["default", "sm", "xs"],
    },
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

const w96 = css({ w: "96" });

export const Default: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Item {...args} className={w96}>
      <ItemMedia variant="icon">
        <MusicIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Midnight City</ItemTitle>
        <ItemDescription>M83 · Hurry Up, We're Dreaming</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm" aria-label="Open">
          <ChevronRightIcon />
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={css({ display: "flex", w: "96", flexDirection: "column", gap: "3" })}>
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>Transparent border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>Visible border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>Muted background.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <ItemGroup className={w96}>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <MusicIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Track one</ItemTitle>
          <ItemDescription>First item in the list.</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemMedia variant="icon">
          <MusicIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Track two</ItemTitle>
          <ItemDescription>Second item in the list.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Item
      variant="outline"
      className={w96}
      render={<a href="#item" aria-label="Rendered as an anchor" />}
    >
      <ItemContent>
        <ItemTitle>Rendered as an anchor</ItemTitle>
        <ItemDescription>Uses Base UI's render prop to become a link.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon className={css({ size: "4" })} />
      </ItemActions>
    </Item>
  ),
};
