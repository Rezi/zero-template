import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        css({
          height: '8',
          width: 'full',
          minWidth: '0',
          borderRadius: '2xl',
          borderWidth: '1px',
          borderColor: 'transparent',
          bg: 'input/50',
          px: '2.5',
          py: '1',
          fontSize: 'md',
          transitionProperty: 'color, box-shadow',
          transitionDuration: '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          outline: 'none',
          '& ::file-selector-button': {
            display: 'inline-flex',
            height: '6',
            borderWidth: '0',
            background: 'transparent',
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'foreground',
          },
          _placeholder: {
            color: 'muted-foreground',
          },
          _focusVisible: {
            borderColor: 'ring',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)',
          },
          _disabled: {
            pointerEvents: 'none',
            cursor: 'not-allowed',
            opacity: 0.5,
          },
          _ariaInvalid: {
            borderColor: 'destructive',
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)',
          },
          md: {
            fontSize: 'sm',
          },
          _dark: {
            _ariaInvalid: {
              borderColor: 'destructive/50',
              boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)',
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
