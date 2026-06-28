import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { slider } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

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
      className={clsx(slider().root, className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className={slider().control}>
        <SliderPrimitive.Track data-slot="slider-track" className={slider().track}>
          <SliderPrimitive.Indicator data-slot="slider-range" className={slider().indicator} />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={slider().thumb}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
