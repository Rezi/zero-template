import * as React from "react";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        css({
          display: "flex",
          fieldSizing: "content",
          minHeight: "16",
          width: "full",
          resize: "none",
          borderRadius: "2xl",
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "input/50",
          px: "2.5",
          py: "2",
          fontSize: "md",
          transitionProperty: "color, box-shadow",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          _placeholder: {
            color: "muted-foreground",
          },
          _focusVisible: {
            borderColor: "ring",
            boxShadow:
              "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)",
          },
          _disabled: {
            cursor: "not-allowed",
            opacity: 0.5,
          },
          _ariaInvalid: {
            borderColor: "destructive",
            boxShadow:
              "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
          },
          _dark: {
            _ariaInvalid: {
              borderColor: "destructive/50",
              boxShadow:
                "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
            },
          },
          md: {
            fontSize: "sm",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
