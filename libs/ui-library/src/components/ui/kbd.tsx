import * as React from "react";
import { kbd } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" className={clsx(kbd().root, className)} {...props} />;
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <kbd data-slot="kbd-group" className={clsx(kbd().group, className)} {...props} />;
}

export { Kbd, KbdGroup };
