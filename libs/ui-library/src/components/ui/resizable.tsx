"use client";

import * as ResizablePrimitive from "react-resizable-panels";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";

const resizablePanelGroupStyles = css({
  display: "flex",
  h: "full",
  w: "full",
  "&[aria-orientation=vertical]": { flexDirection: "column" },
});

const resizableHandleStyles = css({
  position: "relative",
  display: "flex",
  w: "1px",
  alignItems: "center",
  justifyContent: "center",
  bg: "border",
  "&::after": {
    content: '""',
    position: "absolute",
    insetBlock: "0",
    left: "50%",
    w: "1",
    transform: "translateX(-50%)",
  },
  _focusVisible: { ringW: "1", ringC: "ring", outline: "none" },
  "&[aria-orientation=horizontal]": {
    h: "1px",
    w: "full",
    "&::after": { left: "0", h: "1", w: "full", transform: "translateY(-50%)" },
  },
  "&[aria-orientation=horizontal] > div": { transform: "rotate(90deg)" },
});

const resizableHandleGripStyles = css({
  zIndex: "10",
  display: "flex",
  h: "6",
  w: "1",
  flexShrink: "0",
  rounded: "lg",
  bg: "border",
});

function ResizablePanelGroup({ className, ...props }: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={clsx(resizablePanelGroupStyles, className)}
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
      className={clsx(resizableHandleStyles, className)}
      {...props}
    >
      {withHandle && <div className={resizableHandleGripStyles} />}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
