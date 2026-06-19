import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

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
        className={css({ isolation: 'isolate', zIndex: 50 })}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            css({
              zIndex: 50,
              display: 'flex',
              width: '72',
              transformOrigin: 'var(--transform-origin)',
              flexDirection: 'column',
              gap: '4',
              borderRadius: '3xl',
              bg: 'popover',
              p: '4',
              fontSize: 'sm',
              color: 'popover-foreground',
              boxShadow: 'lg',
              outline: 'none',
              outlineOffset: '0',
              transitionDuration: '100ms',
              // ring-1 ring-foreground/5
              '&': {
                boxShadow: 'lg, 0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)',
              },
              _dark: {
                '&': {
                  boxShadow: 'lg, 0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
                },
              },
              // slide-in-from directional translations
              '&[data-side="bottom"]': { '--enter-translate-y': '-0.5rem' },
              '&[data-side="inline-end"]': { '--enter-translate-x': '-0.5rem' },
              '&[data-side="inline-start"]': { '--enter-translate-x': '0.5rem' },
              '&[data-side="left"]': { '--enter-translate-x': '0.5rem' },
              '&[data-side="right"]': { '--enter-translate-x': '-0.5rem' },
              '&[data-side="top"]': { '--enter-translate-y': '0.5rem' },
              // data-open animate-in fade-in-0 zoom-in-95
              _dataOpen: {
                animationName: 'enter',
                animationDuration: '150ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                animationFillMode: 'both',
                '--enter-opacity': '0',
                '--enter-scale': '.95',
              },
              // data-closed animate-out fade-out-0 zoom-out-95
              _dataClosed: {
                animationName: 'exit',
                animationDuration: '150ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                animationFillMode: 'both',
                '--exit-opacity': '0',
                '--exit-scale': '.95',
              },
            }),
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1',
          fontSize: 'sm',
        }),
        className,
      )}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        css({
          fontSize: 'md',
          fontWeight: 'medium',
        }),
        className,
      )}
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn(
        css({
          color: 'muted-foreground',
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };
