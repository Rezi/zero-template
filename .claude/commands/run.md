# Run zero-music

Start the full zero-music development environment. Run each step in order; later steps depend on earlier ones succeeding.

## Prerequisites

- Docker must be running on the host machine
- `.env` file must exist in the project root
- `gcc`/`g++`/`make` must be available for native binary compilation (one-time):
  ```
  sudo apt-get install -y gcc g++ make
  ```

## Steps

### 1. Build native binaries

```bash
bash -l -c "deno task deno"
```

Rebuilds `@rocicorp/zero-sqlite3`'s platform-specific native addon for the current machine. Must be re-run whenever switching between macOS host and Linux sandbox. The `node-gyp` WARNING about the optional sqlite3 CLI shell target is expected — succeed is confirmed by "Done. better_sqlite3.node:".

### 2. Start the database

```bash
docker compose up -d
```

Starts a PostgreSQL 18 container with WAL logical replication enabled (required by Rocicorp Zero). First run pulls the image and may take a minute.

### 3. Run migrations

```bash
bash -l -c "deno task db:migrate"
```

Applies Drizzle ORM migrations to Postgres. Safe to re-run.

### 4. Generate Panda CSS

```bash
bash -l -c "deno task panda"
```

Scans all source files for `css()` / `cva()` calls and writes the atomic utility CSS to `apps/zero-app/src/panda.css`. This file is imported by `styles.css` and served statically by Vite.

**Why this is a separate step:** The Panda CSS PostCSS plugin relies on the linux-arm64 esbuild binary to load `panda.config.mjs`, but esbuild cannot access files on the FUSE-mounted macOS path in the sandbox. The CLI (`panda cssgen`) uses Node.js's module loader (which can access the path) and avoids this restriction entirely.

For development with style updates: run `deno task panda:watch` in a separate terminal to rebuild `panda.css` whenever components change.

### 5. Start the dev server

```bash
bash -l -c "deno task dev"
```

Starts the Vite/TanStack Start dev server on port 3000 (falls back to the next free port). Watch for `Local: http://localhost:3000/` in the output.

### 6. Start the Zero cache (separate terminal)

```bash
bash -l -c "deno task zero-cache"
```

Starts `zero-cache-dev` — the Rocicorp Zero sync server that proxies between the frontend and Postgres. Requires the dev server (step 5) and Postgres (step 2) to be running first.

## Running all steps (copy-paste)

```bash
# One-time prerequisites
sudo apt-get install -y gcc g++ make

# Terminal 1 — setup + dev server
bash -l -c "deno task deno"
docker compose up -d
bash -l -c "deno task db:migrate"
bash -l -c "deno task panda"      # generate CSS
bash -l -c "deno task dev"        # keep running

# Terminal 2 — Panda CSS watch (rebuilds panda.css on component changes)
bash -l -c "deno task panda:watch"

# Terminal 3 — Zero sync server
bash -l -c "deno task zero-cache"
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `deno: command not found` | Use `bash -l` to load the persistent env, or full path `/home/agent/.deno/bin/deno` |
| `cc: No such file or directory` during step 1 | `sudo apt-get install -y gcc g++ make` |
| `Cannot find module '@zero-app/styled-system/css'` | `mkdir -p node_modules/@zero-app && ln -sf ../../styled-system node_modules/@zero-app/styled-system` |
| Styles not applied (classes in HTML, no CSS rules) | Run `bash -l -c "deno task panda"` to regenerate `panda.css`, then hard-refresh |
| Port 3000 in use | Vite auto-increments; check the "Local:" line for the actual port |
| `db:migrate` fails | Check Postgres: `docker compose ps` and `docker compose logs postgres` |
| `zero-cache` fails | Ensure `.env` has `ZERO_UPSTREAM_DB` and the dev server is running |
