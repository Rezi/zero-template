import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { css, type RecipeVariantProps } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { toggleVariants } from "./toggle";

const toggleGroupStyles = css({
  display: "flex",
  w: "fit",
  flexDirection: "row",
  alignItems: "center",
  gap: "calc(var(--spacing, 0.25rem) * var(--gap))",
  "&[data-spacing='0'][data-variant='outline']": { rounded: "2xl" },
  "&[data-orientation='vertical']": { flexDirection: "column", alignItems: "stretch" },
});

const toggleGroupItemStyles = css({
  flexShrink: "0",
  _focus: { zIndex: "10" },
  _focusVisible: { zIndex: "10" },
  "&[data-state='on']": { bg: "muted" },
  "[data-slot='toggle-group'][data-spacing='0'] &": {
    rounded: "none",
    px: "2",
    boxShadow: "none",
    "&:has([data-icon=inline-end])": { pr: "1.5" },
    "&:has([data-icon=inline-start])": { pl: "1.5" },
  },
  "[data-slot='toggle-group'][data-orientation='horizontal'] &": {
    "&[data-spacing='0']:first-child": {
      borderTopLeftRadius: "2xl",
      borderBottomLeftRadius: "2xl",
    },
    "&[data-spacing='0']:last-child": {
      borderTopRightRadius: "2xl",
      borderBottomRightRadius: "2xl",
    },
    "&[data-spacing='0'][data-variant='outline']": { borderLeftWidth: "0" },
    "&[data-spacing='0'][data-variant='outline']:first-child": { borderLeftWidth: "1px" },
  },
  "[data-slot='toggle-group'][data-orientation='vertical'] &": {
    "&[data-spacing='0']:first-child": {
      borderTopLeftRadius: "2xl",
      borderTopRightRadius: "2xl",
    },
    "&[data-spacing='0']:last-child": {
      borderBottomLeftRadius: "2xl",
      borderBottomRightRadius: "2xl",
    },
    "&[data-spacing='0'][data-variant='outline']": { borderTopWidth: "0" },
    "&[data-spacing='0'][data-variant='outline']:first-child": { borderTopWidth: "1px" },
  },
});

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
      className={clsx(toggleGroupStyles, className)}
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
      className={clsx(
        toggleGroupItemStyles,
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
