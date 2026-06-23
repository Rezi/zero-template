import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const skeletonStyles = css({
  animation: "pulse",
  rounded: "2xl",
  bg: "muted",
});

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn(skeletonStyles, className)} {...props} />;
}

export { Skeleton };
