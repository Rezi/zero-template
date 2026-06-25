import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const skeletonStyles = css({
  animation: "pulse",
  rounded: "2xl",
  bg: "muted",
});

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={clsx(skeletonStyles, className)} {...props} />;
}

export { Skeleton };
