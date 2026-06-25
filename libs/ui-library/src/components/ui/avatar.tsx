import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const avatarStyles = css({
  position: "relative",
  display: "flex",
  size: "8",
  flexShrink: "0",
  rounded: "full",
  userSelect: "none",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: "0",
    rounded: "full",
    borderWidth: "1px",
    borderColor: "border",
    mixBlendMode: "darken",
  },
  "&[data-size='lg']": { size: "10" },
  "&[data-size='sm']": { size: "6" },
  _dark: { "&::after": { mixBlendMode: "lighten" } },
});

const avatarImageStyles = css({
  aspectRatio: "square",
  size: "full",
  rounded: "full",
  objectFit: "cover",
});

const avatarFallbackStyles = css({
  display: "flex",
  size: "full",
  alignItems: "center",
  justifyContent: "center",
  rounded: "full",
  bg: "muted",
  fontSize: "sm",
  color: "muted.foreground",
  "[data-slot='avatar'][data-size='sm'] &": { fontSize: "xs" },
});

const avatarBadgeStyles = css({
  position: "absolute",
  right: "0",
  bottom: "0",
  zIndex: "10",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  rounded: "full",
  bg: "primary",
  color: "primary.foreground",
  backgroundBlendMode: "color",
  ringW: "2",
  ringC: "background",
  userSelect: "none",
  "[data-slot='avatar'][data-size='sm'] &": {
    size: "2",
    "& > svg": { display: "none" },
  },
  "[data-slot='avatar'][data-size='default'] &": {
    size: "2.5",
    "& > svg": { size: "2" },
  },
  "[data-slot='avatar'][data-size='lg'] &": {
    size: "3",
    "& > svg": { size: "2" },
  },
});

const avatarGroupStyles = css({
  display: "flex",
  "& > * + *": { marginLeft: "-2" },
  "& > [data-slot='avatar']": { ringW: "2", ringC: "background" },
});

const avatarGroupCountStyles = css({
  position: "relative",
  display: "flex",
  size: "8",
  flexShrink: "0",
  alignItems: "center",
  justifyContent: "center",
  rounded: "full",
  bg: "muted",
  fontSize: "sm",
  color: "muted.foreground",
  ringW: "2",
  ringC: "background",
  "& > svg": { size: "4" },
  "[data-slot='avatar-group']:has([data-size='lg']) &": {
    size: "10",
    "& > svg": { size: "5" },
  },
  "[data-slot='avatar-group']:has([data-size='sm']) &": {
    size: "6",
    "& > svg": { size: "3" },
  },
});

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={clsx(avatarStyles, className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={clsx(avatarImageStyles, className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={clsx(avatarFallbackStyles, className)}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="avatar-badge" className={clsx(avatarBadgeStyles, className)} {...props} />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar-group" className={clsx(avatarGroupStyles, className)} {...props} />;
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={clsx(avatarGroupCountStyles, className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
