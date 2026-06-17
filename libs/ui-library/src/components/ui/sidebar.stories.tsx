import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from "lucide-react";

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
} from "@zero-app/ui-library";

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

export const Default: Story = {
  render: () => (
    <div className="h-96 w-full">
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarHeader className="px-4 py-3 font-heading text-base font-medium">
            Acme Inc
          </SidebarHeader>
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
          <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">v1.0.0</SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex items-center gap-2 border-b p-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="p-6 text-sm text-muted-foreground">Main content area.</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <div className="h-96 w-full">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader className="px-4 py-3 font-heading text-base font-medium">
            Acme
          </SidebarHeader>
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
          <div className="flex items-center gap-2 border-b p-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Toggle the sidebar to collapse it to icons.</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
};
