"use client";

import * as React from "react";
import { css, cva, cx } from "@zero-app/styled-system/css";
import type { RecipeVariantProps } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        css({
          position: "relative",
          display: "flex",
          height: "8",
          width: "full",
          minWidth: "0",
          alignItems: "center",
          borderRadius: "2xl",
          borderWidth: "1px",
          borderColor: "transparent",
          bg: "input/50",
          transitionProperty: "color, box-shadow",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          "& .in-data-[slot=combobox-content]:focus-within": {
            borderColor: "inherit",
          },
          "&:has([data-slot=input-group-control]:focus-visible)": {
            borderColor: "ring",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)",
          },
          "&:has([data-slot][aria-invalid=true])": {
            borderColor: "destructive",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)",
          },
          _dark: {
            "&:has([data-slot][aria-invalid=true])": {
              boxShadow: "0 0 0 3px color-mix(in oklch, var(--destructive) 40%, transparent)",
            },
          },
          "&:has(> [data-align=block-end])": {
            height: "auto",
            flexDirection: "column",
          },
          "&:has(> [data-align=block-start])": {
            height: "auto",
            flexDirection: "column",
          },
          "&:has(> textarea)": {
            height: "auto",
          },
          "&:has(> [data-align=block-end]) > input": {
            pt: "3",
          },
          "&:has(> [data-align=block-start]) > input": {
            pb: "3",
          },
          "&:has(> [data-align=inline-end]) > input": {
            pr: "1.5",
          },
          "&:has(> [data-align=inline-start]) > input": {
            pl: "1.5",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva({
  base: {
    display: "flex",
    height: "auto",
    cursor: "text",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    py: "1.5",
    fontSize: "sm",
    fontWeight: "medium",
    color: "muted-foreground",
    userSelect: "none",
    ".group\\/input-group[data-disabled=true] &": {
      opacity: 0.5,
    },
    "& * [data-slot=kbd]": {
      borderRadius: "2xl",
      bg: "muted-foreground/10",
      px: "1.5",
    },
    "& > svg:not([class*='size-'])": {
      width: "4",
      height: "4",
    },
  },
  variants: {
    align: {
      "inline-start": {
        order: -1,
        pl: "2",
        "&:has(> button)": {
          ml: "-0.3rem",
        },
        "&:has(> kbd)": {
          ml: "-0.15rem",
        },
      },
      "inline-end": {
        order: 9999,
        pr: "2",
        "&:has(> button)": {
          mr: "-0.3rem",
        },
        "&:has(> kbd)": {
          mr: "-0.15rem",
        },
      },
      "block-start": {
        order: -1,
        width: "full",
        justifyContent: "flex-start",
        px: "2.5",
        pt: "2",
        ".group\\/input-group:has(> input) &": {
          pt: "2",
        },
        ".border-b &": {
          pb: "2",
        },
      },
      "block-end": {
        order: 9999,
        width: "full",
        justifyContent: "flex-start",
        px: "2.5",
        pb: "2",
        ".group\\/input-group:has(> input) &": {
          pb: "2",
        },
        ".border-t &": {
          pt: "2",
        },
      },
    },
  },
  defaultVariants: {
    align: "inline-start",
  },
});

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & RecipeVariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2",
    borderRadius: "2xl",
    fontSize: "sm",
    boxShadow: "none",
  },
  variants: {
    size: {
      xs: {
        height: "6",
        gap: "1",
        borderRadius: "xl",
        px: "1.5",
        "& > svg:not([class*='size-'])": {
          width: "3.5",
          height: "3.5",
        },
      },
      sm: {},
      "icon-xs": {
        width: "6",
        height: "6",
        borderRadius: "xl",
        p: "0",
        "&:has(> svg)": {
          p: "0",
        },
      },
      "icon-sm": {
        width: "8",
        height: "8",
        p: "0",
        "&:has(> svg)": {
          p: "0",
        },
      },
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  RecipeVariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        css({
          display: "flex",
          alignItems: "center",
          gap: "2",
          fontSize: "sm",
          color: "muted-foreground",
          "& svg": {
            pointerEvents: "none",
          },
          "& svg:not([class*='size-'])": {
            width: "4",
            height: "4",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        css({
          flex: "1",
          borderRadius: "0",
          borderWidth: "0",
          bg: "transparent",
          boxShadow: "none",
          _focusVisible: {
            boxShadow: "none",
          },
          _ariaInvalid: {
            boxShadow: "none",
          },
          _dark: {
            bg: "transparent",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        css({
          flex: "1",
          resize: "none",
          borderRadius: "0",
          borderWidth: "0",
          bg: "transparent",
          py: "2",
          boxShadow: "none",
          _focusVisible: {
            boxShadow: "none",
          },
          _ariaInvalid: {
            boxShadow: "none",
          },
          _dark: {
            bg: "transparent",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
