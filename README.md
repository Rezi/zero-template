# zero-app

A real-time zero-app app built as an **Nx monorepo**. The stack:

- **[Nx](https://nx.dev)** — monorepo task runner & module-boundary enforcement (`project.json`-style targets)
- **[TanStack Start](https://tanstack.com/start)** + **[TanStack Router](https://tanstack.com/router)** — full-stack React framework (SSR + file-based routing + API routes)
- **[Rocicorp Zero](https://zero.rocicorp.dev/)** — sync engine / local-first queries & mutators
- **[better-auth](https://www.better-auth.com/)** — authentication (email/password + GitHub OAuth)
- **[Drizzle ORM](https://orm.drizzle.team/)** + **PostgreSQL** — schema & migrations
- **[Vite](https://vite.dev/)** — build
- \*\*[Panda CSS](https://panda-css.com/) styling
- **[Vitest](https://vitest.dev/)** + **[Playwright](https://playwright.dev/)** — unit & e2e tests

> **Package manager & task runner: [Deno](https://deno.com/)** (≥ 2.x). Dependencies are declared in `package.json` and resolved by Deno into a real `node_modules` directory (`"nodeModulesDir": "auto"` in `deno.json`); the lockfile is `deno.lock`. Tasks live in `deno.json` and are run with `deno task <name>`. Do **not** use `npm`/`pnpm install` — that would create a competing lockfile and `node_modules` layout.

---

## Getting started

```bash
# install Deno (https://deno.com/) if you don't have it, then install deps and
# build the platform-specific native binaries (see "native binaries" note below):
deno task deno

# create .env with the variables listed in the "Environment" section below
# (.env is git-ignored — it holds local secrets)

# start the Postgres dev database
docker compose up -d

# run migrations + start the app
deno task db:migrate
deno task dev            # → http://localhost:3000
```

In a separate terminal, run the Zero cache server:

```bash
deno task zero-cache
```

> **Tip — interactive dev dashboard:** `deno task wiz` opens a [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) wizard that launches and supervises the common dev flows from one menu: dev server, Zero cache, per-project targets, builds/tests/lint, e2e, Docker (Postgres), Drizzle migrations and the native rebuild. Jobs run in the background so you can have several going at once (e.g. dev server + zero-cache + a build); their output is captured to `.wiz/logs/` and viewable from the menu. Exiting stops the jobs it started.

> **Note on native binaries & build scripts:** a few dependencies run install/build scripts and ship platform-specific binaries (`@rocicorp/zero-sqlite3` compiles SQLite via node-gyp; `esbuild`, `lightningcss`, `nx`, `protobufjs`). Deno does **not** run those scripts unless you allow them, and `@rocicorp/zero-sqlite3` additionally needs a generated header that isn't in its npm tarball — so a plain `deno install` is not enough. **`deno task deno`** (→ `scripts/rebuild-deno-native.sh`) handles all of this: it reinstalls deps with the right `--allow-scripts`, generates the missing header, and compiles `better_sqlite3.node` for the current OS/arch. It needs a C toolchain and `node-gyp` on PATH (`npm install -g node-gyp`; macOS also needs the Xcode CLI tools — `xcode-select --install`).
>
> Run `deno task deno` **on the machine you develop on**, and re-run it whenever you switch machines — `node_modules` holds only one platform's binaries at a time. Symptoms that you're on the wrong build: `dlopen … slice is not valid mach-o file` / `invalid ELF header` (zero-sqlite3), `WorkspaceContext is not a constructor` (Nx), or a bundler crash. The fix is always the same: re-run `deno task deno`.

---

## Workspace layout

```
zero-app/
├─ apps/
│  ├─ zero-app/        TanStack Start application (the deployable app)
│  └─ zero-app-e2e/    Playwright end-to-end tests
├─ libs/
│  ├─ zero-app-components/  app-specific React components (FE)
│  ├─ ui-library/           design-system foundation / guidelines — empty for now (FE)
│  ├─ auth/                 authentication                (MIXED: client + /server)
│  ├─ db/                   Drizzle connection & schema    (BE)
│  └─ zero/                 Zero schema/queries/mutators  (MIXED: client + /server)
├─ deno.json             Deno tasks + node_modules / lockfile config
├─ nx.json               Nx config (targetDefaults, named inputs)
├─ tsconfig.base.json    TypeScript path aliases (@zero-app/*)
└─ eslint.config.mjs     Flat ESLint config incl. @nx/enforce-module-boundaries
```

Each project owns a `project.json` (explicit targets) and a thin `eslint.config.mjs` that extends the root config. Libraries are consumed through TypeScript path aliases (no build step required for local development):

| Alias                           | Resolves to                                    |
| ------------------------------- | ---------------------------------------------- |
| `@zero-app/zero-app-components` | `libs/zero-app-components/src/index.ts`        |
| `@zero-app/ui-library`          | `libs/ui-library/src/index.ts` (empty for now) |
| `@zero-app/auth`                | `libs/auth/src/index.ts` (client)              |
| `@zero-app/auth/server`         | `libs/auth/src/server.ts` (**server-only**)    |
| `@zero-app/db`                  | `libs/db/src/index.ts` (**server-only**)       |
| `@zero-app/zero`                | `libs/zero/src/index.ts` (client-safe)         |
| `@zero-app/zero/server`         | `libs/zero/src/server.ts` (**server-only**)    |

---

## Architecture & dependency graph

```
              zero-app-e2e
                    │ (implicit)
                    ▼
               zero-app ─────────────────────┐
              (TanStack app)                   │
               │            │                  │
               ▼            ▼                  ▼
       zero-app-components  zero              auth
               │   └──────────┐               │
               ▼              ▼               ▼
             auth           (leaf)            db
               │                            (leaf)
               ▼
              db

       ui-library  (isolated — no deps, no dependents yet)
```

- **`zero-app`** (app) composes everything: renders `zero-app-components`, runs Zero queries/mutators, and exposes server API routes (`/api/query`, `/api/mutate`, `/api/auth/$`) that use the **server** entries of `auth` and `zero`.
- **`zero-app-components`** holds the app's React components (`Header`, `SiteLayout`, `LoginButton`, `ThemeToggle`, `ZeroInit`) and depends on `auth` (client) and `zero` (client-safe).
- **`ui-library`** is the presentational **design-system foundation / guidelines** library. It is currently empty and has no dependencies or dependents — reserved for generic, dependency-free building blocks to be added later.
- **`auth`** depends on `db` (the better-auth server instance is wired to the Drizzle connection).
- **`db`** and **`zero`** are leaves (no dependencies on other workspace libs).

There are **no circular dependencies**. The better-auth table definitions live in `db` (not `auth`) specifically so `db` can stay a leaf and `auth → db` is one-directional.

Inspect it yourself:

```bash
deno task graph                      # interactive graph in the browser
deno task nx graph --file=graph.json
```

---

## Module boundaries

Boundaries are enforced by the `@nx/enforce-module-boundaries` ESLint rule (see `eslint.config.mjs`). Every project is tagged, and a project may only depend on projects whose tags are allowed.

| Project               | Tags                              |
| --------------------- | --------------------------------- |
| `zero-app`            | `type:app`, `scope:zero-app`      |
| `zero-app-e2e`        | `type:e2e`                        |
| `zero-app-components` | `type:ui`, `scope:app-components` |
| `ui-library`          | `type:ui`, `scope:ui`             |
| `auth`                | `type:data-access`, `scope:auth`  |
| `db`                  | `type:data-access`, `scope:db`    |
| `zero`                | `type:data-access`, `scope:zero`  |

**Allowed dependencies (`onlyDependOnLibsWithTags`):**

| Source tag             | May depend on                                   |
| ---------------------- | ----------------------------------------------- |
| `type:app`             | `type:ui`, `type:data-access`                   |
| `type:e2e`             | `type:app`                                      |
| `scope:app-components` | `scope:ui`, `scope:auth`, `scope:zero`          |
| `scope:ui`             | `scope:ui` _(pure foundation — no data-access)_ |
| `scope:auth`           | `scope:db`                                      |
| `scope:db`             | _(nothing — leaf)_                              |
| `scope:zero`           | _(nothing — leaf)_                              |

Two things this encodes:

- The `scope:db` / `scope:zero` "leaf" rules structurally **prevent cycles** (e.g. `db` can never import `auth`).
- `scope:ui` (the `ui-library` foundation) may **only** depend on other `scope:ui` libraries — it can never reach into `auth`/`db`/`zero`. App components that _do_ need data live in `scope:app-components`, which is allowed to build on the `scope:ui` foundation **and** consume the data-access libs.

A violation fails `lint`, e.g. importing `@zero-app/zero` from `ui-library`:

> `A project tagged with "scope:ui" can only depend on libs tagged with "scope:ui"`

---

## BE / FE / Mixed classification

> ⚠️ **Read this before adding cross-library imports.** Module boundaries (tags) control _which project_ may depend on which — they do **not** distinguish a library's client entry from its server entry. Keeping server-only code out of the browser is enforced by **separate entry points + the rules below**, not by tags.

### `zero-app-components` — **Frontend (FE)**

The app's browser React components (`Header`, `SiteLayout`, `LoginButton`, `ThemeToggle`, `ZeroInit`). These are wired to the client-safe auth and zero APIs (`@zero-app/auth`, `@zero-app/zero`). Safe to import anywhere on the client. Must never import a `/server` entry or `@zero-app/db`.

### `ui-library` — **Frontend (FE), foundation**

The presentational **design-system / guidelines** library. **Currently empty** (its only export is `export {}`). It is reserved for generic, dependency-free building blocks and usage guidelines. Per the boundary rules it may only depend on other `scope:ui` libraries — never on `auth`/`db`/`zero` — so it stays a pure, reusable foundation.

### `db` — **Backend (BE) only**

The Drizzle/Postgres connection and the full schema (app tables + better-auth tables).

- `libs/db/src/lib/db.ts` reads **`ZERO_UPSTREAM_DB`** (the database connection string — a secret) and opens a live Postgres connection at import time.
- **Never** import `@zero-app/db` from FE code. It is consumed only by `auth` (server) and the app's server routes.

### `auth` — **Mixed (client + server)**

Two distinct entry points:

| Entry                   | Side        | Contents                                                                                                          | Sensitive? |
| ----------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- | ---------- |
| `@zero-app/auth`        | **FE-safe** | `authClient` + `loginWithGithub` / `loginWithEmail` / `signUpWithEmail` / `logout` (better-auth **React** client) | No         |
| `@zero-app/auth/server` | **BE only** | the better-auth **server instance** (`auth`)                                                                      | **YES**    |

`libs/auth/src/lib/auth.ts` (behind `/server`) reads **`GITHUB_CLIENT_ID`**, **`GITHUB_CLIENT_SECRET`**, **`BETTER_AUTH_SECRET`**, **`COOKIE_DOMAIN`** and wires better-auth to the database via `@zero-app/db`.
🔒 **`@zero-app/auth/server` must never be imported from the browser.** Doing so would bundle OAuth secrets, the auth signing secret, and the DB connection into client JS.

### `zero` — **Mixed (client + server)**

Two distinct entry points:

| Entry                   | Side                     | Contents                                        | Sensitive? |
| ----------------------- | ------------------------ | ----------------------------------------------- | ---------- |
| `@zero-app/zero`        | **FE-safe / isomorphic** | `schema`, `queries`, `mutators`, `Context` type | No         |
| `@zero-app/zero/server` | **BE only**              | `dbProvider` (Zero ↔ Postgres adapter)          | **YES**    |

`libs/zero/src/lib/db-provider.ts` (behind `/server`) reads **`ZERO_UPSTREAM_DB`** and opens a `pg` connection `Pool`.
🔒 **`@zero-app/zero/server` must never be imported from the browser.** It pulls in `pg` (Node-only — crashes the browser with `Buffer is not defined`) and the DB connection string.

### Rule of thumb for "Mixed" libraries

- **FE / shared code** → the bare alias (`@zero-app/auth`, `@zero-app/zero`).
- **Anything that touches a connection, a secret, `process.env.*` (except `VITE_PUBLIC_*`), `pg`, `drizzle`, or the better-auth server** → the `/server` alias, imported **only** from app server route handlers (`apps/zero-app/src/routes/api/**`) or other BE libraries.
- The client barrels (`src/index.ts`) deliberately do **not** re-export the server modules, so a normal client import cannot reach them.

> **Optional hardening:** add a `no-restricted-imports` ESLint override for FE projects (`zero-app-components`, `ui-library`, client routes) that forbids `@zero-app/*/server` and `@zero-app/db`, turning the convention above into a hard, lint-enforced rule.

---

## Environment variables

Defined in `.env` (git-ignored for real values). **Only `VITE_PUBLIC_*` variables are exposed to the browser** by Vite — everything else is server-only.

| Variable                      | Scope     | Notes                                                       |
| ----------------------------- | --------- | ----------------------------------------------------------- |
| `ZERO_UPSTREAM_DB`            | 🔒 server | Postgres connection string (used by `db` and `zero/server`) |
| `BETTER_AUTH_SECRET`          | 🔒 server | better-auth signing secret                                  |
| `BETTER_AUTH_URL`             | server    | Public base URL of the app                                  |
| `GITHUB_CLIENT_ID`            | 🔒 server | GitHub OAuth                                                |
| `GITHUB_CLIENT_SECRET`        | 🔒 server | GitHub OAuth                                                |
| `COOKIE_DOMAIN`               | server    | Cross-subdomain cookies in prod                             |
| `ZERO_QUERY_FORWARD_COOKIES`  | server    | Forward cookies to `/api/query`                             |
| `ZERO_MUTATE_FORWARD_COOKIES` | server    | Forward cookies to `/api/mutate`                            |
| `VITE_PUBLIC_ZERO_CACHE_URL`  | 🌐 client | Zero cache URL exposed to the browser                       |

🔒 = secret; never reference these from FE code or behind a `VITE_PUBLIC_` name.

---

## Nx commands

Nx is invoked through Deno. `deno task nx` is a passthrough that forwards all arguments to the Nx CLI.

Run a single target on a single project — `deno task nx <target> <project>`:

```bash
deno task nx serve zero-app      # dev server (http://localhost:3000)
deno task nx build zero-app      # production build (also builds lib deps first)
deno task nx preview zero-app    # preview a production build
deno task nx lint ui-library     # lint one library
deno task nx build db            # type-check one library (libs "build" = tsc --noEmit)
deno task nx e2e zero-app-e2e    # Playwright e2e (boots the app via webServer)
```

Run a target across the whole workspace — `deno task nx run-many`:

```bash
deno task nx run-many --target=lint    # lint everything
deno task nx run-many --target=build   # build the app + type-check all libs
deno task nx run-many --target=test    # all unit tests
```

Only what changed since `main`:

```bash
deno task nx affected --target=lint
deno task nx affected --target=build
```

Other useful commands:

```bash
deno task graph                       # visualize the dependency graph
deno task nx show project zero-app    # inspect a project's targets/tags
deno task nx reset                    # clear the Nx cache (and daemon)
```

### Targets per project

| Project                                                       |       `build`       | `serve` | `preview` |   `test`    | `lint` |      `e2e`      |
| ------------------------------------------------------------- | :-----------------: | :-----: | :-------: | :---------: | :----: | :-------------: |
| `zero-app`                                                    |   ✅ `vite build`   |   ✅    |    ✅     | ✅ `vitest` |   ✅   |        —        |
| `zero-app-e2e`                                                |          —          |    —    |     —     |      —      |   ✅   | ✅ `playwright` |
| `zero-app-components` / `ui-library` / `auth` / `db` / `zero` | ✅ `tsc` type-check |    —    |     —     |      —      |   ✅   |        —        |

> Libraries are consumed via TS path aliases, so their `build` target is a `tsc --noEmit` type-check rather than an emit step. `deno task build` automatically type-checks the libraries it depends on first (`dependsOn: ["^build"]`).

### Deno tasks (thin wrappers)

Defined in `deno.json`, run with `deno task <name>`:

| Task                                               | Runs                                                                                                                   |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `deno task dev`                                    | `nx serve zero-app`                                                                                                    |
| `deno task build`                                  | `nx build zero-app`                                                                                                    |
| `deno task preview`                                | `nx preview zero-app`                                                                                                  |
| `deno task test`                                   | `nx run-many --target=test`                                                                                            |
| `deno task lint`                                   | `nx run-many --target=lint`                                                                                            |
| `deno task e2e`                                    | `nx e2e zero-app-e2e`                                                                                                  |
| `deno task graph`                                  | `nx graph`                                                                                                             |
| `deno task nx …`                                   | passthrough to the Nx CLI (any target/project)                                                                         |
| `deno task wiz`                                    | interactive dev dashboard — launch/supervise dev server, zero-cache, builds, tests, Docker, etc. (`scripts/wizard.ts`) |
| `deno task deno`                                   | reinstall deps + (re)build native binaries for the current OS/arch (`scripts/rebuild-deno-native.sh`)                  |
| `deno task zero-cache`                             | starts the Zero cache dev server                                                                                       |
| `deno task db:generate` / `db:migrate` / `db:push` | Drizzle Kit (config in `libs/db/`)                                                                                     |
| `deno task generate-zero-schema`                   | regenerate `libs/zero/src/lib/schema.ts` from the Drizzle schema                                                       |

---

## Database & Zero schema

Drizzle config lives in `libs/db/` and the schema in `libs/db/src/lib/schema.ts` (which also re-exports the better-auth tables from `auth-schema.ts`).

```bash
deno task db:generate           # generate a migration from schema changes
deno task db:migrate            # apply migrations
deno task db:push               # push schema directly (dev only)
deno task generate-zero-schema  # regenerate the Zero schema from Drizzle
```

The Zero schema (`libs/zero/src/lib/schema.ts`) is **generated** by `drizzle-zero` from the Drizzle schema — do not edit it by hand.

---

## Adding code

- **A route** → add a file under `apps/zero-app/src/routes/`. TanStack Router regenerates `routeTree.gen.ts` automatically.
- **A server API route** → use the `server.handlers` property (see `routes/api/*.ts`) and import BE code from the `/server` aliases.
- **An app component** → add it to `libs/zero-app-components/src/lib/` and export it from `libs/zero-app-components/src/index.ts`. Generic, dependency-free building blocks belong in `libs/ui-library/` instead.
- **A new library** → `deno task nx g @nx/js:lib libs/<name>`, then add `tags` to its `project.json` and a path alias in `tsconfig.base.json`. Update boundary rules in `eslint.config.mjs` if the new tag needs dependency permissions.

Before pushing, make sure the workspace is green:

```bash
deno task nx run-many --target=lint
deno task nx run-many --target=build
```
