"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, cx } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const toggleVariants = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1',
    borderRadius: '2xl',
    fontSize: 'sm',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    _hover: {
      bg: 'muted',
      color: 'foreground',
    },
    _focusVisible: {
      borderColor: 'ring',
      boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)',
    },
    _disabled: {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    _ariaInvalid: {
      borderColor: 'destructive',
      boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)',
    },
    _ariaPressed: {
      bg: 'muted',
    },
    _dark: {
      _ariaInvalid: {
        boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)',
      },
    },
    '& svg': {
      pointerEvents: 'none',
      flexShrink: 0,
    },
    "& svg:not([class*='size-'])": {
      width: '4',
      height: '4',
    },
  },
  variants: {
    variant: {
      default: {
        bg: 'transparent',
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'input',
        bg: 'transparent',
        _hover: {
          bg: 'muted',
        },
      },
    },
    size: {
      default: {
        height: '8',
        minWidth: '8',
        px: '2.5',
        '&:has([data-icon="inline-end"])': { pr: '2' },
        '&:has([data-icon="inline-start"])': { pl: '2' },
      },
      sm: {
        height: '7',
        minWidth: '7',
        px: '2.5',
        '&:has([data-icon="inline-end"])': { pr: '1.5' },
        '&:has([data-icon="inline-start"])': { pl: '1.5' },
      },
      lg: {
        height: '9',
        minWidth: '9',
        px: '2.5',
        '&:has([data-icon="inline-end"])': { pr: '2' },
        '&:has([data-icon="inline-start"])': { pl: '2' },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & RecipeVariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
