"use client";

import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";

const tableContainerStyles = css({ position: "relative", w: "full", overflowX: "auto" });

const tableStyles = css({ w: "full", captionSide: "bottom", fontSize: "sm" });

const tableHeaderStyles = css({ "& tr": { borderBottomWidth: "1px" } });

const tableBodyStyles = css({ "& tr:last-child": { borderWidth: "0" } });

const tableFooterStyles = css({
  borderTopWidth: "1px",
  bg: "muted/50",
  fontWeight: "medium",
  "& > tr:last-child": { borderBottomWidth: "0" },
});

const tableRowStyles = css({
  borderBottomWidth: "1px",
  transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  _hover: { bg: "muted/50" },
  "&:has([aria-expanded='true'])": { bg: "muted/50" },
  "&[data-state='selected']": { bg: "muted" },
});

const tableHeadStyles = css({
  h: "10",
  px: "2",
  textAlign: "left",
  verticalAlign: "middle",
  fontWeight: "medium",
  whiteSpace: "nowrap",
  color: "foreground",
  "&:has([role=checkbox])": { pr: "0" },
});

const tableCellStyles = css({
  p: "2",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
  "&:has([role=checkbox])": { pr: "0" },
});

const tableCaptionStyles = css({ mt: "4", fontSize: "sm", color: "muted.foreground" });

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className={tableContainerStyles}>
      <table data-slot="table" className={cn(tableStyles, className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn(tableHeaderStyles, className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(tableBodyStyles, className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn(tableFooterStyles, className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn(tableRowStyles, className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th data-slot="table-head" className={cn(tableHeadStyles, className)} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn(tableCellStyles, className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn(tableCaptionStyles, className)} {...props} />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
