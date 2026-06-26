// Panda CSS config discovery shim.
//
// The real config lives in the `styles` library (libs/styles/panda.config.mjs),
// which is the single home for the design system. Panda auto-discovers a
// `panda.config.*` from the directory it is invoked in (always the workspace root,
// via the `panda` prefixes in deno.json / project.json), so this root re-export
// keeps the real config's root-relative `include` globs and `outdir` resolving
// correctly — without having to pass `--config` at every call site.
export { default } from "./libs/styles/panda.config.mjs";
