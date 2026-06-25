import * as React from "react";
import { css } from "@zero-app/styled-system/css";
import { Loader2Icon } from "lucide-react";

import { clsx } from "clsx";

const spinnerStyles = css({ size: "4", animation: "spin" });

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={clsx(spinnerStyles, className)}
      {...props}
    />
  );
}

export { Spinner };
