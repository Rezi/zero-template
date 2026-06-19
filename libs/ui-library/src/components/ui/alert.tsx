import * as React from "react";
import { css, cva } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const alertVariants = cva({
  base: {
    position: 'relative',
    display: 'grid',
    width: 'full',
    gap: '0.5',
    borderRadius: '2xl',
    borderWidth: '1px',
    px: '4',
    py: '3',
    textAlign: 'left',
    fontSize: 'sm',
    '&:has([data-slot="alert-action"])': {
      position: 'relative',
      pr: '18',
    },
    '&:has(> svg)': {
      gridTemplateColumns: 'auto 1fr',
      columnGap: '2.5',
    },
    '& > svg': {
      gridRowSpan: 2,
      translateY: '0.5',
      color: 'currentColor',
    },
    '& > svg:not([class*="size-"])': {
      width: '4',
      height: '4',
    },
  },
  variants: {
    variant: {
      default: {
        bg: 'card',
        color: 'card-foreground',
      },
      destructive: {
        bg: 'card',
        color: 'destructive',
        '& [data-slot="alert-description"]': {
          color: 'destructive/90',
        },
        '& > svg': {
          color: 'currentColor',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & RecipeVariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        css({
          fontWeight: 'medium',
          '.group\\/alert:has(> svg) &': {
            gridColumnStart: 2,
          },
          '& a': {
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          },
          '& a:hover': {
            color: 'foreground',
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        css({
          fontSize: 'sm',
          textWrap: 'balance',
          color: 'muted-foreground',
          md: {
            textWrap: 'pretty',
          },
          '& a': {
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          },
          '& a:hover': {
            color: 'foreground',
          },
          '& p:not(:last-child)': {
            mb: '4',
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        css({
          position: 'absolute',
          top: '2.5',
          right: '3',
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
