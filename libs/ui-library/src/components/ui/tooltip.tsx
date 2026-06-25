import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { tooltipAnimationStyles } from "../../lib/animations";

const tooltipPositionerStyles = css({ isolation: "isolate", zIndex: "50" });

const tooltipContentStyles = css({
  zIndex: "50",
  display: "inline-flex",
  w: "fit",
  maxW: "xs",
  transformOrigin: "var(--transform-origin)",
  alignItems: "center",
  gap: "1.5",
  rounded: "xl",
  bg: "foreground",
  px: "3",
  py: "1.5",
  fontSize: "xs",
  color: "background",
  "&:has([data-slot=kbd])": { pr: "1.5" },
  "& [data-slot=kbd]": {
    position: "relative",
    isolation: "isolate",
    zIndex: "50",
    rounded: "lg",
  },
});

const tooltipArrowStyles = css({
  zIndex: "50",
  size: "2.5",
  transform: "translateY(calc(-50% - 2px)) rotate(45deg)",
  rounded: "2px",
  bg: "foreground",
  fill: "foreground",
  "&[data-side='bottom']": { top: "1" },
  "&[data-side='inline-end']": {
    top: "50%!",
    left: "-1",
    transform: "translate(1.5px, -50%) rotate(45deg)",
  },
  "&[data-side='inline-start']": {
    top: "50%!",
    right: "-1",
    transform: "translate(-1.5px, -50%) rotate(45deg)",
  },
  "&[data-side='left']": {
    top: "50%!",
    right: "-1",
    transform: "translate(-1.5px, -50%) rotate(45deg)",
  },
  "&[data-side='right']": {
    top: "50%!",
    left: "-1",
    transform: "translate(1.5px, -50%) rotate(45deg)",
  },
  "&[data-side='top']": { bottom: "-2.5" },
});

function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={tooltipPositionerStyles}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={clsx(tooltipContentStyles, tooltipAnimationStyles, className)}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className={tooltipArrowStyles} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
