import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderIcon, PlusIcon, SearchIcon } from "lucide-react";
import { css } from "@zero-app/styled-system/css";

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

const emptyBox = css({ w: "96", borderWidth: "1px" });

export const Default: Story = {
  render: () => (
    <Empty className={emptyBox}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create your first project to get started. Your projects will show up here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon /> New project
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const NoResults: Story = {
  render: () => (
    <Empty className={emptyBox}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters to find what you are looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear filters</Button>
      </EmptyContent>
    </Empty>
  ),
};
