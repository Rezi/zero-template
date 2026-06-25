import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const scrollAreaViewportStyles = css({
  size: "full",
  borderRadius: "inherit",
  transitionProperty: "color, box-shadow",
  outline: "none",
  _focusVisible: { ringW: "3", ringC: "ring/50", outlineWidth: "1px" },
});

const scrollBarStyles = css({
  display: "flex",
  touchAction: "none",
  p: "1px",
  transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  userSelect: "none",
  "&[data-orientation='horizontal']": {
    h: "2.5",
    flexDirection: "column",
    borderTopWidth: "1px",
    borderTopColor: "transparent",
  },
  "&[data-orientation='vertical']": {
    h: "full",
    w: "2.5",
    borderLeftWidth: "1px",
    borderLeftColor: "transparent",
  },
});

const scrollThumbStyles = css({ position: "relative", flex: "1", rounded: "full", bg: "border" });

function ScrollArea({ className, children, ...props }: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={clsx(css({ position: "relative" }), className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={scrollAreaViewportStyles}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={clsx(scrollBarStyles, className)}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" className={scrollThumbStyles} />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
