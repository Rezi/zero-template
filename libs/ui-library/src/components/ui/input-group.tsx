"use client";

import * as React from "react";
import {
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  type InputGroupAddonVariantProps,
  type InputGroupButtonVariantProps,
} from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={clsx(inputGroup().root, className)}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  align = "inline-start",
  bordered,
  ...props
}: React.ComponentProps<"div"> & InputGroupAddonVariantProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={clsx(inputGroupAddon({ align, bordered }), className)}
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

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  InputGroupButtonVariantProps & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={clsx(inputGroupButton({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={clsx(inputGroup().text, className)} {...props} />;
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={clsx(inputGroup().input, className)}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={clsx(inputGroup().textarea, className)}
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
