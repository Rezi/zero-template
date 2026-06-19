/**
 * PostCSS config — minimal, no Panda CSS PostCSS plugin.
 *
 * Panda CSS generates its utility classes via the `panda cssgen` CLI command
 * (see `deno task panda`) which writes apps/zero-app/src/panda.css.
 * styles.css imports that file directly, so no PostCSS Panda plugin is needed.
 */
module.exports = {};
