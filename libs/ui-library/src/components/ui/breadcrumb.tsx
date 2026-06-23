import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

const breadcrumbListStyles = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "1.5",
  fontSize: "sm",
  overflowWrap: "break-word",
  color: "muted.foreground",
  sm: { gap: "2.5" },
});

const breadcrumbItemStyles = css({ display: "inline-flex", alignItems: "center", gap: "1.5" });

const breadcrumbLinkStyles = css({
  transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  _hover: { color: "foreground" },
});

const breadcrumbPageStyles = css({ fontWeight: "normal", color: "foreground" });

const breadcrumbSeparatorStyles = css({ "& > svg": { size: "3.5" } });

const breadcrumbEllipsisStyles = css({
  display: "flex",
  size: "5",
  alignItems: "center",
  justifyContent: "center",
  "& > svg": { size: "4" },
});

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn(className)} {...props} />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol data-slot="breadcrumb-list" className={cn(breadcrumbListStyles, className)} {...props} />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-item" className={cn(breadcrumbItemStyles, className)} {...props} />
  );
}

function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(breadcrumbLinkStyles, className),
      },
      props,
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  });
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(breadcrumbPageStyles, className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorStyles, className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbEllipsisStyles, className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className={css({ srOnly: true })}>More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
