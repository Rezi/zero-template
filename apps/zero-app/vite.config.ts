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
    alias: [
      // More specific '/server' subpaths must precede the base package aliases.
      { find: "@zero-app/auth/server", replacement: r("../../libs/auth/src/server.ts") },
      { find: "@zero-app/zero/server", replacement: r("../../libs/zero/src/server.ts") },
      { find: "@zero-app/auth", replacement: r("../../libs/auth/src/index.ts") },
      { find: "@zero-app/db", replacement: r("../../libs/db/src/index.ts") },
      { find: "@zero-app/zero", replacement: r("../../libs/zero/src/index.ts") },
      // Styled-system (Panda CSS generated) — also available via node_modules symlink
      // but alias ensures Vite always uses the source directory directly.
      {
        find: /^@zero-app\/styled-system\/(.*)$/,
        replacement: r("../../styled-system/$1"),
      },
      { find: "@zero-app/styled-system", replacement: r("../../styled-system") },
      {
        find: /^@zero-app\/ui-library\/(.*)$/,
        replacement: r("../../libs/ui-library/src/$1"),
      },
      { find: "@zero-app/ui-library", replacement: r("../../libs/ui-library/src/index.ts") },
      {
        find: "@zero-app/zero-app-components",
        replacement: r("../../libs/zero-app-components/src/index.ts"),
      },
      { find: "@", replacement: r("src") },
    ],
  },
  // PostCSS is auto-discovered from postcss.config.cjs at the workspace root.
  // Do NOT set css.postcss here — that would override the file-based config.
  plugins: [devtools(), tanstackStart(), viteReact()],
});

export default config;
