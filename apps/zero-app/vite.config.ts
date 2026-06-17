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
    alias: {
      // Order matters: more specific '/server' subpaths must precede the
      // base package aliases so they are matched first.
      "@zero-app/auth/server": r("../../libs/auth/src/server.ts"),
      "@zero-app/zero/server": r("../../libs/zero/src/server.ts"),
      "@zero-app/auth": r("../../libs/auth/src/index.ts"),
      "@zero-app/db": r("../../libs/db/src/index.ts"),
      "@zero-app/zero": r("../../libs/zero/src/index.ts"),
      "@zero-app/ui-library": r("../../libs/ui-library/src/index.ts"),
      "@zero-app/zero-app-components": r("../../libs/zero-app-components/src/index.ts"),
    },
  },
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
});

export default config;
