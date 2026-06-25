import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const separatorStyles = css({
  flexShrink: "0",
  bg: "border",
  "&[data-orientation='horizontal']": { h: "1px", w: "full" },
  "&[data-orientation='vertical']": { w: "1px", alignSelf: "stretch" },
});

function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={clsx(separatorStyles, className)}
      {...props}
    />
  );
}

export { Separator };
