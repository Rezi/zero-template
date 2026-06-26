import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { RouterContext } from "../router";
// The single global stylesheet (fonts + design tokens + sugar reset + generated
// Panda CSS), owned by the styles library. Regenerate the Panda layer with
// `deno task panda` (or `deno task panda:watch` for HMR).
import "@zero-app/styles/global.css";

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "zero-app" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
