import { css } from "@zero-app/styled-system/css";

// Enter/exit animations for Base UI overlay components (dialog, popover, menu,
// tooltip, …).
//
// Base UI drives transitions through two data attributes it sets on the element:
//   - `data-starting-style` — present on the first frame of an ENTER transition
//     (the "from" appearance); removed on the next frame so the element settles
//     into its resting/open style.
//   - `data-ending-style`   — present for the duration of an EXIT transition
//     (the "to" appearance); the element is unmounted once the transition ends.
//
// So the resting style IS the visible/open state, and we only describe the hidden
// appearance under `[data-starting-style]`/`[data-ending-style]`. This is the same
// idiom `sheet.tsx` uses, and it's what Base UI natively waits on when timing
// mount/unmount — the reason a keyframe `animation` keyed on `data-open`/`data-closed`
// (the shadcn/Radix `tw-animate-css` pattern) does NOT reliably run on the backdrop.
//
// `scale`/`translate` are used as their own CSS longhands (not `transform`), so they
// compose with a component's own `transform` (e.g. the dialog's centering
// `translate(-50%,-50%)`) instead of clobbering it.

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

// Backdrop / overlay: fade only, 100ms.
export const overlayAnimationStyles = css({
  transitionProperty: "opacity",
  transitionTimingFunction: EASE,
  transitionDuration: "100ms",
  "&[data-starting-style]": { opacity: "0" },
  "&[data-ending-style]": { opacity: "0" },
});

// Dialog-style content: fade + zoom (no slide), 100ms.
export const contentAnimationStyles = css({
  transitionProperty: "opacity, scale",
  transitionTimingFunction: EASE,
  transitionDuration: "100ms",
  "&[data-starting-style]": { opacity: "0", scale: "0.95" },
  "&[data-ending-style]": { opacity: "0", scale: "0.95" },
});

// Popover / menu content: fade + zoom + directional slide (0.5rem), 100ms.
// The slide is applied only on enter (`data-starting-style`), matching the original
// (which had `slide-in-from-*` but no `slide-out-to-*`).
export const popoverAnimationStyles = css({
  transitionProperty: "opacity, scale, translate",
  transitionTimingFunction: EASE,
  transitionDuration: "100ms",
  "&[data-starting-style]": { opacity: "0", scale: "0.95" },
  "&[data-ending-style]": { opacity: "0", scale: "0.95" },
  "&[data-side='top'][data-starting-style]": { translate: "0 0.5rem" },
  "&[data-side='bottom'][data-starting-style]": { translate: "0 -0.5rem" },
  "&[data-side='left'][data-starting-style]": { translate: "0.5rem" },
  "&[data-side='right'][data-starting-style]": { translate: "-0.5rem" },
  "&[data-side='inline-start'][data-starting-style]": { translate: "0.5rem" },
  "&[data-side='inline-end'][data-starting-style]": { translate: "-0.5rem" },
});

// Tooltip: same as the popover but at 150ms. `delayed-open` needs no special case —
// Base UI's starting/ending-style status applies regardless of how the open was triggered.
export const tooltipAnimationStyles = css({
  transitionProperty: "opacity, scale, translate",
  transitionTimingFunction: EASE,
  transitionDuration: "150ms",
  "&[data-starting-style]": { opacity: "0", scale: "0.95" },
  "&[data-ending-style]": { opacity: "0", scale: "0.95" },
  "&[data-side='top'][data-starting-style]": { translate: "0 0.5rem" },
  "&[data-side='bottom'][data-starting-style]": { translate: "0 -0.5rem" },
  "&[data-side='left'][data-starting-style]": { translate: "0.5rem" },
  "&[data-side='right'][data-starting-style]": { translate: "-0.5rem" },
  "&[data-side='inline-start'][data-starting-style]": { translate: "0.5rem" },
  "&[data-side='inline-end'][data-starting-style]": { translate: "-0.5rem" },
});

// Select content: like the popover, but only when the popup is NOT aligned to the
// trigger. When `alignItemWithTrigger` (the default) positions it in place, Base UI
// keeps it put, so the enter/exit motion is suppressed (was `data-[align-trigger=true]:animate-none`).
export const selectAnimationStyles = css({
  transitionProperty: "opacity, scale, translate",
  transitionTimingFunction: EASE,
  transitionDuration: "100ms",
  "&[data-align-trigger='false']": {
    "&[data-starting-style]": { opacity: "0", scale: "0.95" },
    "&[data-ending-style]": { opacity: "0", scale: "0.95" },
    "&[data-side='top'][data-starting-style]": { translate: "0 0.5rem" },
    "&[data-side='bottom'][data-starting-style]": { translate: "0 -0.5rem" },
    "&[data-side='left'][data-starting-style]": { translate: "0.5rem" },
    "&[data-side='right'][data-starting-style]": { translate: "-0.5rem" },
    "&[data-side='inline-start'][data-starting-style]": { translate: "0.5rem" },
    "&[data-side='inline-end'][data-starting-style]": { translate: "-0.5rem" },
  },
});
