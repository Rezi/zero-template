"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { toggle, type ToggleVariantProps } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & ToggleVariantProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={clsx("group/toggle", toggle({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggle as toggleVariants };
