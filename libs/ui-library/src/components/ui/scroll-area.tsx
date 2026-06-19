import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function ScrollArea({ className, children, ...props }: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(css({ position: 'relative' }), className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={css({
          width: 'full',
          height: 'full',
          borderRadius: 'inherit',
          transitionProperty: 'color, box-shadow',
          transitionDuration: '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          outline: 'none',
          _focusVisible: {
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent)',
            outlineWidth: '1px',
          },
        })}
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
      className={cn(
        css({
          display: 'flex',
          touchAction: 'none',
          p: 'px',
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
          transitionDuration: '150ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none',
          _dataHorizontal: {
            height: '2.5',
            flexDirection: 'column',
            borderTopWidth: '1px',
            borderTopColor: 'transparent',
          },
          _dataVertical: {
            height: 'full',
            width: '2.5',
            borderLeftWidth: '1px',
            borderLeftColor: 'transparent',
          },
        }),
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={css({
          position: 'relative',
          flex: '1',
          borderRadius: 'full',
          bg: 'border',
        })}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
