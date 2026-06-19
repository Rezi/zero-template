"use client";

import * as ResizablePrimitive from "react-resizable-panels";

import { css } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";

function ResizablePanelGroup({ className, ...props }: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        css({
          display: "flex",
          height: "full",
          width: "full",
          '&[aria-orientation="vertical"]': { flexDirection: "column" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        css({
          position: "relative",
          display: "flex",
          width: "1px",
          alignItems: "center",
          justifyContent: "center",
          bg: "border",
          _after: {
            content: '""',
            position: "absolute",
            insetY: "0",
            left: "50%",
            width: "4px",
            translateX: "-50%",
          },
          _focusVisible: {
            outline: "none",
            outlineOffset: "0",
            boxShadow: "0 0 0 1px var(--ring)",
          },
          '&[aria-orientation="horizontal"]': {
            height: "1px",
            width: "full",
            _after: {
              left: "0",
              height: "4px",
              width: "full",
              translateX: "0",
              translateY: "-50%",
            },
          },
          '&[aria-orientation="horizontal"] > div': {
            rotate: "90deg",
          },
        }),
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={css({
            zIndex: 10,
            display: "flex",
            height: "6",
            width: "1",
            flexShrink: 0,
            borderRadius: "lg",
            bg: "border",
          })}
        />
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
