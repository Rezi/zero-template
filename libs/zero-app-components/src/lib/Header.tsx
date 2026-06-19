import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header>
      <nav className="flex justify-between">
        <Link to="/" className="flex" activeProps={{ className: "nav-link is-active" }}>
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
