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
    // PostCSS is auto-discovered from postcss.config.cjs at workspace root.
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = [
      ...(Array.isArray(viteConfig.resolve.alias) ? viteConfig.resolve.alias : []),
      {
        find: /^@zero-app\/styled-system\/(.*)$/,
        replacement: r("../../../styled-system/$1"),
      },
      { find: "@zero-app/styled-system", replacement: r("../../../styled-system") },
      {
        find: /^@zero-app\/ui-library\/(.*)$/,
        replacement: r("../src/$1"),
      },
      { find: "@zero-app/ui-library", replacement: r("../src/index.ts") },
    ];
    return viteConfig;
  },
};

export default config;
