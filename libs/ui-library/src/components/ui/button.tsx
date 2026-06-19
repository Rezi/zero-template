import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, cx } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const buttonVariants = cva({
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2xl',
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundClip: 'padding-box',
    fontSize: 'sm',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    userSelect: 'none',
    _focusVisible: {
      borderColor: 'ring',
      boxShadow: '0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)',
    },
    _active: {
      '&:not([aria-haspopup])': {
        translateY: '1px',
      },
    },
    _disabled: {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    _ariaInvalid: {
      borderColor: 'destructive',
      boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)',
    },
    _dark: {
      _ariaInvalid: {
        borderColor: 'destructive/50',
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
        bg: 'primary',
        color: 'primary-foreground',
        _hover: {
          bg: 'primary/80',
        },
      },
      outline: {
        borderColor: 'border',
        bg: 'background',
        _hover: {
          bg: 'muted',
          color: 'foreground',
        },
        _ariaExpanded: {
          bg: 'muted',
          color: 'foreground',
        },
        _dark: {
          bg: 'transparent',
          _hover: {
            bg: 'input/30',
          },
        },
      },
      secondary: {
        bg: 'secondary',
        color: 'secondary-foreground',
        _hover: {
          bg: 'color-mix(in oklch, var(--secondary), var(--foreground) 5%)',
        },
        _ariaExpanded: {
          bg: 'secondary',
          color: 'secondary-foreground',
        },
      },
      ghost: {
        _hover: {
          bg: 'muted',
          color: 'foreground',
        },
        _ariaExpanded: {
          bg: 'muted',
          color: 'foreground',
        },
        _dark: {
          _hover: {
            bg: 'muted/50',
          },
        },
      },
      destructive: {
        bg: 'destructive/10',
        color: 'destructive',
        _hover: {
          bg: 'destructive/20',
        },
        _focusVisible: {
          borderColor: 'destructive/40',
          boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)',
        },
        _dark: {
          bg: 'destructive/20',
          _hover: {
            bg: 'destructive/30',
          },
          _focusVisible: {
            boxShadow: '0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)',
          },
        },
      },
      link: {
        color: 'primary',
        textUnderlineOffset: '4px',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
    size: {
      default: {
        height: '8',
        gap: '1.5',
        px: '3',
        '&:has([data-icon="inline-end"])': { pr: '2.5' },
        '&:has([data-icon="inline-start"])': { pl: '2.5' },
      },
      xs: {
        height: '6',
        gap: '1',
        px: '2.5',
        fontSize: 'xs',
        '&:has([data-icon="inline-end"])': { pr: '2' },
        '&:has([data-icon="inline-start"])': { pl: '2' },
        "& svg:not([class*='size-'])": {
          width: '3',
          height: '3',
        },
      },
      sm: {
        height: '7',
        gap: '1',
        px: '3',
        '&:has([data-icon="inline-end"])': { pr: '2' },
        '&:has([data-icon="inline-start"])': { pl: '2' },
      },
      lg: {
        height: '9',
        gap: '1.5',
        px: '4',
        '&:has([data-icon="inline-end"])': { pr: '3' },
        '&:has([data-icon="inline-start"])': { pl: '3' },
      },
      icon: {
        width: '8',
        height: '8',
      },
      'icon-xs': {
        width: '6',
        height: '6',
        "& svg:not([class*='size-'])": {
          width: '3',
          height: '3',
        },
      },
      'icon-sm': {
        width: '7',
        height: '7',
      },
      'icon-lg': {
        width: '9',
        height: '9',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & RecipeVariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(cx("group/button", buttonVariants({ variant, size })), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
