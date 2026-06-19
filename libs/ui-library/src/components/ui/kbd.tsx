import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        css({
          pointerEvents: "none",
          display: "inline-flex",
          height: "5",
          width: "fit-content",
          minWidth: "5",
          alignItems: "center",
          justifyContent: "center",
          gap: "1",
          borderRadius: "lg",
          bg: "muted",
          px: "1",
          fontFamily: "sans",
          fontSize: "xs",
          fontWeight: "medium",
          color: "muted-foreground",
          userSelect: "none",
          '[data-slot="input-group"] &': {
            bg: "input",
          },
          '[data-slot="tooltip-content"] &': {
            bg: "background/20",
            color: "background",
          },
          _dark: {
            '[data-slot="tooltip-content"] &': {
              bg: "background/10",
            },
          },
          "& svg:not([class*='size-'])": {
            width: "3",
            height: "3",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn(
        css({
          display: "inline-flex",
          alignItems: "center",
          gap: "1",
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
