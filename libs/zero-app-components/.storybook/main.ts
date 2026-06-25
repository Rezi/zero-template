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
      { find: "@zero-app/styled-system", replacement: r("../../../styled-system") },
    ];
    return viteConfig;
  },
};

export default config;
