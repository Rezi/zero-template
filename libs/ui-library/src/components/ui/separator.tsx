import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        css({
          flexShrink: 0,
          bg: 'border',
          _dataHorizontal: { height: '1px', width: 'full' },
          _dataVertical: { width: '1px', alignSelf: 'stretch' },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
