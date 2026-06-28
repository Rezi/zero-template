import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css } from "@zero-app/styled-system/css";
import { breadcrumb } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" className={clsx(breadcrumb().root, className)} {...props} />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol data-slot="breadcrumb-list" className={clsx(breadcrumb().list, className)} {...props} />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-item" className={clsx(breadcrumb().item, className)} {...props} />
  );
}

function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: clsx(breadcrumb().link, className),
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
      className={clsx(breadcrumb().page, className)}
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
      className={clsx(breadcrumb().separator, className)}
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
      className={clsx(breadcrumb().ellipsis, className)}
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
