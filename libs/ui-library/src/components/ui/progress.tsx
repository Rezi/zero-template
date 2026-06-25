"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const progressStyles = css({ display: "flex", flexWrap: "wrap", gap: "3" });

const progressTrackStyles = css({
  position: "relative",
  display: "flex",
  h: "2",
  w: "full",
  alignItems: "center",
  overflowX: "hidden",
  rounded: "2xl",
  bg: "muted",
});

const progressIndicatorStyles = css({
  h: "full",
  bg: "primary",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
});

const progressLabelStyles = css({ fontSize: "sm", fontWeight: "medium" });

const progressValueStyles = css({
  ml: "auto",
  fontSize: "sm",
  color: "muted.foreground",
  fontVariantNumeric: "tabular-nums",
});

function Progress({ className, children, value, ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={clsx(progressStyles, className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={clsx(progressTrackStyles, className)}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={clsx(progressIndicatorStyles, className)}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={clsx(progressLabelStyles, className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={clsx(progressValueStyles, className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
