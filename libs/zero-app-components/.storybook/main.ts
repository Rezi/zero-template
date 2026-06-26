import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const r = (p: string) => resolve(import.meta.dirname!, p);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(viteConfig) {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = [
      ...(Array.isArray(viteConfig.resolve.alias) ? viteConfig.resolve.alias : []),
      {
        find: "@zero-app/zero-app-components",
        replacement: r("../src/index.ts"),
      },
      // These stories render zero-app-components that build on ui-library (Button,
      // …), so the dev server must resolve the ui-library barrel + its subpaths from
      // source — same mapping the app's vite.config and the ui-library Storybook use.
      // The capturing regex must precede the bare-package alias (which only resolves
      // the barrel).
      {
        find: /^@zero-app\/ui-library\/(.*)$/,
        replacement: r("../../ui-library/src/$1"),
      },
      { find: "@zero-app/ui-library", replacement: r("../../ui-library/src/index.ts") },
      { find: "@zero-app/styled-system", replacement: r("../../../libs/styles/styled-system") },
      { find: "@zero-app/styles", replacement: r("../../../libs/styles/src") },
    ];
    return viteConfig;
  },
};

export default config;
