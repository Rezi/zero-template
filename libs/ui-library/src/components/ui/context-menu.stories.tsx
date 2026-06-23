import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const w52 = css({ w: "52" });

const Trigger = (
  <ContextMenuTrigger
    className={css({
      display: "flex",
      h: "40",
      w: "72",
      alignItems: "center",
      justifyContent: "center",
      rounded: "md",
      borderWidth: "1px",
      borderStyle: "dashed",
      fontSize: "sm",
    })}
  >
    Right click here
  </ContextMenuTrigger>
);

export const Default: Story = {
  render: () => (
    <ContextMenu>
      {Trigger}
      <ContextMenuContent className={w52}>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      {Trigger}
      <ContextMenuContent className={w52}>
        <ContextMenuItem>New Tab</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save Page As…</ContextMenuItem>
            <ContextMenuItem>Create Shortcut…</ContextMenuItem>
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxAndRadio: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [view, setView] = React.useState("grid");
    return (
      <ContextMenu>
        {Trigger}
        <ContextMenuContent className={w52}>
          <ContextMenuGroup>
            <ContextMenuLabel>Appearance</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
              Show Bookmarks
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuLabel>View</ContextMenuLabel>
            <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
            <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
