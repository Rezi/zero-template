import type { ReactNode } from "react";
import Header from "./Header";

export function SiteLayout({
  children,
  rightSlot,
}: {
  children: ReactNode;
  rightSlot?: ReactNode;
}) {
  return (
    <>
      <header>
        <div className="s-container">
          <Header rightSlot={rightSlot} />
        </div>
      </header>
      <main className="s-container">{children}</main>
      <footer>
        <div className="s-container">asd</div>
      </footer>
    </>
  );
}
