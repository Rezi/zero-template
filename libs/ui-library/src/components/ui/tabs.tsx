import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { css, cva, cx } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        cx(
          "group/tabs",
          css({
            display: "flex",
            gap: "2",
            _dataHorizontal: { flexDirection: "column" },
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva({
  base: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2xl",
    p: "3px",
    color: "muted-foreground",
    ".group\\/tabs[data-orientation='horizontal'] &": { height: "8" },
    ".group\\/tabs[data-orientation='vertical'] &": {
      height: "fit-content",
      flexDirection: "column",
      p: "1",
    },
    _dataVariantLine: { borderRadius: "0" },
  },
  variants: {
    variant: {
      default: {
        bg: "muted",
      },
      line: {
        gap: "1",
        bg: "transparent",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & RecipeVariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        css({
          position: "relative",
          display: "inline-flex",
          height: "calc(100% - 1px)",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5",
          borderRadius: "2xl",
          borderWidth: "1px",
          borderColor: "transparent !important",
          px: "1.5",
          py: "0.5",
          fontSize: "sm",
          fontWeight: "medium",
          whiteSpace: "nowrap",
          color: "foreground/60",
          transitionProperty: "all",
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",

          ".group\\/tabs[data-orientation='vertical'] &": {
            width: "full",
            justifyContent: "flex-start",
            px: "3",
            py: "0.5",
          },

          _hover: { color: "foreground" },

          _focusVisible: {
            borderColor: "ring",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent)",
            outlineWidth: "1px",
            outlineColor: "ring",
          },

          _disabled: {
            pointerEvents: "none",
            opacity: 0.5,
          },

          _ariaDisabled: {
            pointerEvents: "none",
            opacity: 0.5,
          },

          _dark: {
            color: "muted-foreground",
            _hover: { color: "foreground" },
            _dataActive: {
              borderColor: "input",
              bg: "input/30",
              color: "foreground",
            },
            '.group\\/tabs-list[data-variant="line"] &[data-active]': {
              borderColor: "transparent",
              bg: "transparent",
            },
          },

          "& svg": {
            pointerEvents: "none",
            flexShrink: 0,
          },
          "& svg:not([class*='size-'])": {
            width: "4",
            height: "4",
          },

          '.group\\/tabs-list[data-variant="line"] &': {
            bg: "transparent",
          },
          '.group\\/tabs-list[data-variant="line"] &[data-active]': {
            bg: "transparent",
          },

          _dataActive: {
            bg: "background",
            color: "foreground",
          },

          _after: {
            content: '""',
            position: "absolute",
            bg: "foreground",
            opacity: 0,
            transitionProperty: "opacity",
            transitionDuration: "150ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          },

          ".group\\/tabs[data-orientation='horizontal'] &::after": {
            insetInline: "0",
            bottom: "-5px",
            height: "0.5",
          },

          ".group\\/tabs[data-orientation='vertical'] &::after": {
            insetBlock: "0",
            right: "-1",
            width: "0.5",
          },

          '.group\\/tabs-list[data-variant="line"] &[data-active]::after': {
            opacity: 1,
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        css({
          flex: "1",
          fontSize: "sm",
          outline: "none",
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
