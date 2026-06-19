import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cva } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Separator } from "./separator";

const buttonGroupVariants = cva({
  base: {
    display: "flex",
    width: "fit-content",
    alignItems: "stretch",
    "& > *": {
      _focusVisible: {
        position: "relative",
        zIndex: 10,
      },
    },
    "&:has(> [data-slot=button-group])": {
      gap: "2",
    },
    "&:has(> [data-variant=outline]) > [data-slot=input-group]": {
      borderColor: "border",
    },
    "&:has(> [data-variant=outline]) > [data-slot=select-trigger]": {
      borderColor: "border",
    },
    "&:has(> [data-variant=outline]) > [data-slot=input-group]:has(:focus-visible)": {
      borderColor: "ring",
    },
    "&:has(> [data-variant=outline]) > [data-slot=select-trigger]:focus-visible": {
      borderColor: "ring",
    },
    "&:has(select[aria-hidden=true]:last-child) > [data-slot=select-trigger]:last-of-type": {
      borderBottomRightRadius: "2xl",
      borderTopRightRadius: "2xl",
    },
    "& > [data-slot=select-trigger]:not([class*='w-'])": {
      width: "fit-content",
    },
    "& > input": {
      flex: "1",
    },
    "&:has(> [data-variant=outline]) > input": {
      borderColor: "border",
    },
    "&:has(> [data-variant=outline]) > input:focus-visible": {
      borderColor: "ring",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        "& > [data-slot]": {
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
        },
        "& > [data-slot]:not(:has(~ [data-slot]))": {
          borderTopRightRadius: "2xl !important",
          borderBottomRightRadius: "2xl !important",
        },
        "& > [data-slot] ~ [data-slot]": {
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          borderLeftWidth: "0",
        },
      },
      vertical: {
        flexDirection: "column",
        "& > [data-slot]": {
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        },
        "& > [data-slot]:not(:has(~ [data-slot]))": {
          borderBottomLeftRadius: "2xl !important",
          borderBottomRightRadius: "2xl !important",
        },
        "& > [data-slot] ~ [data-slot]": {
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
          borderTopWidth: "0",
        },
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & RecipeVariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          css({
            display: "flex",
            alignItems: "center",
            gap: "2",
            borderRadius: "2xl",
            borderWidth: "1px",
            bg: "muted",
            px: "2.5",
            fontSize: "sm",
            fontWeight: "medium",
            "& svg": {
              pointerEvents: "none",
            },
            "& svg:not([class*='size-'])": {
              width: "4",
              height: "4",
            },
          }),
          className,
        ),
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
      className={cn(
        css({
          position: "relative",
          alignSelf: "stretch",
          bg: "input",
          _dataHorizontal: {
            mx: "px",
            width: "auto",
          },
          _dataVertical: {
            my: "px",
            height: "auto",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
