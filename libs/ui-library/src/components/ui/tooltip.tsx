import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

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
        className={css({
          isolation: "isolate",
          zIndex: 50,
        })}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            css({
              zIndex: 50,
              display: "inline-flex",
              width: "fit-content",
              maxWidth: "xs",
              transformOrigin: "var(--transform-origin)",
              alignItems: "center",
              gap: "1.5",
              borderRadius: "xl",
              bg: "foreground",
              px: "3",
              py: "1.5",
              fontSize: "xs",
              color: "background",
              "&:has([data-slot='kbd'])": {
                pr: "1.5",
              },
              "& * [data-slot='kbd']": {
                position: "relative",
                isolation: "isolate",
                zIndex: 50,
                borderRadius: "lg",
              },
              '&[data-side="bottom"]': {
                "--enter-translate-y": "-0.5rem",
              },
              '&[data-side="inline-end"]': {
                "--enter-translate-x": "-0.5rem",
              },
              '&[data-side="inline-start"]': {
                "--enter-translate-x": "0.5rem",
              },
              '&[data-side="left"]': {
                "--enter-translate-x": "0.5rem",
              },
              '&[data-side="right"]': {
                "--enter-translate-x": "-0.5rem",
              },
              '&[data-side="top"]': {
                "--enter-translate-y": "0.5rem",
              },
              '&[data-state="delayed-open"]': {
                animationName: "enter",
                animationDuration: "150ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                animationFillMode: "both",
                "--enter-opacity": "0",
                "--enter-scale": ".95",
              },
              _dataOpen: {
                animationName: "enter",
                animationDuration: "150ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                animationFillMode: "both",
                "--enter-opacity": "0",
                "--enter-scale": ".95",
              },
              _dataClosed: {
                animationName: "exit",
                animationDuration: "150ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                animationFillMode: "both",
                "--exit-opacity": "0",
                "--exit-scale": ".95",
              },
            }),
            className,
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            className={css({
              zIndex: 50,
              width: "2.5",
              height: "2.5",
              translateY: "calc(-50% - 2px)",
              rotate: "45deg",
              borderRadius: "2px",
              bg: "foreground",
              fill: "foreground",
              '&[data-side="bottom"]': {
                top: "1",
              },
              '&[data-side="inline-end"]': {
                top: "50% !important",
                left: "-1",
                translateX: "1.5px",
                translateY: "-50%",
              },
              '&[data-side="inline-start"]': {
                top: "50% !important",
                right: "-1",
                translateX: "-1.5px",
                translateY: "-50%",
              },
              '&[data-side="left"]': {
                top: "50% !important",
                right: "-1",
                translateX: "-1.5px",
                translateY: "-50%",
              },
              '&[data-side="right"]': {
                top: "50% !important",
                left: "-1",
                translateX: "1.5px",
                translateY: "-50%",
              },
              '&[data-side="top"]': {
                bottom: "-2.5",
              },
            })}
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
