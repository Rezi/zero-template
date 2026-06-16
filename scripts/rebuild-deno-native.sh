#!/usr/bin/env bash
# Rebuilds the platform-specific native binaries that Deno's shared node_modules
# can't carry across the macOS host <-> Linux sandbox boundary.
#
# The main offender is @rocicorp/zero-sqlite3: it ships no prebuilt binary for
# every node/arch combo, so it falls back to compiling SQLite from source. That
# source build #includes src/util/unicode_case_data.h, a generated header that
# is NOT in the npm tarball and is NOT produced by the package's own install
# script — so node-gyp fails with "'unicode_case_data.h' file not found".
# We generate that header ourselves, then build.
#
# Run this on whichever machine you're about to develop on (host or sandbox).
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Removing existing @rocicorp/zero-sqlite3 build (platform-specific)"
rm -rf node_modules/.deno/@rocicorp+zero-sqlite3@*

echo "==> Reinstalling deno packages (building other native deps)"
# zero-sqlite3 is intentionally NOT in --allow-scripts: its build needs the
# generated header below, so we build it manually afterwards.
deno install --allow-scripts=npm:esbuild,npm:lightningcss,npm:nx,npm:protobufjs

ZS="$(echo node_modules/.deno/@rocicorp+zero-sqlite3@*/node_modules/@rocicorp/zero-sqlite3)"
if [ ! -d "$ZS" ]; then
  echo "ERROR: could not locate extracted @rocicorp/zero-sqlite3 under node_modules/.deno" >&2
  exit 1
fi

echo "==> Generating unicode_case_data.h"
node "$ZS/deps/gen-unicode-case.mjs" > "$ZS/src/util/unicode_case_data.h"

echo "==> Building @rocicorp/zero-sqlite3 native binary"
# node-gyp also builds an optional standalone sqlite3 CLI shell target
# (zero_sqlite3) that zero-cache does NOT use. That target can fail on some
# toolchains (e.g. missing readline headers, or strict -D_POSIX_SOURCE hiding
# libc decls) — we only care about the better_sqlite3.node addon, so a non-zero
# exit here is tolerated as long as the addon was produced and loads below.
( cd "$ZS" && node-gyp rebuild --release ) || echo "WARN: node-gyp returned non-zero (likely the optional sqlite3 CLI shell target) — verifying the addon below"

NODE_ADDON="$ZS/build/Release/better_sqlite3.node"
if [ ! -f "$NODE_ADDON" ]; then
  echo "ERROR: better_sqlite3.node was not produced — the build genuinely failed" >&2
  exit 1
fi

echo "==> Verifying the addon loads and runs"
node -e "const D=require('$PWD/$ZS/lib/database.js'); const db=new D(':memory:'); db.exec('create table t(a)'); db.prepare('insert into t values(1)').run(); if(db.prepare('select a from t').get().a!==1) process.exit(1);"

echo "==> Done. better_sqlite3.node:"
ls -la "$NODE_ADDON"
