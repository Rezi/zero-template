import type { Meta, StoryObj } from "@storybook/react-vite";
import { css, cx } from "@zero-app/styled-system/css";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@zero-app/ui-library";

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const box = css({ h: "64", overflow: "hidden", rounded: "2xl", borderWidth: "1px" });
const w32 = css({ w: "32rem" });
const w40 = css({ w: "40rem" });
const panelInner = css({ display: "flex", h: "full", alignItems: "center", justifyContent: "center", p: "6" });
const medium = css({ fontWeight: "medium" });

export const Default: Story = {
  render: () => (
    <div className={cx(box, w32)}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className={panelInner}>
            <span className={medium}>One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className={panelInner}>
            <span className={medium}>Two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className={cx(box, w32)}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={35}>
          <div className={panelInner}>
            <span className={medium}>Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}>
          <div className={panelInner}>
            <span className={medium}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <div className={cx(box, w40)}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={25}>
          <div className={panelInner}>Sidebar</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className={panelInner}>Main</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <div className={panelInner}>Inspector</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
