// Panda CSS — shared design-system codegen for the whole Nx monorepo.
//
// One config at the workspace root scans the app and the libraries, and emits a
// single `styled-system/` (aliased as `@zero-app/styled-system`) that all three
// packages import from. This follows the "include src files" approach from the
// Panda component-library guide (https://panda-css.com/docs/guides/component-library):
// because the app bundles the libraries from source (via Vite aliases), one Panda
// codegen covers app + libs.
//
// NOTE: we export a plain object with a JSDoc type rather than importing
// `defineConfig` from `@pandacss/dev`. Panda loads this config through esbuild,
// which cannot resolve `@pandacss/dev` here because Deno's `nodeModulesDir: auto`
// stores it behind a `.deno/` symlink. `defineConfig` is only an identity helper
// for typing, so dropping the runtime import avoids the resolution failure while
// the JSDoc keeps editor type-checking.
//
// Tailwind v4 is still active alongside Panda for now, so `preflight` is disabled
// to avoid a second, conflicting CSS reset. Drop this once Tailwind is removed.

/** @type {import("@pandacss/dev").Config} */
export default {
  preflight: false,

  // Emit React JSX patterns (Box, Stack, styled, …) in addition to css().
  jsxFramework: "react",

  // Files Panda statically analyses for style usage. Covers the app and the two
  // libraries that consume Panda.
  include: [
    "./apps/zero-app/src/**/*.{ts,tsx}",
    "./libs/ui-library/src/**/*.{ts,tsx}",
    "./libs/zero-app-components/src/**/*.{ts,tsx}",
  ],
  exclude: [],

  // The import specifier the generated runtime is consumed as. Physically the
  // output lives in `./styled-system` (see `outdir`), wired to this name via a
  // path alias in tsconfig.base.json and each Vite/Storybook config.
  importMap: "@zero-app/styled-system",
  outdir: "styled-system",

  theme: {
    extend: {},
  },
};
