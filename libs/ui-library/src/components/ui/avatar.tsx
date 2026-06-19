import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { css, cx } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

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
      className={cn(
        cx(
          "group/avatar",
          css({
            position: "relative",
            display: "flex",
            width: "8",
            height: "8",
            flexShrink: 0,
            borderRadius: "full",
            userSelect: "none",
            _after: {
              content: '""',
              position: "absolute",
              inset: "0",
              borderRadius: "full",
              borderWidth: "1px",
              borderColor: "border",
              mixBlendMode: "darken",
            },
            _dark: {
              _after: {
                mixBlendMode: "lighten",
              },
            },
            _dataSizeDefault: {
              width: "8",
              height: "8",
            },
            _dataSizeSm: {
              width: "6",
              height: "6",
            },
            _dataSizeLg: {
              width: "10",
              height: "10",
            },
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        css({
          aspectRatio: "1 / 1",
          width: "full",
          height: "full",
          borderRadius: "full",
          objectFit: "cover",
        }),
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        css({
          display: "flex",
          width: "full",
          height: "full",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          bg: "muted",
          fontSize: "sm",
          color: "muted-foreground",
          ".group\\/avatar[data-size=\"sm\"] &": {
            fontSize: "xs",
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        css({
          position: "absolute",
          right: "0",
          bottom: "0",
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          bg: "primary",
          color: "primary-foreground",
          backgroundBlendMode: "color",
          boxShadow: "0 0 0 2px var(--background)",
          userSelect: "none",
          ".group\\/avatar[data-size=\"sm\"] &": {
            width: "2",
            height: "2",
            "& > svg": {
              display: "none",
            },
          },
          ".group\\/avatar[data-size=\"default\"] &": {
            width: "2.5",
            height: "2.5",
            "& > svg": {
              width: "2",
              height: "2",
            },
          },
          ".group\\/avatar[data-size=\"lg\"] &": {
            width: "3",
            height: "3",
            "& > svg": {
              width: "2",
              height: "2",
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        cx(
          "group/avatar-group",
          css({
            display: "flex",
            "& > *": {
              marginLeft: "-0.5rem",
            },
            "& [data-slot=\"avatar\"]": {
              boxShadow: "0 0 0 2px var(--background)",
            },
          }),
        ),
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        css({
          position: "relative",
          display: "flex",
          width: "8",
          height: "8",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          bg: "muted",
          fontSize: "sm",
          color: "muted-foreground",
          boxShadow: "0 0 0 2px var(--background)",
          "& > svg": {
            width: "4",
            height: "4",
          },
          ".group\\/avatar-group:has([data-size=\"lg\"]) &": {
            width: "10",
            height: "10",
            "& > svg": {
              width: "5",
              height: "5",
            },
          },
          ".group\\/avatar-group:has([data-size=\"sm\"]) &": {
            width: "6",
            height: "6",
            "& > svg": {
              width: "3",
              height: "3",
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
