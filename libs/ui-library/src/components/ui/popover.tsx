import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { popoverAnimationStyles } from "../../lib/animations";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";

const popoverPositionerStyles = css({ isolation: "isolate", zIndex: "50" });

const popoverContentStyles = css({
  zIndex: "50",
  display: "flex",
  w: "72",
  transformOrigin: "var(--transform-origin)",
  flexDirection: "column",
  gap: "4",
  rounded: "3xl",
  bg: "popover",
  p: "4",
  fontSize: "sm",
  color: "popover.foreground",
  // shadow-lg + ring-1 ring-foreground/5 composed into one box-shadow
  boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 5%, transparent), ${shadowLg}`,
  outline: "none",
  _dark: {
    boxShadow: `0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), ${shadowLg}`,
  },
});

const popoverHeaderStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "1",
  fontSize: "sm",
});

const popoverTitleStyles = css({ fontSize: "1rem", fontWeight: "medium" });

const popoverDescriptionStyles = css({ color: "muted.foreground" });

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={popoverPositionerStyles}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(popoverContentStyles, popoverAnimationStyles, className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="popover-header" className={cn(popoverHeaderStyles, className)} {...props} />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(popoverTitleStyles, className)}
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn(popoverDescriptionStyles, className)}
      {...props}
    />
  );
}

export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };
