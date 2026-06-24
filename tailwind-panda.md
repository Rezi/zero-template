# Tailwind → Panda CSS: Leftover Audit & Finalization Plan

Audit of `libs/ui-library` (55 components + their `.stories.tsx`) for residual Tailwind
usage after the Panda migration, plus an analysis of the `/`-opacity (transparency)
color handling and a plan to finish the transition.

**TL;DR** — the component *style objects* are migrated cleanly to Panda `css()`. What
remains tied to Tailwind is essentially four things:

1. **Enter/exit animation classes** from `tw-animate-css` (13 components) — the single
   biggest blocker.
2. **Named `group-*/peer-*` Tailwind variants** still written as raw class strings
   (mainly `navigation-menu.tsx` and `calendar.tsx`).
3. **Literal Tailwind layout classes in story files** (6 stories).
4. **The global Tailwind CSS layer** (`apps/zero-app/src/styles.css`) — `@import
   "tailwindcss"`, `tw-animate-css`, `@theme`, `@apply` — plus the runtime deps
   (`tailwindcss`, `tw-animate-css`, `tailwind-merge`).

Everything else flagged by a naive grep (`group`/`peer` markers, `role="group"`,
sonner's `toaster`/`cn-toast`) is **not** a Tailwind dependency — see §5.

---

## 1. Animation classes from `tw-animate-css` (highest priority)

These are Tailwind/`tw-animate-css` utility strings passed as `className` (usually as a
sibling of a Panda `css()` result inside `cn(...)`). They depend on both
`@import "tailwindcss"` and `@import "tw-animate-css"` being active. Panda currently has
**no** keyframes/animation tokens defined (`grep` of `panda.config.mjs` → none), so these
cannot be dropped until equivalents are added to Panda.

Tokens involved: `data-open:animate-in`, `data-closed:animate-out`, `fade-in-0`,
`fade-out-0`, `zoom-in-95`, `zoom-out-95`, `slide-in-from-{top,bottom,left,right}-2`,
`slide-out-to-*`, `animate-accordion-down`, `animate-accordion-up`,
`animate-caret-blink`, `duration-100/300/1000`.

| Component | Location (approx) | Notes |
|---|---|---|
| `accordion.tsx` | :123 | `data-open:animate-accordion-down data-closed:animate-accordion-up` |
| `alert-dialog.tsx` | :111, :113 | overlay + content fade/zoom |
| `combobox.tsx` | :51 | popover slide/fade/zoom |
| `context-menu.tsx` | :35 | popover slide/fade/zoom |
| `dialog.tsx` | :73, :75 | overlay + content |
| `drawer.tsx` | :21 | fade |
| `dropdown-menu.tsx` | :33 | slide/fade/zoom (+ `data-closed:overflow-hidden`) |
| `hover-card.tsx` | :31 | slide/fade/zoom |
| `input-otp.tsx` | :119 | `animate-caret-blink duration-1000` |
| `navigation-menu.tsx` | :153, :299 | motion slide + viewport block (see §2) |
| `popover.tsx` | :33 | slide/fade/zoom |
| `select.tsx` | :76 | slide/fade/zoom (+ `data-[align-trigger=true]:animate-none`) |
| `tooltip.tsx` | :33 | slide/fade/zoom |

**13 files.** All follow the same shadcn enter/exit pattern, so a single set of Panda
keyframes + an `animation`-style utility can cover ~12 of them; `accordion` and
`input-otp` need their own keyframes (`accordion-down/up`, `caret-blink`).

---

## 2. Named `group-*` / `peer-*` Tailwind variants (raw strings)

The migration already converted *most* group/peer relationships into Panda selectors
(e.g. `label.tsx`: `".peer:disabled ~ &"`, `".group[data-disabled='true'] &"`). What
remains as raw Tailwind variant strings:

- **`navigation-menu.tsx`**
  - `:127` — `transition duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180`
  - `:153` — the large `group-data-[viewport=false]/navigation-menu:*` block (rounded, bg-popover, text-popover-foreground, shadow-lg, ring-1, `ring-foreground/5`, `dark:ring-foreground/10`, plus nested animate/fade/zoom). This is the most complex single string in the library.
- **`calendar.tsx`**
  - `:337` — `group-data-[focused=true]/day:relative … group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50`

The *marker* side of these (`"group/navigation-menu"`, `"group/day"`,
`"group/calendar"`, `"group/toggle"`, `"group/menu-item"`, `"group/radio-group-item"`,
`"group/native-select"`) is just a plain class name and is fine to keep — Panda selectors
can target `.group\/day` etc. Only the **consuming variant strings above** are true
Tailwind and need rewriting as Panda nested selectors.

---

## 3. Literal Tailwind classes in story files

Layout/util classes hard-coded in stories (cosmetic wrappers, not component styles):

| Story | Classes |
|---|---|
| `direction.stories.tsx` | `flex items-center gap-2 rounded-md border p-4`; `space-y-4`; `mb-1 text-sm text-muted-foreground` (×2) |
| `card.stories.tsx` | `w-80`; `w-72`; `text-muted-foreground`; `justify-end gap-2 border-t` |
| `button.stories.tsx` | `flex flex-wrap items-center gap-3` (×3) |
| `badge.stories.tsx` | `flex flex-wrap items-center gap-3` |
| `alert.stories.tsx` | `max-w-md` (×3) |
| `tabs.stories.tsx` | `w-80` (×2), `w-96` |

These are trivially replaced with `css({...})` (e.g. `flex flex-wrap items-center gap-3`
→ `css({ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "3" })`).

---

## 4. Global Tailwind layer & dependencies

**`apps/zero-app/src/styles.css`** (also imported by Storybook's `preview.tsx`):

- `@import "tailwindcss";` — the Tailwind engine.
- `@import "tw-animate-css";` — keyframes for §1.
- `@import "shadcn/tailwind.css";` — shadcn base.
- `@source "../../../libs/ui-library/src";` / `@source ".../zero-app-components/src"` — Tailwind content scanning.
- `@custom-variant dark (&:is(.dark *));` — Tailwind dark variant.
- `@theme inline { --color-*, --radius-*, --font-sans }` — **duplicates** the token
  mapping already mirrored in `panda.config.mjs` `semanticTokens`. The `:root` / `.dark`
  CSS variable definitions below it are the source of truth and must be **kept** (Panda
  tokens reference them via `var(--…)`).
- `@layer base { * { @apply border-border outline-ring/50; } body { @apply bg-background text-foreground; } }` — Tailwind `@apply`; needs to move to Panda `globalCss`.

**`@tailwindcss/vite`** is also wired into Storybook (`.storybook/main.ts:14-16`) and the
app's Vite config.

**Runtime deps (`package.json`):** `tailwindcss ^4.1.18`, `tw-animate-css ^1.4.0`,
`tailwind-merge ^3.6.0`. `clsx ^2.1.1` is fine to keep.

**`cn()` (`lib/utils.ts`)** = `twMerge(clsx(inputs))`. `twMerge` is meaningful only while
Tailwind classes coexist with Panda output; once Tailwind is gone it does nothing useful
for Panda's atomic classes (and could in theory mis-merge them). Plan to swap to plain
`clsx` or Panda's `cx` at the end (see Phase 5).

---

## 5. NOT Tailwind leftovers (false positives — leave alone)

- `"group"`, `"peer"`, `"group/<name>"` **bare markers** — plain class names targeted by
  Panda selectors. No Tailwind needed.
- `sonner.tsx`: `className="toaster group"` and `toast: "cn-toast"` — sonner's own marker
  classes referenced by sonner's CSS / app overrides, **not** Tailwind.
- `role="group"`, `data-sidebar="group"`, `data-slot="…"` — HTML attributes, not classes.
- All the `display: "flex"`, `position: "relative"`, `inline-flex`, `flex-start`, etc.
  hits are **Panda `css()` property values**, already migrated.

---

## 6. Transparency colors (`/<opacity>`) — analysis & abstraction

### What actually needs special handling

There are ~70 `"<token>/<number>"` opacity usages across the library (`bg: "input/50"`,
`color: "foreground/60"`, `bg: "black/30"`, `borderColor: "destructive/50"`,
`stroke: "border/50"`, `bg: "muted.foreground/10"`, `bg: "sidebar.foreground/70"`, …).

**Panda handles the `/<opacity>` modifier natively for all *built-in* color utilities.**
Verified in the generated CSS (`styled-system/styles.css`):

```
--mix-background: color-mix(in srgb, var(--colors-input) 50%, transparent);
--mix-color:      color-mix(in srgb, var(--colors-foreground) 60%, transparent);
--mix-borderColor:color-mix(in srgb, var(--colors-red-500) 40%, transparent);
```

So `bg`, `color`, `borderColor`, `stroke`, `fill`, `outlineColor`, … all work with **zero
custom code**. No action needed for any of these.

### Why `ringC` is special

`ringC` is a **custom** utility (`values: "colors"`). Panda does **not** apply the
`/<opacity>` modifier to custom-utility values — it passes the raw string (`"ring/30"`)
straight through. That is the *only* reason `panda.config.mjs` reproduces `color-mix` by
hand in `ringC.transform`. It is the **single** custom color utility in the project, so
the pattern is not yet reused anywhere.

### Inconsistency to resolve

- Panda's native modifier emits `color-mix(in srgb, …)`.
- `ringC` emits `color-mix(in oklab, …)`.

These blend slightly differently. For a coherent design system, pick one color space.
(Panda's default is `srgb`; the original Tailwind ring used `oklab`.) Recommendation:
align `ringC` to `srgb` to match every other opacity color in the app — unless the
oklab ring blend is intentional, in which case add a one-line note.

### Proposed abstraction

Even though only `ringC` needs it today, the slash-parsing logic should be extracted so
any future custom color utility can reuse it (and so the color space is defined once):

```js
// panda.config.mjs
// Reproduces Panda's native `/<opacity>` color modifier for *custom* color utilities
// (Panda only auto-applies it to built-in color utilities). `srgb` matches the color
// space Panda uses for built-in utilities so custom + built-in opacities blend identically.
function colorWithAlpha(value, colorSpace = "srgb") {
  if (typeof value !== "string") return value;
  const slash = value.indexOf("/");
  if (slash === -1) return value; // bare token or raw value — caller resolves
  const token = value.slice(0, slash).replace(/\./g, "-");
  const pct = value.slice(slash + 1);
  return `color-mix(in ${colorSpace}, var(--colors-${token}) ${pct}%, transparent)`;
}
```

Then `ringC.transform` collapses to:

```js
ringC: {
  className: "ring-c",
  values: "colors",
  transform(value) {
    const slash = typeof value === "string" ? value.indexOf("/") : -1;
    return {
      "--ring-shadow-color":
        slash !== -1 ? colorWithAlpha(value) : value,
    };
  },
},
```

This keeps the behavior, removes the inline duplication, fixes the srgb/oklab mismatch,
and gives a single reusable helper for any future custom utility (e.g. a custom shadow or
gradient-stop color).

---

## 7. Finalization plan

Ordered so the app stays working after every phase. Storybook + the app both pull
`apps/zero-app/src/styles.css`, so Tailwind can only be removed once **all** of §1–§3 are
migrated.

### Phase 0 — Panda animation foundation (unblocks §1)
- Add `theme.extend.keyframes` to `panda.config.mjs`: `enter`/`exit` (fade+zoom+slide via
  CSS vars, mirroring `tw-animate-css`/shadcn), `accordion-down`, `accordion-up`,
  `caret-blink`.
- Add a small set of helper styles/recipe (or a `data-open`/`data-closed` utility) that
  apply those keyframes, so component call-sites stay terse.
- Verify in Storybook against the existing `tw-animate-css` output before removing it.

### Phase 1 — Migrate the 13 animation components (§1)
- Replace each animation class string with the Phase-0 Panda equivalent, expressed in the
  component's existing `css()` object via `data-open`/`data-closed`/`data-[side=…]`
  selectors (the components already use these data attributes).
- Do `accordion` and `input-otp` (caret) individually.

### Phase 2 — Migrate named group/peer variants (§2)
- Rewrite `navigation-menu.tsx` `:127`/`:153` and `calendar.tsx` `:337` as Panda nested
  selectors (`.group\/navigation-menu[data-viewport='false'] &`, etc.). Fold the
  `ring-*`/`ring-foreground/5` bits into `ringW`/`ringC` + native opacity.

### Phase 3 — Migrate story literals (§3)
- Replace the literal classes in the 6 stories with `css({...})` wrappers.

### Phase 4 — Move the global layer into Panda
- Recreate `* { borderColor; outlineColor }` and `body { bg; color }` via Panda
  `globalCss` in `panda.config.mjs`.
- Confirm `@theme inline` is fully redundant with `semanticTokens` (it is) and drop it;
  **keep** the `:root` / `.dark` CSS-variable blocks (Panda tokens depend on them).
- Apply the §6 `colorWithAlpha` refactor + resolve srgb/oklab.

### Phase 5 — Remove Tailwind
- Delete `@import "tailwindcss"`, `tw-animate-css`, `shadcn/tailwind.css`, `@source`,
  `@custom-variant dark` from `styles.css`. (Dark mode is already handled by `.dark` CSS
  vars; no Panda `_dark` condition needed for tokens.)
- Remove `@tailwindcss/vite` from `.storybook/main.ts` and the app Vite config.
- Drop `tailwindcss`, `tw-animate-css`, `tailwind-merge` from `package.json`.
- Replace `cn()` internals: `twMerge(clsx(...))` → `clsx(...)` (or Panda `cx`). Keep the
  `cn` name so call-sites are untouched. Validate that later args still override earlier
  ones acceptably for the few places that rely on it.
- Enable Panda `preflight: true` (currently `false` to avoid double reset) and re-check
  the app + Storybook for reset regressions.

### Phase 6 — Verify
- `deno task panda` (regenerate styled-system), typecheck, run Storybook, visually diff
  the animated components (dialogs, popovers, accordion, OTP caret, nav-menu, calendar)
  and the 6 edited stories.
- Grep gate (should return nothing in `libs/ui-library/src` except sonner markers):
  `grep -rnE '(animate-in|animate-out|fade-in|zoom-in|slide-in-from|animate-accordion|animate-caret|group-data|peer-data|@apply|@tailwind)' libs/ui-library/src`

### Effort snapshot
| Phase | Scope | Risk |
|---|---|---|
| 0 | config keyframes | low (additive) |
| 1 | 13 components | medium (visual parity) |
| 2 | 2 components | medium (complex selectors) |
| 3 | 6 stories | low |
| 4 | global css + config | medium |
| 5 | deps/build/`cn` | medium (build + reset) |
| 6 | verification | — |
