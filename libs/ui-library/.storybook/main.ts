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
    // Mirror the app's alias setup so stories can import from the package
    // barrel (`@zero-app/ui-library`) and subpaths, just like consumers do.
    // The styled-system alias also resolves the prebuilt Panda stylesheet the
    // preview imports (@zero-app/styled-system/styles.css).
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = [
      ...(Array.isArray(viteConfig.resolve.alias) ? viteConfig.resolve.alias : []),
      {
        find: /^@zero-app\/ui-library\/(.*)$/,
        replacement: r("../src/$1"),
      },
      { find: "@zero-app/ui-library", replacement: r("../src/index.ts") },
      { find: "@zero-app/styled-system", replacement: r("../../../libs/styles/styled-system") },
      { find: "@zero-app/styles", replacement: r("../../../libs/styles/src") },
    ];
    return viteConfig;
  },
};

export default config;
