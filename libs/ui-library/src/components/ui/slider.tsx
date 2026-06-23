import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const shadowMd = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
const thumbRingHover = `0 0 0 4px color-mix(in oklab, var(--ring) 30%, transparent), ${shadowMd}`;

const sliderStyles = css({
  "&[data-orientation='horizontal']": { w: "full" },
  "&[data-orientation='vertical']": { h: "full" },
});

const sliderControlStyles = css({
  position: "relative",
  display: "flex",
  w: "full",
  touchAction: "none",
  alignItems: "center",
  userSelect: "none",
  "&:where([data-state='disabled'], [data-disabled]:not([data-disabled='false']))": {
    opacity: "0.5",
  },
  "&[data-orientation='vertical']": {
    h: "full",
    minH: "40",
    w: "auto",
    flexDirection: "column",
  },
});

const sliderTrackStyles = css({
  position: "relative",
  flexGrow: "1",
  overflow: "hidden",
  rounded: "2xl",
  bg: "input/90",
  userSelect: "none",
  "&[data-orientation='horizontal']": { h: "1", w: "full" },
  "&[data-orientation='vertical']": { h: "full", w: "1" },
});

const sliderIndicatorStyles = css({
  bg: "primary",
  userSelect: "none",
  "&[data-orientation='horizontal']": { h: "full" },
  "&[data-orientation='vertical']": { w: "full" },
});

const sliderThumbStyles = css({
  display: "block",
  size: "4",
  flexShrink: "0",
  rounded: "2xl",
  bg: "white",
  // shadow-md + ring-1 ring-black/10 composed into one box-shadow
  boxShadow: `0 0 0 1px rgb(0 0 0 / 0.1), ${shadowMd}`,
  transitionProperty: "color, box-shadow",
  transitionDuration: "200ms",
  userSelect: "none",
  "&:not(.dark *)": { backgroundClip: "padding-box" },
  _hover: { boxShadow: thumbRingHover },
  _focusVisible: { boxShadow: thumbRingHover, outline: "none" },
  _disabled: { pointerEvents: "none", opacity: "0.5" },
});

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
      className={cn(sliderStyles, className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className={sliderControlStyles}>
        <SliderPrimitive.Track data-slot="slider-track" className={sliderTrackStyles}>
          <SliderPrimitive.Indicator data-slot="slider-range" className={sliderIndicatorStyles} />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} className={sliderThumbStyles} />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
