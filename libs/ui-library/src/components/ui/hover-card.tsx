"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { popoverAnimationStyles } from "../../lib/animations";

const shadowLg = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";

const hoverCardPositionerStyles = css({ isolation: "isolate", zIndex: "50" });

const hoverCardContentStyles = css({
  zIndex: "50",
  w: "72",
  transformOrigin: "var(--transform-origin)",
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

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={hoverCardPositionerStyles}
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(hoverCardContentStyles, popoverAnimationStyles, className)}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
