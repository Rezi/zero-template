"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";
import { css } from "@zero-app/styled-system/css";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className={css({ width: '4', height: '4' })} />,
        info: <InfoIcon className={css({ width: '4', height: '4' })} />,
        warning: <TriangleAlertIcon className={css({ width: '4', height: '4' })} />,
        error: <OctagonXIcon className={css({ width: '4', height: '4' })} />,
        loading: <Loader2Icon className={css({ width: '4', height: '4', animation: 'spin 1s linear infinite' })} />,
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
