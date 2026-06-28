import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { buttonGroup, type ButtonGroupVariantProps } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
import { Separator } from "./separator";

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & ButtonGroupVariantProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={clsx(buttonGroup({ orientation }).root, className)}
      {...props}
    />
  );
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: clsx(buttonGroup().text, className),
      },
      props,
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  });
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={clsx(buttonGroup().separator, className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroup as buttonGroupVariants };
