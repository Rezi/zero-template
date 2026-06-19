"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cva, cx } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

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
        className={cn(
          cx("group/sidebar-wrapper", css({
            display: "flex",
            minHeight: "100svh",
            width: "full",
            '&:has([data-variant="inset"])': {
              bg: "sidebar",
            },
          })),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

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
      <div
        data-slot="sidebar"
        className={cn(
          css({
            display: "flex",
            height: "full",
            width: "var(--sidebar-width)",
            flexDirection: "column",
            bg: "sidebar",
            color: "sidebar-foreground",
          }),
          className,
        )}
        {...props}
      >
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
          className={css({
            width: "var(--sidebar-width)",
            bg: "sidebar",
            p: "0",
            color: "sidebar-foreground",
            "& > button": {
              display: "none",
            },
          })}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className={css({
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
          })}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className={css({
            display: "flex",
            height: "full",
            width: "full",
            flexDirection: "column",
          })}>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cx("group", "peer", css({
        display: "none",
        color: "sidebar-foreground",
        "@media (min-width: 768px)": {
          display: "block",
        },
      }))}
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
          css({
            position: "relative",
            width: "var(--sidebar-width)",
            bg: "transparent",
            transitionProperty: "width",
            transitionDuration: "200ms",
            transitionTimingFunction: "linear",
            '.group[data-collapsible="offcanvas"] &': {
              width: "0",
            },
            '.group[data-side="right"] &': {
              rotate: "180deg",
            },
            ...(variant === "floating" || variant === "inset"
              ? {
                  '.group[data-collapsible="icon"] &': {
                    width: "calc(var(--sidebar-width-icon) + var(--spacing-4))",
                  },
                }
              : {
                  '.group[data-collapsible="icon"] &': {
                    width: "var(--sidebar-width-icon)",
                  },
                }),
          }),
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          css({
            position: "fixed",
            insetY: "0",
            zIndex: 10,
            display: "none",
            height: "100svh",
            width: "var(--sidebar-width)",
            transitionProperty: "left, right, width",
            transitionDuration: "200ms",
            transitionTimingFunction: "linear",
            '&[data-side="left"]': {
              left: "0",
            },
            '&[data-side="left"]': {
              left: "0",
            },
            '.group[data-collapsible="offcanvas"] &[data-side="left"]': {
              left: "calc(var(--sidebar-width) * -1)",
            },
            '&[data-side="right"]': {
              right: "0",
            },
            '.group[data-collapsible="offcanvas"] &[data-side="right"]': {
              right: "calc(var(--sidebar-width) * -1)",
            },
            "@media (min-width: 768px)": {
              display: "flex",
            },
            ...(variant === "floating" || variant === "inset"
              ? {
                  p: "2",
                  '.group[data-collapsible="icon"] &': {
                    width: "calc(var(--sidebar-width-icon) + var(--spacing-4) + 2px)",
                  },
                }
              : {
                  '.group[data-collapsible="icon"] &': {
                    width: "var(--sidebar-width-icon)",
                  },
                  '.group[data-side="left"] &': {
                    borderRightWidth: "1px",
                  },
                  '.group[data-side="right"] &': {
                    borderLeftWidth: "1px",
                  },
                }),
          }),
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={css({
            display: "flex",
            width: "full",
            height: "full",
            flexDirection: "column",
            bg: "sidebar",
            '.group[data-variant="floating"] &': {
              borderRadius: "2xl",
              boxShadow: "sm",
              outlineWidth: "1px",
              outlineColor: "sidebar-border",
            },
          })}
        >
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
      <span className={css({
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      })}>Toggle Sidebar</span>
    </Button>
  );
}

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
      className={cn(
        css({
          position: "absolute",
          insetY: "0",
          zIndex: 20,
          display: "none",
          width: "4",
          transitionProperty: "all",
          transitionDuration: "150ms",
          transitionTimingFunction: "linear",
          '.group[data-side="left"] &': {
            right: "-4",
          },
          '.group[data-side="right"] &': {
            left: "0",
          },
          _after: {
            content: '""',
            position: "absolute",
            insetY: "0",
            left: "50%",
            width: "2px",
          },
          _hover: {
            _after: {
              bg: "sidebar-border",
            },
          },
          "@media (min-width: 640px)": {
            display: "flex",
          },
          // ltr/rtl translate
          "[dir='ltr'] &": {
            transform: "translateX(-50%)",
          },
          "[dir='rtl'] &": {
            transform: "translateX(-50%)",
          },
          // in-data-[side=left/right] cursor
          '&[data-side="left"]': {
            cursor: "w-resize",
          },
          '&[data-side="right"]': {
            cursor: "e-resize",
          },
          // collapsed cursor overrides
          '[data-side="left"][data-state="collapsed"] &': {
            cursor: "e-resize",
          },
          '[data-side="right"][data-state="collapsed"] &': {
            cursor: "w-resize",
          },
          // offcanvas group overrides
          '.group[data-collapsible="offcanvas"] &': {
            transform: "translateX(0)",
          },
          '.group[data-collapsible="offcanvas"] &::after': {
            left: "100%",
          },
          '.group[data-collapsible="offcanvas"] &:hover': {
            bg: "sidebar",
          },
          '[data-side="left"][data-collapsible="offcanvas"] &': {
            right: "-2",
          },
          '[data-side="right"][data-collapsible="offcanvas"] &': {
            left: "-2",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        css({
          position: "relative",
          display: "flex",
          width: "full",
          flex: "1",
          flexDirection: "column",
          bg: "background",
          "@media (min-width: 768px)": {
            '.peer[data-variant="inset"] ~ &': {
              m: "2",
              ml: "0",
              borderRadius: "2xl",
              boxShadow: "sm",
            },
            '.peer[data-variant="inset"][data-state="collapsed"] ~ &': {
              ml: "2",
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(
        css({
          height: "8",
          width: "full",
          bg: "input/50",
          boxShadow: "none",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn(
        css({
          display: "flex",
          flexDirection: "column",
          gap: "2",
          p: "2",
          "--radius": "var(--radius-xl)",
        } as any),
        className,
      )}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn(
        css({
          display: "flex",
          flexDirection: "column",
          gap: "2",
          p: "2",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn(
        css({
          mx: "2",
          width: "auto",
          bg: "sidebar-border",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        css({
          display: "flex",
          minHeight: "0",
          flex: "1",
          flexDirection: "column",
          gap: "2",
          overflowY: "auto",
          "--radius": "var(--radius-xl)",
          '.group[data-collapsible="icon"] &': {
            overflow: "hidden",
          },
        } as any),
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(
        css({
          position: "relative",
          display: "flex",
          width: "full",
          minWidth: "0",
          flexDirection: "column",
          p: "2",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          css({
            display: "flex",
            height: "8",
            flexShrink: 0,
            alignItems: "center",
            borderRadius: "xl",
            px: "3",
            fontSize: "xs",
            fontWeight: "medium",
            color: "sidebar-foreground/70",
            outline: "none",
            transitionProperty: "margin, opacity",
            transitionDuration: "200ms",
            transitionTimingFunction: "linear",
            '.group[data-collapsible="icon"] &': {
              mt: "-8",
              opacity: 0,
            },
            _focusVisible: {
              boxShadow: "0 0 0 3px color-mix(in oklch, var(--sidebar-ring) 30%, transparent)",
            },
            "& > svg": {
              width: "4",
              height: "4",
              flexShrink: 0,
            },
          }),
          className,
        ),
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

function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          css({
            position: "absolute",
            top: "3.5",
            right: "3",
            display: "flex",
            aspectRatio: "1 / 1",
            width: "5",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "xl",
            p: "0",
            color: "sidebar-foreground",
            outline: "none",
            transitionProperty: "transform",
            transitionDuration: "150ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            '.group[data-collapsible="icon"] &': {
              display: "none",
            },
            _after: {
              content: '""',
              position: "absolute",
              inset: "-2",
            },
            _hover: {
              bg: "sidebar-accent",
              color: "sidebar-accent-foreground",
            },
            _focusVisible: {
              boxShadow: "0 0 0 3px color-mix(in oklch, var(--sidebar-ring) 30%, transparent)",
            },
            "@media (min-width: 768px)": {
              _after: {
                display: "none",
              },
            },
            "& > svg": {
              width: "4",
              height: "4",
              flexShrink: 0,
            },
          }),
          className,
        ),
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

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn(
        css({
          width: "full",
          fontSize: "sm",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn(
        css({
          display: "flex",
          width: "full",
          minWidth: "0",
          flexDirection: "column",
          gap: "0.5",
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn(
        cx("group/menu-item", css({
          position: "relative",
        })),
        className,
      )}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva({
  base: {
    display: "flex",
    width: "full",
    alignItems: "center",
    gap: "2",
    overflow: "hidden",
    borderRadius: "xl",
    px: "3",
    py: "2",
    textAlign: "left",
    fontSize: "sm",
    whiteSpace: "nowrap",
    outline: "none",
    transitionProperty: "width, height, padding",
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    // group-has-data-[sidebar=menu-action]/menu-item:pr-8
    '.group\/menu-item:has([data-sidebar="menu-action"]) &': {
      pr: "8",
    },
    // group-data-[collapsible=icon]:size-8!
    '.group[data-collapsible="icon"] &': {
      width: "8 !important",
      height: "8 !important",
      p: "2 !important",
    },
    _hover: {
      bg: "sidebar-accent",
      color: "sidebar-accent-foreground",
    },
    _focusVisible: {
      boxShadow: "0 0 0 3px color-mix(in oklch, var(--sidebar-ring) 30%, transparent)",
    },
    _active: {
      bg: "sidebar-accent",
      color: "sidebar-accent-foreground",
    },
    _disabled: {
      pointerEvents: "none",
      opacity: 0.5,
    },
    // has-[>svg:first-child]:pl-2.5
    "&:has(> svg:first-child)": {
      pl: "2.5",
    },
    // has-[>svg:last-child]:pr-2.5
    "&:has(> svg:last-child)": {
      pr: "2.5",
    },
    _ariaDisabled: {
      pointerEvents: "none",
      opacity: 0.5,
    },
    // data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground
    '&[data-open]:hover': {
      bg: "sidebar-accent",
      color: "sidebar-accent-foreground",
    },
    // data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground
    '&[data-active]': {
      bg: "sidebar-accent",
      fontWeight: "medium",
      color: "sidebar-accent-foreground",
    },
    "& svg": {
      width: "4",
      height: "4",
      flexShrink: 0,
    },
    "& > span:last-child": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  variants: {
    variant: {
      default: {
        _hover: {
          bg: "sidebar-accent",
          color: "sidebar-accent-foreground",
        },
      },
      outline: {
        bg: "background",
        boxShadow: "0 0 0 1px hsl(var(--sidebar-border))",
        _hover: {
          bg: "sidebar-accent",
          color: "sidebar-accent-foreground",
          boxShadow: "0 0 0 1px hsl(var(--sidebar-accent))",
        },
      },
    },
    size: {
      default: {
        height: "8",
        fontSize: "sm",
      },
      sm: {
        height: "7",
        fontSize: "xs",
      },
      lg: {
        height: "12",
        px: "3",
        fontSize: "sm",
        '.group[data-collapsible="icon"] &': {
          p: "0 !important",
        },
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
        className: cn(cx("peer/menu-button", "group/menu-button", sidebarMenuButtonVariants({ variant, size })), className),
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
          css({
            position: "absolute",
            top: "1.5",
            right: "1",
            display: "flex",
            aspectRatio: "1 / 1",
            width: "5",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "xl",
            p: "0",
            color: "sidebar-foreground",
            outline: "none",
            transitionProperty: "transform",
            transitionDuration: "150ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            '.group[data-collapsible="icon"] &': {
              display: "none",
            },
            // peer-hover/menu-button:text-sidebar-accent-foreground
            '.peer\/menu-button:hover ~ &': {
              color: "sidebar-accent-foreground",
            },
            // peer-data-[size=default]/menu-button:top-1.5
            '.peer\/menu-button[data-size="default"] ~ &': {
              top: "1.5",
            },
            // peer-data-[size=lg]/menu-button:top-2.5
            '.peer\/menu-button[data-size="lg"] ~ &': {
              top: "2.5",
            },
            // peer-data-[size=sm]/menu-button:top-1
            '.peer\/menu-button[data-size="sm"] ~ &': {
              top: "1",
            },
            _after: {
              content: '""',
              position: "absolute",
              inset: "-2",
            },
            _hover: {
              bg: "sidebar-accent",
              color: "sidebar-accent-foreground",
            },
            _focusVisible: {
              boxShadow: "0 0 0 3px color-mix(in oklch, var(--sidebar-ring) 30%, transparent)",
            },
            "@media (min-width: 768px)": {
              _after: {
                display: "none",
              },
            },
            "& > svg": {
              width: "4",
              height: "4",
              flexShrink: 0,
            },
            ...(showOnHover
              ? {
                  // group-focus-within/menu-item:opacity-100
                  '.group\/menu-item:focus-within &': {
                    opacity: 1,
                  },
                  // group-hover/menu-item:opacity-100
                  '.group\/menu-item:hover &': {
                    opacity: 1,
                  },
                  // peer-data-active/menu-button:text-sidebar-accent-foreground
                  '.peer\/menu-button[data-active] ~ &': {
                    color: "sidebar-accent-foreground",
                  },
                  // aria-expanded:opacity-100
                  '&[aria-expanded="true"]': {
                    opacity: 1,
                  },
                  "@media (min-width: 768px)": {
                    opacity: 0,
                  },
                }
              : {}),
          }),
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

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        css({
          pointerEvents: "none",
          position: "absolute",
          right: "1",
          display: "flex",
          height: "5",
          minWidth: "5",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "xl",
          px: "1",
          fontSize: "xs",
          fontWeight: "medium",
          color: "sidebar-foreground",
          fontVariantNumeric: "tabular-nums",
          userSelect: "none",
          '.group[data-collapsible="icon"] &': {
            display: "none",
          },
          // peer-hover/menu-button:text-sidebar-accent-foreground
          '.peer\/menu-button:hover ~ &': {
            color: "sidebar-accent-foreground",
          },
          // peer-data-[size=default]/menu-button:top-1.5
          '.peer\/menu-button[data-size="default"] ~ &': {
            top: "1.5",
          },
          // peer-data-[size=lg]/menu-button:top-2.5
          '.peer\/menu-button[data-size="lg"] ~ &': {
            top: "2.5",
          },
          // peer-data-[size=sm]/menu-button:top-1
          '.peer\/menu-button[data-size="sm"] ~ &': {
            top: "1",
          },
          // peer-data-active/menu-button:text-sidebar-accent-foreground
          '.peer\/menu-button[data-active] ~ &': {
            color: "sidebar-accent-foreground",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

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
      className={cn(
        css({
          display: "flex",
          height: "8",
          alignItems: "center",
          gap: "2",
          borderRadius: "xl",
          px: "2",
        }),
        className,
      )}
      {...props}
    >
      {showIcon && <Skeleton className={css({ width: "4", height: "4", borderRadius: "xl" })} data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className={css({
          height: "4",
          maxWidth: "var(--skeleton-width)",
          flex: "1",
        })}
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

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        css({
          mx: "3.5",
          display: "flex",
          minWidth: "0",
          transform: "translateX(1px)",
          flexDirection: "column",
          gap: "1",
          borderLeftWidth: "1px",
          borderColor: "sidebar-border",
          px: "2.5",
          py: "0.5",
          '.group[data-collapsible="icon"] &': {
            display: "none",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn(
        cx("group/menu-sub-item", css({
          position: "relative",
        })),
        className,
      )}
      {...props}
    />
  );
}

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
        className: cn(
          css({
            display: "flex",
            height: "7",
            minWidth: "0",
            transform: "translateX(-1px)",
            alignItems: "center",
            gap: "2",
            overflow: "hidden",
            borderRadius: "xl",
            px: "3",
            color: "sidebar-foreground",
            outline: "none",
            '.group[data-collapsible="icon"] &': {
              display: "none",
            },
            _hover: {
              bg: "sidebar-accent",
              color: "sidebar-accent-foreground",
            },
            _focusVisible: {
              boxShadow: "0 0 0 3px color-mix(in oklch, var(--sidebar-ring) 30%, transparent)",
            },
            _active: {
              bg: "sidebar-accent",
              color: "sidebar-accent-foreground",
            },
            _disabled: {
              pointerEvents: "none",
              opacity: 0.5,
            },
            _ariaDisabled: {
              pointerEvents: "none",
              opacity: 0.5,
            },
            '&[data-size="md"]': {
              fontSize: "sm",
            },
            '&[data-size="sm"]': {
              fontSize: "xs",
            },
            '&[data-active]': {
              bg: "sidebar-accent",
              color: "sidebar-accent-foreground",
            },
            "& > span:last-child": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
            "& > svg": {
              width: "4",
              height: "4",
              flexShrink: 0,
              color: "sidebar-accent-foreground",
            },
          }),
          className,
        ),
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
