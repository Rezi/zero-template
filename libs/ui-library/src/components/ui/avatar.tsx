import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { avatar } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

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
      className={clsx(avatar().root, className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={clsx(avatar().image, className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={clsx(avatar().fallback, className)}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="avatar-badge" className={clsx(avatar().badge, className)} {...props} />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar-group" className={clsx(avatar().group, className)} {...props} />;
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={clsx(avatar().groupCount, className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
