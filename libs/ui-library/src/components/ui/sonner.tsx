"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { css } from "@zero-app/styled-system/css";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const iconSize = css({ size: "4" });
const iconSpin = css({ size: "4", animation: "spin" });

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      // `toaster`/`group` are sonner marker classes referenced by its own CSS.
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className={iconSize} />,
        info: <InfoIcon className={iconSize} />,
        warning: <TriangleAlertIcon className={iconSize} />,
        error: <OctagonXIcon className={iconSize} />,
        loading: <Loader2Icon className={iconSpin} />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
