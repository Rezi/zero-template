import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { css, cva, cx } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { ChevronDownIcon } from "lucide-react";

function NavigationMenu({
  align = "start",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props & Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        cx(
          "group/navigation-menu",
          css({
            position: "relative",
            display: "flex",
            maxWidth: "max-content",
            flex: "1",
            alignItems: "center",
            justifyContent: "center",
          }),
        ),
        className,
      )}
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
      className={cn(
        cx(
          "group",
          css({
            display: "flex",
            flex: "1",
            listStyle: "none",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
          }),
        ),
        className,
      )}
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
      className={cn(
        css({
          position: "relative",
        }),
        className,
      )}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva({
  base: {
    display: "inline-flex",
    height: "9",
    width: "max-content",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2xl",
    px: "2.5",
    py: "1.5",
    fontSize: "sm",
    fontWeight: "medium",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    _hover: {
      bg: "muted",
    },
    _focus: {
      bg: "muted",
    },
    _focusVisible: {
      boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)",
      outlineWidth: "1px",
      outlineColor: "ring",
    },
    _disabled: {
      pointerEvents: "none",
      opacity: 0.5,
    },
    "&[data-popup-open]": {
      bg: "muted/50",
      _hover: {
        bg: "muted",
      },
    },
    _dataOpen: {
      bg: "muted/50",
      _hover: {
        bg: "muted",
      },
      _focus: {
        bg: "muted",
      },
    },
  },
});

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        cx(
          "group/navigation-menu-trigger",
          "group",
          navigationMenuTriggerStyle(),
        ),
        className,
      )}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className={css({
          position: "relative",
          top: "px",
          ml: "1",
          width: "3",
          height: "3",
          transitionProperty: "transform",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          ".group\\/navigation-menu-trigger[data-popup-open] &": {
            transform: "rotate(180deg)",
          },
          ".group\\/navigation-menu-trigger[data-open] &": {
            transform: "rotate(180deg)",
          },
        })}
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        css({
          height: "full",
          width: "auto",
          p: "1.5",
          transitionProperty: "opacity, transform, translate",
          transitionDuration: "0.35s",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          "&[data-ending-style][data-activation-direction='left']": {
            transform: "translateX(50%)",
          },
          "&[data-ending-style][data-activation-direction='right']": {
            transform: "translateX(-50%)",
          },
          "&[data-starting-style][data-activation-direction='left']": {
            transform: "translateX(-50%)",
          },
          "&[data-starting-style][data-activation-direction='right']": {
            transform: "translateX(50%)",
          },
          ".group\\/navigation-menu[data-viewport='false'] &": {
            borderRadius: "2xl",
            bg: "popover",
            color: "popover-foreground",
            // shadow-lg + ring-1 ring-foreground/5
            boxShadow: "lg, 0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)",
            transitionDuration: "300ms",
          },
          ".group\\/navigation-menu[data-viewport='false'] &[data-ending-style]": {
            animationName: "exit",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--exit-opacity": "0",
            "--exit-scale": ".95",
          },
          ".group\\/navigation-menu[data-viewport='false'] &[data-open]": {
            animationName: "enter",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--enter-opacity": "0",
            "--enter-scale": ".95",
          },
          ".group\\/navigation-menu[data-viewport='false'] &[data-closed]": {
            animationName: "exit",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--exit-opacity": "0",
            "--exit-scale": ".95",
          },
          _dataEndingStyle: {
            opacity: 0,
          },
          _dataStartingStyle: {
            opacity: 0,
          },
          "&[data-motion='from-end']": {
            "--enter-translate-x": "-13rem",
          },
          "&[data-motion='from-start']": {
            "--enter-translate-x": "13rem",
          },
          "&[data-motion='to-end']": {
            "--exit-translate-x": "13rem",
          },
          "&[data-motion='to-start']": {
            "--exit-translate-x": "-13rem",
          },
          "&[data-motion^='from-']": {
            animationName: "enter",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--enter-opacity": "0",
          },
          "&[data-motion^='to-']": {
            animationName: "exit",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--exit-opacity": "0",
          },
          "& * [data-slot='navigation-menu-link']:focus": {
            boxShadow: "none",
            outline: "none",
          },
          _dark: {
            ".group\\/navigation-menu[data-viewport='false'] &": {
              boxShadow: "lg, 0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)",
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

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
        className={cn(
          css({
            isolation: "isolate",
            zIndex: 50,
            height: "var(--positioner-height)",
            width: "var(--positioner-width)",
            maxWidth: "var(--available-width)",
            transitionProperty: "top, left, right, bottom",
            transitionDuration: "0.35s",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            "&[data-instant]": {
              transitionProperty: "none",
            },
            "&[data-side='bottom']::before": {
              top: "-10px",
              right: "0",
              left: "0",
            },
          }),
          className,
        )}
        {...props}
      >
        <NavigationMenuPrimitive.Popup
          className={css({
            position: "relative",
            height: "var(--popup-height)",
            width: "var(--popup-width)",
            transformOrigin: "var(--transform-origin)",
            borderRadius: "3xl",
            bg: "popover",
            color: "popover-foreground",
            // shadow-lg + ring-1 ring-foreground/5
            boxShadow: "lg, 0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)",
            outline: "none",
            transitionProperty: "opacity, transform, width, height, scale, translate",
            transitionDuration: "0.35s",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            _dataEndingStyle: {
              scale: "0.9",
              opacity: 0,
              transitionDuration: "150ms",
              transitionTimingFunction: "ease",
            },
            _dataStartingStyle: {
              scale: "0.9",
              opacity: 0,
            },
            _dark: {
              boxShadow: "lg, 0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)",
            },
          })}
        >
          <NavigationMenuPrimitive.Viewport
            className={css({
              position: "relative",
              width: "full",
              height: "full",
              overflow: "hidden",
            })}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        css({
          display: "flex",
          alignItems: "center",
          gap: "2",
          borderRadius: "2xl",
          px: "2.5",
          py: "1.5",
          fontSize: "sm",
          fontWeight: "medium",
          transitionProperty: "all",
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          _hover: {
            bg: "muted",
          },
          _focus: {
            bg: "muted",
          },
          _focusVisible: {
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)",
            outlineWidth: "1px",
            outlineColor: "ring",
          },
          "[data-slot='navigation-menu-content'] &": {
            width: "full",
            borderRadius: "xl",
            p: "2",
            fontWeight: "normal",
          },
          "&[data-active='true']": {
            bg: "muted/50",
            _hover: {
              bg: "muted",
            },
            _focus: {
              bg: "muted",
            },
          },
          "& svg:not([class*='size-'])": {
            width: "4",
            height: "4",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      className={cn(
        css({
          top: "full",
          zIndex: 1,
          display: "flex",
          height: "1.5",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          "&[data-state='hidden']": {
            animationName: "exit",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--exit-opacity": "0",
          },
          "&[data-state='visible']": {
            animationName: "enter",
            animationDuration: "150ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationFillMode: "both",
            "--enter-opacity": "0",
          },
        }),
        className,
      )}
      {...props}
    >
      <div
        className={css({
          position: "relative",
          top: "60%",
          height: "2",
          width: "2",
          transform: "rotate(45deg)",
          borderTopLeftRadius: "sm",
          bg: "border",
          boxShadow: "md",
        })}
      />
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
