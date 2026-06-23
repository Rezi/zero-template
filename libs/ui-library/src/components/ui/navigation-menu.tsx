import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva, css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { ChevronDownIcon } from "lucide-react";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
const ringShadow = (pct: string) =>
  `0 0 0 1px color-mix(in oklab, var(--foreground) ${pct}, transparent), ${shadowLg}`;

const navigationMenuStyles = css({
  position: "relative",
  display: "flex",
  maxW: "max-content",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
});

const navigationMenuListStyles = css({
  display: "flex",
  flex: "1",
  listStyleType: "none",
  alignItems: "center",
  justifyContent: "center",
  gap: "0",
});

function NavigationMenu({
  align = "start",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props & Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      // `group/navigation-menu` marker kept literal — the viewport-false content
      // animation cluster (literal Tailwind) targets it.
      className={cn("group/navigation-menu", navigationMenuStyles, className)}
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group", navigationMenuListStyles, className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn(css({ position: "relative" }), className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva({
  base: {
    display: "inline-flex",
    h: "9",
    w: "max-content",
    alignItems: "center",
    justifyContent: "center",
    rounded: "2xl",
    px: "2.5",
    py: "1.5",
    fontSize: "sm",
    fontWeight: "medium",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    outline: "none",
    _hover: { bg: "muted" },
    _focus: { bg: "muted" },
    _focusVisible: { ringW: "3", ringC: "ring/30", outlineWidth: "1px" },
    _disabled: { pointerEvents: "none", opacity: "0.5" },
    "&[data-popup-open]": { bg: "muted/50", _hover: { bg: "muted" } },
    "&:where([data-state='open'], [data-open]:not([data-open='false']))": {
      bg: "muted/50",
      _hover: { bg: "muted" },
      _focus: { bg: "muted" },
    },
  },
});

const navigationMenuTriggerIconStyles = css({
  position: "relative",
  top: "1px",
  ml: "1",
  size: "3",
});

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        // chevron rotate-on-open kept literal (transition + group-scoped rotate).
        className={cn(
          navigationMenuTriggerIconStyles,
          "transition duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180",
        )}
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

const navigationMenuContentStyles = css({
  h: "full",
  w: "auto",
  p: "1.5",
  transitionProperty: "opacity, transform, translate",
  transitionDuration: "0.35s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  "&[data-ending-style][data-activation-direction=left]": { translate: "50%" },
  "&[data-ending-style][data-activation-direction=right]": { translate: "-50%" },
  "&[data-starting-style][data-activation-direction=left]": { translate: "-50%" },
  "&[data-starting-style][data-activation-direction=right]": { translate: "50%" },
  "&[data-ending-style]": { opacity: "0" },
  "&[data-starting-style]": { opacity: "0" },
  "& [data-slot=navigation-menu-link]:focus": { ringW: "0", outline: "none" },
});

// Motion/enter-exit animations + the viewport-false group cluster kept literal.
const navigationMenuContentLiteral =
  "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow-lg group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/5 group-data-[viewport=false]/navigation-menu:duration-300 group-data-[viewport=false]/navigation-menu:dark:ring-foreground/10 group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95";

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(navigationMenuContentStyles, navigationMenuContentLiteral, className)}
      {...props}
    />
  );
}

const navigationMenuPositionerStyles = css({
  isolation: "isolate",
  zIndex: "50",
  h: "var(--positioner-height)",
  w: "var(--positioner-width)",
  maxW: "var(--available-width)",
  transitionProperty: "top, left, right, bottom",
  transitionDuration: "0.35s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  "&[data-instant]": { transition: "none" },
  "&[data-side=bottom]::before": { content: '""', top: "-10px", right: "0", left: "0" },
});

const navigationMenuPopupStyles = css({
  position: "relative",
  h: "var(--popup-height)",
  w: "var(--popup-width)",
  transformOrigin: "var(--transform-origin)",
  rounded: "3xl",
  bg: "popover",
  color: "popover.foreground",
  boxShadow: ringShadow("5%"),
  transitionProperty: "opacity, transform, width, height, scale, translate",
  transitionDuration: "0.35s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  outline: "none",
  "&[data-ending-style]": {
    scale: "0.9",
    opacity: "0",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  "&[data-starting-style]": { scale: "0.9", opacity: "0" },
  _dark: { boxShadow: ringShadow("10%") },
});

const navigationMenuViewportStyles = css({ position: "relative", size: "full", overflow: "hidden" });

function NavigationMenuPositioner({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(navigationMenuPositionerStyles, className)}
        {...props}
      >
        <NavigationMenuPrimitive.Popup className={navigationMenuPopupStyles}>
          <NavigationMenuPrimitive.Viewport className={navigationMenuViewportStyles} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

const navigationMenuLinkStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
  rounded: "2xl",
  px: "2.5",
  py: "1.5",
  fontSize: "sm",
  fontWeight: "medium",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  outline: "none",
  _hover: { bg: "muted" },
  _focus: { bg: "muted" },
  _focusVisible: { ringW: "3", ringC: "ring/30", outlineWidth: "1px" },
  "[data-slot=navigation-menu-content] &": {
    w: "full",
    rounded: "xl",
    p: "2",
    fontWeight: "normal",
  },
  "&[data-active=true]": {
    bg: "muted/50",
    _hover: { bg: "muted" },
    _focus: { bg: "muted" },
  },
  "& svg:not([class*='size-'])": { size: "4" },
});

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(navigationMenuLinkStyles, className)}
      {...props}
    />
  );
}

const navigationMenuIndicatorStyles = css({
  top: "full",
  zIndex: "1",
  display: "flex",
  h: "1.5",
  alignItems: "flex-end",
  justifyContent: "center",
  overflow: "hidden",
});

const navigationMenuIndicatorArrowStyles = css({
  position: "relative",
  top: "60%",
  h: "2",
  w: "2",
  rotate: "45deg",
  borderTopLeftRadius: "sm",
  bg: "border",
  boxShadow: "md",
});

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      className={cn(
        navigationMenuIndicatorStyles,
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    >
      <div className={navigationMenuIndicatorArrowStyles} />
    </NavigationMenuPrimitive.Icon>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
};
