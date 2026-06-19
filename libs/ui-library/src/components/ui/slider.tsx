import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn(
        css({
          _dataHorizontal: { width: 'full' },
          _dataVertical: { height: 'full' },
        }),
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control
        className={css({
          position: 'relative',
          display: 'flex',
          width: 'full',
          touchAction: 'none',
          alignItems: 'center',
          userSelect: 'none',
          _dataDisabled: { opacity: 0.5 },
          _dataVertical: {
            height: 'full',
            minHeight: '40',
            width: 'auto',
            flexDirection: 'column',
          },
        })}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={css({
            position: 'relative',
            flexGrow: 1,
            overflow: 'hidden',
            borderRadius: '2xl',
            bg: 'input/90',
            userSelect: 'none',
            _dataHorizontal: { height: '1', width: 'full' },
            _dataVertical: { height: 'full', width: '1' },
          })}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={css({
              bg: 'primary',
              userSelect: 'none',
              _dataHorizontal: { height: 'full' },
              _dataVertical: { width: 'full' },
            })}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={css({
              display: 'block',
              width: '4',
              height: '4',
              flexShrink: 0,
              borderRadius: '2xl',
              bg: 'white',
              boxShadow: 'md',
              transitionProperty: 'color, box-shadow',
              transitionDuration: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              userSelect: 'none',
              backgroundClip: 'padding-box',
              _dark: {
                backgroundClip: 'unset',
              },
              _hover: {
                boxShadow: '0 0 0 4px color-mix(in oklch, var(--ring) 30%, transparent)',
              },
              _focusVisible: {
                outline: 'none',
                boxShadow: '0 0 0 4px color-mix(in oklch, var(--ring) 30%, transparent)',
              },
              _disabled: {
                pointerEvents: 'none',
                opacity: 0.5,
              },
            })}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
