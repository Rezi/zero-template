import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

const paginationStyles = css({ mx: "auto", display: "flex", w: "full", justifyContent: "center" });

const paginationContentStyles = css({ display: "flex", alignItems: "center", gap: "1" });

const paginationLabelStyles = css({ display: "none", sm: { display: "block" } });

const paginationEllipsisStyles = css({
  display: "flex",
  size: "8",
  alignItems: "center",
  justifyContent: "center",
  "& svg:not([class*='size-'])": { size: "4" },
});

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(paginationStyles, className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(paginationContentStyles, className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(css({ pl: "1.5!" }), className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className={paginationLabelStyles}>{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(css({ pr: "1.5!" }), className)}
      {...props}
    >
      <span className={paginationLabelStyles}>{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(paginationEllipsisStyles, className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className={css({ srOnly: true })}>More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
