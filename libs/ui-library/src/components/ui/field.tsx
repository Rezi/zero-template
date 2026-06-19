import { useMemo } from "react";
import { css, cva, cx } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Label } from "./label";
import { Separator } from "./separator";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        css({
          display: "flex",
          flexDirection: "column",
          gap: "6",
          '&:has(> [data-slot="checkbox-group"])': { gap: "3" },
          '&:has(> [data-slot="radio-group"])': { gap: "3" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        css({
          mb: "3",
          fontWeight: "medium",
          _dataVariantLabel: { fontSize: "sm" },
          '&[data-variant="legend"]': { fontSize: "md" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        cx(
          "group/field-group",
          css({
            containerType: "inline-size",
            containerName: "field-group",
            display: "flex",
            width: "full",
            flexDirection: "column",
            gap: "6",
            '&[data-slot="checkbox-group"]': { gap: "3" },
            '& > [data-slot="field-group"]': { gap: "4" },
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva({
  base: {
    display: "flex",
    width: "full",
    gap: "3",
    '&[data-invalid="true"]': { color: "destructive" },
  },
  variants: {
    orientation: {
      vertical: {
        flexDirection: "column",
        "& > *": { width: "full" },
        "& > .sr-only": { width: "auto" },
      },
      horizontal: {
        flexDirection: "row",
        alignItems: "center",
        '&:has(> [data-slot="field-content"])': { alignItems: "flex-start" },
        '& > [data-slot="field-label"]': { flex: "auto" },
        '&:has(> [data-slot="field-content"]) > [role="checkbox"], &:has(> [data-slot="field-content"]) > [role="radio"]':
          { mt: "px" },
      },
      responsive: {
        flexDirection: "column",
        "& > *": { width: "full" },
        "& > .sr-only": { width: "auto" },
        "@container field-group (min-width: 768px)": {
          flexDirection: "row",
          alignItems: "center",
          "& > *": { width: "auto" },
          '&:has(> [data-slot="field-content"])': { alignItems: "flex-start" },
          '& > [data-slot="field-label"]': { flex: "auto" },
          '&:has(> [data-slot="field-content"]) > [role="checkbox"], &:has(> [data-slot="field-content"]) > [role="radio"]':
            { mt: "px" },
        },
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & RecipeVariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(cx("group/field", fieldVariants({ orientation })), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        cx(
          "group/field-content",
          css({
            display: "flex",
            flex: "1",
            flexDirection: "column",
            gap: "1",
            lineHeight: "snug",
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        cx(
          "group/field-label",
          "peer/field-label",
          css({
            display: "flex",
            width: "fit-content",
            gap: "2",
            lineHeight: "snug",
            '.group\/field[data-disabled="true"] &': { opacity: 0.5 },
            "&:has([data-checked])": { bg: "input/30" },
            '&:has(> [data-slot="field"])': {
              borderRadius: "2xl",
              borderWidth: "1px",
              width: "full",
              flexDirection: "column",
            },
            '& > [data-slot="field"]': { p: "4" },
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        css({
          display: "flex",
          width: "fit-content",
          alignItems: "center",
          gap: "2",
          fontSize: "sm",
          fontWeight: "medium",
          '.group\/field[data-disabled="true"] &': { opacity: 0.5 },
        }),
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        css({
          textAlign: "left",
          fontSize: "sm",
          lineHeight: "normal",
          fontWeight: "normal",
          color: "muted-foreground",
          '.group\/field[data-horizontal] &': { textWrap: "balance" },
          '[data-variant="legend"] + &': { mt: "-1.5" },
          "&:last-child": { mt: "0" },
          "&:nth-last-child(2)": { mt: "-1" },
          "& > a": {
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          },
          "& > a:hover": { color: "primary" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        css({
          position: "relative",
          my: "-2",
          height: "5",
          fontSize: "sm",
          '.group\/field-group[data-variant="outline"] &': { mb: "-2" },
        }),
        className,
      )}
      {...props}
    >
      <Separator className={css({ position: "absolute", inset: "0", top: "1/2" })} />
      {children && (
        <span
          className={css({
            position: "relative",
            mx: "auto",
            display: "block",
            width: "fit-content",
            bg: "background",
            px: "2",
            color: "muted-foreground",
          })}
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul
        className={css({
          ml: "4",
          display: "flex",
          listStyleType: "disc",
          flexDirection: "column",
          gap: "1",
        })}
      >
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(
        css({
          fontSize: "sm",
          fontWeight: "normal",
          color: "destructive",
        }),
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
