import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header>
      <nav>
        <Link to="/" activeProps={{ className: "nav-link is-active" }}>
          Home
        </Link>

        <ThemeToggle />
        {rightSlot}
      </nav>
    </header>
  );
}
