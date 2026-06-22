import { defineConfig } from "vite";
import { resolve } from "node:path";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

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
      // shadcn/ui is generated into libs/ui-library. Generated components import
      // each other and the `cn` helper via subpaths (@zero-app/ui-library/lib/utils,
      // @zero-app/ui-library/components/ui/*), so those must resolve to files under
      // src/. The regex (with a capture group) must precede the bare-package alias,
      // which only ever resolves the barrel.
      {
        find: /^@zero-app\/ui-library\/(.*)$/,
        replacement: r("../../libs/ui-library/src/$1"),
      },
      { find: "@zero-app/ui-library", replacement: r("../../libs/ui-library/src/index.ts") },
      {
        find: "@zero-app/zero-app-components",
        replacement: r("../../libs/zero-app-components/src/index.ts"),
      },
      // Panda CSS generated output (see panda.config.mjs `outdir`). The bare
      // specifier and its subpaths (`/css`, `/jsx`, `/styles.css`, …) resolve here.
      { find: "@zero-app/styled-system", replacement: r("../../styled-system") },
      // App-local imports. Vite matches string aliases at a path boundary, so
      // "@" never collides with "@zero-app/*".
      { find: "@", replacement: r("src") },
    ],
  },
  // Panda's CSS is imported as a prebuilt stylesheet (@zero-app/styled-system/styles.css,
  // produced by `panda cssgen`) rather than via the PostCSS plugin: the @tailwindcss/vite
  // plugin owns the CSS pipeline here, so an inline css.postcss panda plugin never runs.
  // Regenerate the stylesheet with `deno task panda` (or `deno task panda:watch` for HMR).
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
});

export default config;
