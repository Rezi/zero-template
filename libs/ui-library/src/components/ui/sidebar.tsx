"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, css, type RecipeVariantProps } from "@zero-app/styled-system/css";

import { useIsMobile } from "../../hooks/use-mobile";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { PanelLeftIcon } from "lucide-react";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const sidebarProviderStyles = css({
  display: "flex",
  minH: "100svh",
  w: "full",
  "&:has([data-variant=inset])": { bg: "sidebar" },
});

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(sidebarProviderStyles, className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

const sidebarNoneStyles = css({
  display: "flex",
  h: "full",
  w: "var(--sidebar-width)",
  flexDirection: "column",
  bg: "sidebar",
  color: "sidebar.foreground",
});

const sidebarMobileStyles = css({
  w: "var(--sidebar-width)",
  bg: "sidebar",
  p: "0",
  color: "sidebar.foreground",
  "& > button": { display: "none" },
});

const sidebarDesktopStyles = css({ display: "none", color: "sidebar.foreground", md: { display: "block" } });
const sidebarMobileInnerStyles = css({ display: "flex", h: "full", w: "full", flexDirection: "column" });

const sidebarGapStyles = css({
  position: "relative",
  w: "var(--sidebar-width)",
  bg: "transparent",
  transitionProperty: "width",
  transitionDuration: "200ms",
  transitionTimingFunction: "linear",
  "[data-slot='sidebar'][data-collapsible=offcanvas] &": { w: "0" },
  "[data-slot='sidebar'][data-side=right] &": { rotate: "180deg" },
});
const sidebarGapFloating = css({
  "[data-slot='sidebar'][data-collapsible=icon] &": {
    w: "calc(var(--sidebar-width-icon) + var(--spacing, 0.25rem) * 4)",
  },
});
const sidebarGapDefault = css({
  "[data-slot='sidebar'][data-collapsible=icon] &": { w: "var(--sidebar-width-icon)" },
});

const sidebarContainerStyles = css({
  position: "fixed",
  insetBlock: "0",
  zIndex: "10",
  display: "none",
  h: "100svh",
  w: "var(--sidebar-width)",
  transitionProperty: "left, right, width",
  transitionDuration: "200ms",
  transitionTimingFunction: "linear",
  md: { display: "flex" },
  "&[data-side=left]": { left: "0" },
  "&[data-side=right]": { right: "0" },
  "[data-slot='sidebar'][data-collapsible=offcanvas] &": {
    "&[data-side=left]": { left: "calc(var(--sidebar-width) * -1)" },
    "&[data-side=right]": { right: "calc(var(--sidebar-width) * -1)" },
  },
});
const sidebarContainerFloating = css({
  p: "2",
  "[data-slot='sidebar'][data-collapsible=icon] &": {
    w: "calc(var(--sidebar-width-icon) + var(--spacing, 0.25rem) * 4 + 2px)",
  },
});
const sidebarContainerDefault = css({
  "[data-slot='sidebar'][data-collapsible=icon] &": { w: "var(--sidebar-width-icon)" },
  "[data-slot='sidebar'][data-side=left] &": { borderRightWidth: "1px" },
  "[data-slot='sidebar'][data-side=right] &": { borderLeftWidth: "1px" },
});

const sidebarInnerStyles = css({
  display: "flex",
  size: "full",
  flexDirection: "column",
  bg: "sidebar",
  "[data-slot='sidebar'][data-variant=floating] &": {
    rounded: "2xl",
    boxShadow: "sm",
    ringW: "1",
    ringC: "sidebar.border",
  },
});

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div data-slot="sidebar" className={cn(sidebarNoneStyles, className)} {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={sidebarMobileStyles}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className={css({ srOnly: true })}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className={sidebarMobileInnerStyles}>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      // `group`/`peer` markers kept literal — translated scopes below target the
      // `data-slot="sidebar"` attributes on this same element / as a sibling.
      className={cn("group peer", sidebarDesktopStyles)}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          sidebarGapStyles,
          variant === "floating" || variant === "inset" ? sidebarGapFloating : sidebarGapDefault,
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          sidebarContainerStyles,
          variant === "floating" || variant === "inset"
            ? sidebarContainerFloating
            : sidebarContainerDefault,
          className,
        )}
        {...props}
      >
        <div data-sidebar="sidebar" data-slot="sidebar-inner" className={sidebarInnerStyles}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className={css({ srOnly: true })}>Toggle Sidebar</span>
    </Button>
  );
}

const sidebarRailStyles = css({
  position: "absolute",
  insetBlock: "0",
  zIndex: "20",
  display: "none",
  w: "4",
  transitionProperty: "all",
  transitionTimingFunction: "linear",
  transform: "translateX(-50%)",
  sm: { display: "flex" },
  "[data-slot='sidebar'][data-side=left] &": { right: "-4" },
  "[data-slot='sidebar'][data-side=right] &": { left: "0" },
  "&::after": { content: '""', position: "absolute", insetBlock: "0", insetInlineStart: "50%", w: "2px" },
  "&:hover::after": { bg: "sidebar.border" },
  "[data-side=left] &": { cursor: "w-resize" },
  "[data-side=right] &": { cursor: "e-resize" },
  "[data-side=left][data-state=collapsed] &": { cursor: "e-resize" },
  "[data-side=right][data-state=collapsed] &": { cursor: "w-resize" },
  "[data-slot='sidebar'][data-collapsible=offcanvas] &": {
    transform: "translateX(0)",
    "&::after": { left: "full" },
    _hover: { bg: "sidebar" },
  },
  "[data-side=left][data-collapsible=offcanvas] &": { right: "-2" },
  "[data-side=right][data-collapsible=offcanvas] &": { left: "-2" },
});

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(sidebarRailStyles, className)}
      {...props}
    />
  );
}

const sidebarInsetStyles = css({
  position: "relative",
  display: "flex",
  w: "full",
  flex: "1",
  flexDirection: "column",
  bg: "background",
  "[data-slot='sidebar'][data-variant=inset] ~ &": {
    md: { m: "2", ml: "0", rounded: "2xl", boxShadow: "sm" },
  },
  "[data-slot='sidebar'][data-variant=inset][data-state=collapsed] ~ &": {
    md: { ml: "2" },
  },
});

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return <main data-slot="sidebar-inset" className={cn(sidebarInsetStyles, className)} {...props} />;
}

const sidebarInputStyles = css({ h: "8", w: "full", bg: "input/50", boxShadow: "none" });

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(sidebarInputStyles, className)}
      {...props}
    />
  );
}

const sidebarHeaderStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  p: "2",
  "--radius": "var(--radius-xl)",
});

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn(sidebarHeaderStyles, className)}
      {...props}
    />
  );
}

const sidebarFooterStyles = css({ display: "flex", flexDirection: "column", gap: "2", p: "2" });

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn(sidebarFooterStyles, className)}
      {...props}
    />
  );
}

const sidebarSeparatorStyles = css({ mx: "2", w: "auto", bg: "sidebar.border" });

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn(sidebarSeparatorStyles, className)}
      {...props}
    />
  );
}

const sidebarContentStyles = css({
  display: "flex",
  minH: "0",
  flex: "1",
  flexDirection: "column",
  gap: "2",
  overflow: "auto",
  "--radius": "var(--radius-xl)",
  "[data-slot='sidebar'][data-collapsible=icon] &": { overflow: "hidden" },
});

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn("no-scrollbar", sidebarContentStyles, className)}
      {...props}
    />
  );
}

const sidebarGroupStyles = css({
  position: "relative",
  display: "flex",
  w: "full",
  minW: "0",
  flexDirection: "column",
  p: "2",
});

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(sidebarGroupStyles, className)}
      {...props}
    />
  );
}

const sidebarGroupLabelStyles = css({
  display: "flex",
  h: "8",
  flexShrink: "0",
  alignItems: "center",
  rounded: "xl",
  px: "3",
  fontSize: "xs",
  fontWeight: "medium",
  color: "sidebar.foreground/70",
  ringC: "sidebar.ring",
  outline: "none",
  transitionProperty: "margin, opacity",
  transitionDuration: "200ms",
  transitionTimingFunction: "linear",
  _focusVisible: { ringW: "3" },
  "[data-slot='sidebar'][data-collapsible=icon] &": { mt: "-8", opacity: "0" },
  "& > svg": { size: "4", flexShrink: "0" },
});

function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(sidebarGroupLabelStyles, className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  });
}

const sidebarGroupActionStyles = css({
  position: "absolute",
  top: "3.5",
  right: "3",
  display: "flex",
  aspectRatio: "square",
  w: "5",
  alignItems: "center",
  justifyContent: "center",
  rounded: "xl",
  p: "0",
  color: "sidebar.foreground",
  ringC: "sidebar.ring",
  outline: "none",
  transitionProperty: "transform",
  "[data-slot='sidebar'][data-collapsible=icon] &": { display: "none" },
  "&::after": { content: '""', position: "absolute", inset: "-2" },
  _hover: { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
  _focusVisible: { ringW: "3" },
  md: { "&::after": { display: "none" } },
  "& > svg": { size: "4", flexShrink: "0" },
});

function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarGroupActionStyles, className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  });
}

const sidebarGroupContentStyles = css({ w: "full", fontSize: "sm" });

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn(sidebarGroupContentStyles, className)}
      {...props}
    />
  );
}

const sidebarMenuStyles = css({
  display: "flex",
  w: "full",
  minW: "0",
  flexDirection: "column",
  gap: "0.5",
});

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn(sidebarMenuStyles, className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      // `group/menu-item` kept literal — scopes are translated via the
      // `data-slot="sidebar-menu-item"` attribute on this element.
      className={cn("group/menu-item", css({ position: "relative" }), className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva({
  base: {
    display: "flex",
    w: "full",
    alignItems: "center",
    gap: "2",
    overflow: "hidden",
    rounded: "xl",
    px: "3",
    py: "2",
    textAlign: "left",
    fontSize: "sm",
    whiteSpace: "nowrap",
    ringC: "sidebar.ring",
    outline: "none",
    transitionProperty: "width, height, padding",
    transitionDuration: "200ms",
    "[data-slot='sidebar-menu-item']:has([data-sidebar=menu-action]) &": { pr: "8" },
    "[data-slot='sidebar'][data-collapsible=icon] &": { size: "8!", p: "2!" },
    _hover: { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
    _focusVisible: { ringW: "3" },
    _active: { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
    _disabled: { pointerEvents: "none", opacity: "0.5" },
    "&:has(> svg:first-child)": { pl: "2.5" },
    "&:has(> svg:last-child)": { pr: "2.5" },
    "&[aria-disabled='true']": { pointerEvents: "none", opacity: "0.5" },
    "&:where([data-state='open'], [data-open]:not([data-open='false']))": {
      _hover: { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
    },
    "&:where([data-active='true'])": {
      bg: "sidebar.accent",
      fontWeight: "medium",
      color: "sidebar.accent.foreground",
    },
    "& svg": { size: "4", flexShrink: "0" },
    "& > span:last-child": { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
  },
  variants: {
    variant: {
      default: { _hover: { bg: "sidebar.accent", color: "sidebar.accent.foreground" } },
      outline: {
        bg: "background",
        boxShadow: "0 0 0 1px hsl(var(--sidebar-border))",
        _hover: {
          bg: "sidebar.accent",
          color: "sidebar.accent.foreground",
          boxShadow: "0 0 0 1px hsl(var(--sidebar-accent))",
        },
      },
    },
    size: {
      default: { h: "8", fontSize: "sm" },
      sm: { h: "7", fontSize: "xs" },
      lg: {
        h: "12",
        px: "3",
        fontSize: "sm",
        "[data-slot='sidebar'][data-collapsible=icon] &": { p: "0!" },
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & RecipeVariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar();
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props,
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  });

  if (!tooltip) {
    return comp;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      {comp}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

const sidebarMenuActionStyles = css({
  position: "absolute",
  top: "1.5",
  right: "1",
  display: "flex",
  aspectRatio: "square",
  w: "5",
  alignItems: "center",
  justifyContent: "center",
  rounded: "xl",
  p: "0",
  color: "sidebar.foreground",
  ringC: "sidebar.ring",
  outline: "none",
  transitionProperty: "transform",
  "[data-slot='sidebar'][data-collapsible=icon] &": { display: "none" },
  "[data-slot='sidebar-menu-button']:hover ~ &": { color: "sidebar.accent.foreground" },
  "[data-slot='sidebar-menu-button'][data-size=default] ~ &": { top: "1.5" },
  "[data-slot='sidebar-menu-button'][data-size=lg] ~ &": { top: "2.5" },
  "[data-slot='sidebar-menu-button'][data-size=sm] ~ &": { top: "1" },
  "&::after": { content: '""', position: "absolute", inset: "-2" },
  _hover: { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
  _focusVisible: { ringW: "3" },
  md: { "&::after": { display: "none" } },
  "& > svg": { size: "4", flexShrink: "0" },
});

const sidebarMenuActionShowOnHoverStyles = css({
  "[data-slot='sidebar-menu-item']:focus-within &": { opacity: "1" },
  "[data-slot='sidebar-menu-item']:hover &": { opacity: "1" },
  "[data-slot='sidebar-menu-button']:where([data-active]:not([data-active='false'])) ~ &": {
    color: "sidebar.accent.foreground",
  },
  "&[aria-expanded='true']": { opacity: "1" },
  md: { opacity: "0" },
});

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean;
  }) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          sidebarMenuActionStyles,
          showOnHover && sidebarMenuActionShowOnHoverStyles,
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  });
}

const sidebarMenuBadgeStyles = css({
  pointerEvents: "none",
  position: "absolute",
  right: "1",
  display: "flex",
  h: "5",
  minW: "5",
  alignItems: "center",
  justifyContent: "center",
  rounded: "xl",
  px: "1",
  fontSize: "xs",
  fontWeight: "medium",
  color: "sidebar.foreground",
  fontVariantNumeric: "tabular-nums",
  userSelect: "none",
  "[data-slot='sidebar'][data-collapsible=icon] &": { display: "none" },
  "[data-slot='sidebar-menu-button']:hover ~ &": { color: "sidebar.accent.foreground" },
  "[data-slot='sidebar-menu-button'][data-size=default] ~ &": { top: "1.5" },
  "[data-slot='sidebar-menu-button'][data-size=lg] ~ &": { top: "2.5" },
  "[data-slot='sidebar-menu-button'][data-size=sm] ~ &": { top: "1" },
  "[data-slot='sidebar-menu-button']:where([data-active]:not([data-active='false'])) ~ &": {
    color: "sidebar.accent.foreground",
  },
});

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(sidebarMenuBadgeStyles, className)}
      {...props}
    />
  );
}

const sidebarMenuSkeletonStyles = css({
  display: "flex",
  h: "8",
  alignItems: "center",
  gap: "2",
  rounded: "xl",
  px: "2",
});

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn(sidebarMenuSkeletonStyles, className)}
      {...props}
    >
      {showIcon && (
        <Skeleton className={css({ size: "4", rounded: "xl" })} data-sidebar="menu-skeleton-icon" />
      )}
      <Skeleton
        className={css({ h: "4", maxW: "var(--skeleton-width)", flex: "1" })}
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

const sidebarMenuSubStyles = css({
  mx: "3.5",
  display: "flex",
  minW: "0",
  transform: "translateX(1px)",
  flexDirection: "column",
  gap: "1",
  borderLeftWidth: "1px",
  borderColor: "sidebar.border",
  px: "2.5",
  py: "0.5",
  "[data-slot='sidebar'][data-collapsible=icon] &": { display: "none" },
});

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(sidebarMenuSubStyles, className)}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item", css({ position: "relative" }), className)}
      {...props}
    />
  );
}

const sidebarMenuSubButtonStyles = css({
  display: "flex",
  h: "7",
  minW: "0",
  transform: "translateX(-1px)",
  alignItems: "center",
  gap: "2",
  overflow: "hidden",
  rounded: "xl",
  px: "3",
  color: "sidebar.foreground",
  ringC: "sidebar.ring",
  outline: "none",
  "[data-slot='sidebar'][data-collapsible=icon] &": { display: "none" },
  _hover: { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
  _focusVisible: { ringW: "3" },
  _active: { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
  _disabled: { pointerEvents: "none", opacity: "0.5" },
  "&[aria-disabled='true']": { pointerEvents: "none", opacity: "0.5" },
  "&[data-size=md]": { fontSize: "sm" },
  "&[data-size=sm]": { fontSize: "xs" },
  "&:where([data-active='true'])": { bg: "sidebar.accent", color: "sidebar.accent.foreground" },
  "& > span:last-child": { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
  "& > svg": { size: "4", flexShrink: "0", color: "sidebar.accent.foreground" },
});

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md";
    isActive?: boolean;
  }) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(sidebarMenuSubButtonStyles, className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  });
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
