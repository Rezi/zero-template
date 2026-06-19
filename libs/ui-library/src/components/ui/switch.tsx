import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch",
        css({
          position: 'relative',
          display: 'inline-flex',
          flexShrink: 0,
          alignItems: 'center',
          borderRadius: '2xl',
          borderWidth: '2px',
          transitionProperty: 'all',
          transitionDuration: '150ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          outline: 'none',
          _after: {
            content: '""',
            position: 'absolute',
            insetX: '-12px',
            insetY: '-8px',
          },
          _focusVisible: {
            borderColor: 'ring',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)',
          },
          _ariaInvalid: {
            borderColor: 'destructive',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)',
          },
          _dark: {
            _ariaInvalid: {
              borderColor: 'destructive/50',
              boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)',
            },
          },
          _dataSizeDefault: {
            height: '5',
            width: '8',
          },
          _dataSizeSm: {
            height: '4',
            width: '6',
          },
          _dataChecked: {
            borderColor: 'primary',
            bg: 'primary',
          },
          _dataUnchecked: {
            borderColor: 'transparent',
            bg: 'input/90',
          },
          _dataDisabled: {
            cursor: 'not-allowed',
            opacity: 0.5,
          },
        }),
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={css({
          pointerEvents: 'none',
          display: 'block',
          borderRadius: '2xl',
          bg: 'background',
          boxShadow: 'sm',
          transitionProperty: 'transform',
          transitionDuration: '150ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundClip: 'padding-box',
          '.group\\/switch[data-size="default"] &': {
            width: '4',
            height: '4',
          },
          '.group\\/switch[data-size="sm"] &': {
            width: '3',
            height: '3',
          },
          _dataChecked: {
            transform: 'translateX(calc(100% - 4px))',
            _dark: {
              bg: 'primary-foreground',
            },
          },
          _dataUnchecked: {
            transform: 'translateX(0)',
            _dark: {
              bg: 'foreground',
            },
          },
        })}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
