"use client";

import * as React from "react";

import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className={css({ position: "relative", width: "full", overflowX: "auto" })}
    >
      <table
        data-slot="table"
        className={cn(
          css({
            width: "full",
            captionSide: "bottom",
            fontSize: "sm",
          }),
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        css({
          "& tr": { borderBottomWidth: "1px" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        css({
          "& tr:last-child": { borderWidth: "0" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        css({
          borderTopWidth: "1px",
          bg: "muted/50",
          fontWeight: "medium",
          "& > tr:last-child": { borderBottomWidth: "0" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        css({
          borderBottomWidth: "1px",
          transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          _hover: { bg: "muted/50" },
          "&:has([aria-expanded])": { bg: "muted/50" },
          '&[data-state="selected"]': { bg: "muted" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        css({
          height: "10",
          px: "2",
          textAlign: "left",
          verticalAlign: "middle",
          fontWeight: "medium",
          whiteSpace: "nowrap",
          color: "foreground",
          "&:has([role=checkbox])": { pr: "0" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        css({
          p: "2",
          verticalAlign: "middle",
          whiteSpace: "nowrap",
          "&:has([role=checkbox])": { pr: "0" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        css({
          mt: "4",
          fontSize: "sm",
          color: "muted-foreground",
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
