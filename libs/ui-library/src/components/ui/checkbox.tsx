"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { checkbox } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
import { CheckIcon } from "lucide-react";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={clsx("peer", checkbox().root, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkbox().indicator}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
