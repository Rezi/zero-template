import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";
import { css, cx } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  RecipeVariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  RecipeVariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        cx(
          "group/toggle-group",
          css({
            display: "flex",
            width: "fit-content",
            flexDirection: "row",
            alignItems: "center",
            gap: "var(--spacing(var(--gap)))",
            '&[data-spacing="0"][data-variant="outline"]': {
              borderRadius: "2xl",
            },
            _dataVertical: {
              flexDirection: "column",
              alignItems: "stretch",
            },
          }),
        ),
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & RecipeVariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        css({
          flexShrink: 0,
          _focus: {
            zIndex: 10,
          },
          _focusVisible: {
            zIndex: 10,
          },
          '&[data-state="on"]': {
            bg: "muted",
          },
          '.group\/toggle-group[data-spacing="0"] &': {
            borderRadius: "0",
            px: "2",
            boxShadow: "none",
          },
          '.group\/toggle-group[data-spacing="0"] &:has([data-icon="inline-end"])': {
            pr: "1.5",
          },
          '.group\/toggle-group[data-spacing="0"] &:has([data-icon="inline-start"])': {
            pl: "1.5",
          },
          '.group\/toggle-group[data-orientation="horizontal"][data-spacing="0"] &:first-child': {
            borderTopLeftRadius: "2xl",
            borderBottomLeftRadius: "2xl",
          },
          '.group\/toggle-group[data-orientation="vertical"][data-spacing="0"] &:first-child': {
            borderTopLeftRadius: "2xl",
            borderTopRightRadius: "2xl",
          },
          '.group\/toggle-group[data-orientation="horizontal"][data-spacing="0"] &:last-child': {
            borderTopRightRadius: "2xl",
            borderBottomRightRadius: "2xl",
          },
          '.group\/toggle-group[data-orientation="vertical"][data-spacing="0"] &:last-child': {
            borderBottomLeftRadius: "2xl",
            borderBottomRightRadius: "2xl",
          },
          '.group\/toggle-group[data-orientation="horizontal"][data-spacing="0"][data-variant="outline"] &': {
            borderLeftWidth: "0",
          },
          '.group\/toggle-group[data-orientation="vertical"][data-spacing="0"][data-variant="outline"] &': {
            borderTopWidth: "0",
          },
          '.group\/toggle-group[data-orientation="horizontal"][data-spacing="0"][data-variant="outline"] &:first-child': {
            borderLeftWidth: "1px",
          },
          '.group\/toggle-group[data-orientation="vertical"][data-spacing="0"][data-variant="outline"] &:first-child': {
            borderTopWidth: "1px",
          },
        }),
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
