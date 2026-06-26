import type { Meta, StoryObj } from "@storybook/react-vite";
import { MailIcon, SearchIcon, SendIcon } from "lucide-react";
import { css } from "@zero-app/styled-system/css";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group";
import { Kbd } from "./kbd";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const w80 = css({ w: "80" });

export const Default: Story = {
  render: () => (
    <InputGroup className={w80}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
  ),
};

export const WithTextPrefix: Story = {
  render: () => (
    <InputGroup className={w80}>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup className={w80}>
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
      <InputGroupInput type="email" placeholder="you@example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="default" size="sm">
          <SendIcon /> Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithKbd: Story = {
  render: () => (
    <InputGroup className={w80}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className={w80}>
      <InputGroupTextarea placeholder="Write a message…" rows={3} />
      <InputGroupAddon align="block-end">
        <InputGroupButton variant="default" size="sm" className={css({ ml: "auto" })}>
          <SendIcon /> Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};
