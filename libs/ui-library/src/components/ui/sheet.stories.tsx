import type { Meta, StoryObj } from "@storybook/react-vite";

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
        <div className="flex flex-col gap-4 px-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Ada Lovelace" />
          </div>
          <div className="flex flex-col gap-2">
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
        <nav className="flex flex-col gap-1 px-4 text-sm">
          <a className="rounded-xl px-3 py-2 hover:bg-accent" href="/">
            Home
          </a>
          <a className="rounded-xl px-3 py-2 hover:bg-accent" href="/library">
            Library
          </a>
          <a className="rounded-xl px-3 py-2 hover:bg-accent" href="/settings">
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
        <SheetFooter className="flex-row justify-end">
          <SheetClose render={<Button variant="outline">Decline</Button>} />
          <SheetClose render={<Button>Accept</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
