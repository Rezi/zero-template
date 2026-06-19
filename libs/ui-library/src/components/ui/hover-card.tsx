"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { css, cx } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

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
        className={css({ isolation: 'isolate', zIndex: 50 })}
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            css({
              zIndex: 50,
              width: '72',
              transformOrigin: 'var(--transform-origin)',
              borderRadius: '3xl',
              bg: 'popover',
              p: '4',
              fontSize: 'sm',
              color: 'popover-foreground',
              boxShadow: 'lg',
              outline: 'none',
              outlineOffset: '0',
              transitionDuration: '100ms',
              '--shadow-ring': '0 0 0 1px color-mix(in oklch, var(--foreground) 5%, transparent)',
              _dark: {
                '--shadow-ring': '0 0 0 1px color-mix(in oklch, var(--foreground) 10%, transparent)',
              },
              '&': {
                boxShadow: 'lg, var(--shadow-ring)',
              },
              '&[data-side="bottom"]': { '--enter-translate-y': '-0.5rem' },
              '&[data-side="inline-end"]': { '--enter-translate-x': '-0.5rem' },
              '&[data-side="inline-start"]': { '--enter-translate-x': '0.5rem' },
              '&[data-side="left"]': { '--enter-translate-x': '0.5rem' },
              '&[data-side="right"]': { '--enter-translate-x': '-0.5rem' },
              '&[data-side="top"]': { '--enter-translate-y': '0.5rem' },
              _dataOpen: {
                animationName: 'enter',
                animationDuration: '150ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                animationFillMode: 'both',
                '--enter-opacity': '0',
                '--enter-scale': '.95',
              },
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
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
