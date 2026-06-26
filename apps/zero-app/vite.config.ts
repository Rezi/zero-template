import { defineConfig } from "vite";
import { resolve } from "node:path";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";

const r = (p: string) => resolve(__dirname, p);

const config = defineConfig({
  envDir: r("../.."),
  resolve: {
    tsconfigPaths: true,
    // Array form (vs. an object map) so we can use a regex entry for the
    // ui-library subpath rewrite. Entries are matched top-to-bottom, so more
    // specific patterns must precede the base package aliases.
    alias: [
      // More specific '/server' subpaths must precede the base package aliases.
      { find: "@zero-app/auth/server", replacement: r("../../libs/auth/src/server.ts") },
      { find: "@zero-app/zero/server", replacement: r("../../libs/zero/src/server.ts") },
      { find: "@zero-app/auth", replacement: r("../../libs/auth/src/index.ts") },
      { find: "@zero-app/db", replacement: r("../../libs/db/src/index.ts") },
      { find: "@zero-app/zero", replacement: r("../../libs/zero/src/index.ts") },
      // shadcn/ui is generated into libs/ui-library. Components and consumers can
      // import via subpaths (e.g. @zero-app/ui-library/components/ui/button), so
      // those must resolve to files under src/. The regex (with a capture group)
      // must precede the bare-package alias, which only ever resolves the barrel.
      {
        find: /^@zero-app\/ui-library\/(.*)$/,
        replacement: r("../../libs/ui-library/src/$1"),
      },
      { find: "@zero-app/ui-library", replacement: r("../../libs/ui-library/src/index.ts") },
      {
        find: "@zero-app/zero-app-components",
        replacement: r("../../libs/zero-app-components/src/index.ts"),
      },
      // Panda CSS generated output (see libs/styles/panda.config.mjs `outdir`). The
      // bare specifier and its subpaths (`/css`, `/jsx`, `/styles.css`, …) resolve
      // here. Must precede the `@zero-app/styles` alias below — distinct strings, but
      // keep specificity ordering intentional.
      { find: "@zero-app/styled-system", replacement: r("../../libs/styles/styled-system") },
      // The styles library: the single global stylesheet (`@zero-app/styles/global.css`)
      // plus tokens/sugar live under its src/.
      { find: "@zero-app/styles", replacement: r("../../libs/styles/src") },
      // App-local imports. Vite matches string aliases at a path boundary, so
      // "@" never collides with "@zero-app/*".
      { find: "@", replacement: r("src") },
    ],
  },
  // Panda's CSS is imported as a prebuilt stylesheet (@zero-app/styled-system/styles.css,
  // produced by `panda cssgen`) and consumed as a plain CSS side-effect import in
  // `__root.tsx`. Regenerate it with `deno task panda` (or `deno task panda:watch` for HMR).
  plugins: [devtools(), tanstackStart(), viteReact()],
});

export default config;
