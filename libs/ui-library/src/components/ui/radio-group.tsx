import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn(css({ display: 'grid', width: 'full', gap: '3' }), className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item",
        css({
          peer: true,
          position: 'relative',
          display: 'flex',
          aspectRatio: '1 / 1',
          width: '4',
          height: '4',
          flexShrink: 0,
          borderRadius: '2xl',
          borderWidth: '1px',
          borderColor: 'transparent',
          bg: 'input/90',
          outline: 'none',
          _after: {
            position: 'absolute',
            insetX: '-3',
            insetY: '-2',
          },
          _focusVisible: {
            borderColor: 'ring',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)',
          },
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.5,
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
            _dataChecked: {
              bg: 'primary',
            },
          },
          _dataChecked: {
            bg: 'primary',
            color: 'primary-foreground',
          },
        }),
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={css({
          display: 'flex',
          width: '4',
          height: '4',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <span
          className={css({
            position: 'absolute',
            top: '1/2',
            left: '1/2',
            width: '2',
            height: '2',
            translateX: '-50%',
            translateY: '-50%',
            borderRadius: 'full',
            bg: 'primary-foreground',
            _dark: {
              width: '2.5',
              height: '2.5',
            },
          })}
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
