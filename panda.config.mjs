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
    extend: {
      // Keyframe animations for the cases that genuinely need them. The Base UI
      // overlay/popup enter/exit motion does NOT live here — it uses CSS
      // transitions keyed on `data-starting-style`/`data-ending-style` (see
      // `libs/ui-library/src/lib/animations.ts`), which is what Base UI natively
      // drives. Keyframes keyed on `data-open`/`data-closed` (the Radix idiom)
      // don't reliably run on portalled backdrops.
      keyframes: {
        // Base UI exposes the resolved panel height as `--accordion-panel-height`.
        accordionDown: {
          from: { height: "0" },
          to: { height: "var(--accordion-panel-height)" },
        },
        accordionUp: {
          from: { height: "var(--accordion-panel-height)" },
          to: { height: "0" },
        },
        caretBlink: {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
      },

      // shadcn/ui semantic colour tokens. Each maps to a CSS variable already
      // defined in `apps/zero-app/src/styles.css` (`:root` for light, `.dark`
      // for dark), so light/dark switching is handled by those variables — no
      // Panda `_dark` condition is needed here. This lets
      // `css({ bg: "background", color: "muted.foreground" })` resolve the same
      // tokens the Tailwind classes (`bg-background`, `text-muted-foreground`, …)
      // used to — tw2panda drops these because they live in CSS `@theme`, not a
      // tailwind.config it can read.
      semanticTokens: {
        colors: {
          background: { value: "var(--background)" },
          foreground: { value: "var(--foreground)" },
          card: {
            DEFAULT: { value: "var(--card)" },
            foreground: { value: "var(--card-foreground)" },
          },
          popover: {
            DEFAULT: { value: "var(--popover)" },
            foreground: { value: "var(--popover-foreground)" },
          },
          primary: {
            DEFAULT: { value: "var(--primary)" },
            foreground: { value: "var(--primary-foreground)" },
          },
          secondary: {
            DEFAULT: { value: "var(--secondary)" },
            foreground: { value: "var(--secondary-foreground)" },
          },
          muted: {
            DEFAULT: { value: "var(--muted)" },
            foreground: { value: "var(--muted-foreground)" },
          },
          accent: {
            DEFAULT: { value: "var(--accent)" },
            foreground: { value: "var(--accent-foreground)" },
          },
          destructive: { value: "var(--destructive)" },
          border: { value: "var(--border)" },
          input: { value: "var(--input)" },
          ring: { value: "var(--ring)" },
          chart: {
            1: { value: "var(--chart-1)" },
            2: { value: "var(--chart-2)" },
            3: { value: "var(--chart-3)" },
            4: { value: "var(--chart-4)" },
            5: { value: "var(--chart-5)" },
          },
          sidebar: {
            DEFAULT: { value: "var(--sidebar)" },
            foreground: { value: "var(--sidebar-foreground)" },
            primary: {
              DEFAULT: { value: "var(--sidebar-primary)" },
              foreground: { value: "var(--sidebar-primary-foreground)" },
            },
            accent: {
              DEFAULT: { value: "var(--sidebar-accent)" },
              foreground: { value: "var(--sidebar-accent-foreground)" },
            },
            border: { value: "var(--sidebar-border)" },
            ring: { value: "var(--sidebar-ring)" },
          },
        },
      },
    },
  },

  // Custom utilities that reproduce Tailwind features the shadcn components rely
  // on but Panda has no built-in for. Shared across all converted components.
  utilities: {
    extend: {
      // Tailwind's `size-*` sets width AND height together.
      size: {
        className: "size",
        values: "sizes",
        transform(value) {
          return { width: value, height: value };
        },
      },
      // Tailwind's focus ring (`ring-3`, `ring-[3px]`) is a spread box-shadow.
      // `ringW` draws it; `ringC` sets the colour via a CSS var with a sensible
      // fallback so the two can be set independently (as TW does).
      // NOTE: named `ringW`/`ringC` (not `ringWidth`/`ringColor`) on purpose —
      // Panda has built-in `ringWidth`/`ringColor` utilities (mapped to
      // `outline-*`) that override our `utilities.extend` and would otherwise
      // swallow the box-shadow transform, leaving the ring invisible.
      ringW: {
        className: "ring",
        values: { 0: "0px", 1: "1px", 2: "2px", 3: "3px", 4: "4px" },
        transform(value) {
          return { boxShadow: `0 0 0 ${value} var(--ring-shadow-color, var(--ring))` };
        },
      },
      ringC: {
        className: "ring-c",
        values: "colors",
        transform(value) {
          // Panda resolves a bare token (e.g. "ring") to `var(--colors-ring)`,
          // but it does NOT apply the `/<opacity>` modifier for a custom utility
          // — it passes the raw "ring/30" string through. Reproduce Tailwind v4's
          // `color-mix(in oklab, <color> N%, transparent)` by hand for that case.
          const slash = typeof value === "string" ? value.indexOf("/") : -1;
          if (slash !== -1) {
            const token = value.slice(0, slash).replace(/\./g, "-");
            const pct = value.slice(slash + 1);
            return {
              "--ring-shadow-color": `color-mix(in oklab, var(--colors-${token}) ${pct}%, transparent)`,
            };
          }
          return { "--ring-shadow-color": value };
        },
      },
    },
  },
};
