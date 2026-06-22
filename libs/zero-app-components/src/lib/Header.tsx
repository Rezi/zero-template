import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { css } from "@zero-app/styled-system/css";
import ThemeToggle from "./ThemeToggle";

export default function Header({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header>
      <nav className={css({ display: "flex", justifyContent: "space-between" })}>
        <Link
          to="/"
          className={css({ display: "flex" })}
          activeProps={{ className: "nav-link is-active" }}
        >
          Home
        </Link>

        <div>
          <ThemeToggle />
          {rightSlot}
        </div>
      </nav>
    </header>
  );
}
