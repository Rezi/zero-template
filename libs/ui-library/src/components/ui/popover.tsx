import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

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

// Enter/exit animations kept as literal Tailwind (tw-animate-css) — ported later as a dedicated pass.
const popoverContentAnimations =
  "duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

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
          className={cn(popoverContentStyles, popoverContentAnimations, className)}
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
