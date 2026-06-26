import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { css } from "@zero-app/styled-system/css";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar";

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Search", icon: SearchIcon },
  { title: "Settings", icon: SettingsIcon },
];

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const shell = css({ h: "96", w: "full" });
const brand = css({
  px: "4",
  py: "3",
  fontFamily: "var(--font-heading)",
  fontSize: "1rem",
  fontWeight: "medium",
});
const topbar = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
  borderBottomWidth: "1px",
  p: "4",
});
const topbarLabel = css({ fontSize: "sm", fontWeight: "medium" });

export const Default: Story = {
  render: () => (
    <div className={shell}>
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarHeader className={brand}>Acme Inc</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={index === 0}
                        render={
                          <a href="/">
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        }
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter
            className={css({ px: "4", py: "3", fontSize: "xs", color: "muted.foreground" })}
          >
            v1.0.0
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className={topbar}>
            <SidebarTrigger />
            <span className={topbarLabel}>Dashboard</span>
          </div>
          <div className={css({ p: "6", fontSize: "sm", color: "muted.foreground" })}>
            Main content area.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <div className={shell}>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader className={brand}>Acme</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        render={
                          <a href="/">
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        }
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className={topbar}>
            <SidebarTrigger />
            <span className={topbarLabel}>Toggle the sidebar to collapse it to icons.</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
};
