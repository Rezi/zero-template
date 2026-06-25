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

// Reproduces Panda's native `/<opacity>` color modifier for *custom* color
// utilities. Panda only auto-applies the modifier to built-in color utilities
// (where it emits `color-mix(in srgb, …)`); for a custom utility it passes the
// raw `"token/NN"` string straight through, so we expand it here. Defaulting to
// `srgb` keeps custom + built-in opacities blending in the same color space.
function colorWithAlpha(value, colorSpace = "srgb") {
  if (typeof value !== "string") return value;
  const slash = value.indexOf("/");
  if (slash === -1) return value; // bare token / raw value — already resolved by Panda
  const token = value.slice(0, slash).replace(/\./g, "-");
  const pct = value.slice(slash + 1);
  return `color-mix(in ${colorSpace}, var(--colors-${token}) ${pct}%, transparent)`;
}

/** @type {import("@pandacss/dev").Config} */
export default {
  preflight: false,

  globalCss: {
    "*": {
      borderColor: "border",
      outlineColor: "ring/50",
    },
    html: {
      fontFamily: "var(--font-sans)",
    },
    body: {
      bg: "background",
      color: "foreground",
    },
    ".no-scrollbar": {
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": { display: "none" },
    },
  },

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

  utilities: {
    extend: {
      size: {
        className: "size",
        values: "sizes",
        transform(value) {
          return { width: value, height: value };
        },
      },

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
          // — it passes the raw "ring/30" string through. `colorWithAlpha`
          // expands that case (and is a no-op for an already-resolved value), so
          // ring opacities blend in the same `srgb` space as every built-in
          // color utility.
          return { "--ring-shadow-color": colorWithAlpha(value) };
        },
      },
    },
  },
};
