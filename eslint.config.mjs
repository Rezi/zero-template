import nxPlugin from "@nx/eslint-plugin";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/.nitro",
      "**/.tanstack",
      "**/.output",
      "**/.vinxi",
      "**/playwright-report",
      "**/test-results",
      "**/routeTree.gen.ts",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@nx": nxPlugin,
    },
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "type:app",
              onlyDependOnLibsWithTags: ["type:ui", "type:data-access"],
            },
            {
              sourceTag: "type:e2e",
              onlyDependOnLibsWithTags: ["type:app"],
            },
            {
              // App-specific components: may build on the pure UI foundation
              // and consume data-access libraries.
              sourceTag: "scope:app-components",
              onlyDependOnLibsWithTags: ["scope:ui", "scope:styles", "scope:auth", "scope:zero"],
            },
            {
              // ui-library is a pure presentational foundation / design system.
              // It must not depend on data-access (auth/db/zero) libraries. It may
              // depend on the styles library — the Panda runtime (@zero-app/styled-system)
              // now resolves into libs/styles, creating a real graph edge.
              sourceTag: "scope:ui",
              onlyDependOnLibsWithTags: ["scope:ui", "scope:styles"],
            },
            {
              // styles is the leaf design-system library (tokens, global CSS, Panda
              // output). It must not depend on any other workspace library.
              sourceTag: "scope:styles",
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: "scope:auth",
              onlyDependOnLibsWithTags: ["scope:db"],
            },
            {
              sourceTag: "scope:db",
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: "scope:zero",
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },
];
