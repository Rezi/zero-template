import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, css, type RecipeVariantProps } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { Separator } from "./separator";

const buttonGroupVariants = cva({
  base: {
    display: "flex",
    w: "fit",
    alignItems: "stretch",
    "& > *:focus-visible": { position: "relative", zIndex: "10" },
    "&:has(> [data-slot=button-group])": { gap: "2" },
    "&:has(> [data-variant=outline]) > [data-slot=input-group]": { borderColor: "border" },
    "&:has(> [data-variant=outline]) > [data-slot=select-trigger]": { borderColor: "border" },
    "&:has(> [data-variant=outline]) > [data-slot=input-group]:has(:focus-visible)": {
      borderColor: "ring",
    },
    "&:has(> [data-variant=outline]) > [data-slot=select-trigger]:focus-visible": {
      borderColor: "ring",
    },
    "&:has(select[aria-hidden=true]:last-child) > [data-slot=select-trigger]:last-of-type": {
      borderTopRightRadius: "2xl",
      borderBottomRightRadius: "2xl",
    },
    "& > [data-slot=select-trigger]:not([class*='w-'])": { w: "fit" },
    "& > input": { flex: "1" },
    "&:has(> [data-variant=outline]) > input": { borderColor: "border" },
    "&:has(> [data-variant=outline]) > input:focus-visible": { borderColor: "ring" },
  },
  variants: {
    orientation: {
      horizontal: {
        "& > [data-slot]": { borderTopRightRadius: "0", borderBottomRightRadius: "0" },
        "& > [data-slot]:not(:has(~ [data-slot]))": {
          borderTopRightRadius: "2xl!",
          borderBottomRightRadius: "2xl!",
        },
        "& > [data-slot] ~ [data-slot]": {
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          borderLeftWidth: "0",
        },
      },
      vertical: {
        flexDirection: "column",
        "& > [data-slot]": { borderBottomLeftRadius: "0", borderBottomRightRadius: "0" },
        "& > [data-slot]:not(:has(~ [data-slot]))": {
          borderBottomLeftRadius: "2xl!",
          borderBottomRightRadius: "2xl!",
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
      className={clsx(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

const buttonGroupTextStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
  rounded: "2xl",
  borderWidth: "1px",
  bg: "muted",
  px: "2.5",
  fontSize: "sm",
  fontWeight: "medium",
  "& svg": { pointerEvents: "none" },
  "& svg:not([class*='size-'])": { size: "4" },
});

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: clsx(buttonGroupTextStyles, className),
      },
      props,
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  });
}

const buttonGroupSeparatorStyles = css({
  position: "relative",
  alignSelf: "stretch",
  bg: "input",
  "&[data-orientation='horizontal']": { mx: "1px", w: "auto" },
  "&[data-orientation='vertical']": { my: "1px", h: "auto" },
});

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={clsx(buttonGroupSeparatorStyles, className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
