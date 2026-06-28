"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { sonner } from "@zero-app/styled-system/recipes";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      // `toaster`/`group` are sonner marker classes referenced by its own CSS.
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className={sonner().icon} />,
        info: <InfoIcon className={sonner().icon} />,
        warning: <TriangleAlertIcon className={sonner().icon} />,
        error: <OctagonXIcon className={sonner().icon} />,
        loading: <Loader2Icon className={sonner().iconSpin} />,
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
