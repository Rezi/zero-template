import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { badge, type BadgeVariantProps } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & BadgeVariantProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: clsx(badge({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badge as badgeVariants };
