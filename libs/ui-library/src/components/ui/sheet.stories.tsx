import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const field = css({ display: "flex", flexDirection: "column", gap: "2" });
const navLink = css({ rounded: "xl", px: "3", py: "2", _hover: { bg: "accent" } });

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className={css({ display: "flex", flexDirection: "column", gap: "4", px: "6" })}>
          <div className={field}>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Ada Lovelace" />
          </div>
          <div className={field}>
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@ada" />
          </div>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open from left</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse the sections of the app.</SheetDescription>
        </SheetHeader>
        <nav
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1",
            px: "4",
            fontSize: "sm",
          })}
        >
          <a className={navLink} href="/">
            Home
          </a>
          <a className={navLink} href="/library">
            Library
          </a>
          <a className={navLink} href="/settings">
            Settings
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open from bottom</Button>} />
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Cookie settings</SheetTitle>
          <SheetDescription>Manage your cookie preferences below.</SheetDescription>
        </SheetHeader>
        <SheetFooter className={css({ flexDirection: "row", justifyContent: "flex-end" })}>
          <SheetClose render={<Button variant="outline">Decline</Button>} />
          <SheetClose render={<Button>Accept</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
