# Panda CSS Recipe Migration Opportunities

Reference pattern: `alert.tsx` + `libs/styles/recipes/alert.recipe.ts` (slot recipe).

---

## High Priority — Slot Recipes (Many Sub-Components with `css()`)

### 1. `field.tsx`
9 sub-components currently using inline `css()` calls.

**Proposed slots:** `set`, `legend`, `group`, `content`, `label`, `title`, `description`, `separator`, `error`

Existing `field.recipe.ts` defines a single-class recipe with orientation variants (`vertical`, `horizontal`, `responsive`). Converting to a slot recipe would keep the orientation logic while giving each sub-component its own typed slot. The orientation variants naturally span all slots via descendant selectors.

---

### 2. `item.tsx`
9 sub-components, currently a mix of two single-class recipes (`item`, `itemMedia`) and several `css()` calls.

**Proposed slots:** `group`, `root`, `media`, `content`, `title`, `description`, `actions`, `header`, `footer`

The `variant` and `size` props on `Item` affect layout across multiple parts (e.g. icon size in `ItemMedia`, spacing in `ItemContent`). A slot recipe would allow these variants to propagate cleanly via descendant selectors without prop drilling.

---

### 3. `empty.tsx`
6 sub-components. `EmptyMedia` already uses a recipe; the rest (`Empty`, `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`) still use `css()`.

**Proposed slots:** `root`, `header`, `media`, `title`, `description`, `content`

The `emptyMedia` recipe variant (`default` vs `icon`) could absorb into this slot recipe, unifying the component into one definition.

---

### 4. `input-group.tsx`
6 sub-components. `InputGroupAddon` and `InputGroupButton` already have recipes; `InputGroup`, `InputGroupText`, `InputGroupInput`, `InputGroupTextarea` use `css()`.

**Proposed slots:** `root`, `text`, `input`, `textarea`

`InputGroupAddon` and `InputGroupButton` have their own size/align variants that may be better kept as standalone recipes rather than pushed into slots, but `root`, `text`, `input`, and `textarea` are good slot candidates.

---

## Medium Priority — Slot Recipes (Moderate Sub-Component Count)

### 5. `navigation-menu.tsx`
9+ sub-components all using `css()`, except `NavigationMenuTrigger` which already has a recipe.

**Proposed slots:** `root`, `list`, `item`, `trigger`, `content`, `positioner`, `popup`, `viewport`, `link`, `indicator`

This is the largest migration. The `navigationMenuTrigger` recipe could be folded into the `trigger` slot. The viewport animation logic and indicator arrow styles are currently scattered across multiple `css()` calls — consolidating into a slot recipe would make the animation states easier to manage.

---

### 6. `tabs.tsx`
`TabsList` already uses a recipe; `Tabs`, `TabsTrigger`, and `TabsContent` use `css()`. `TabsTrigger` has ~50 lines of inline styles.

**Proposed slots:** `root`, `list`, `trigger`, `content`

The `variant` on `TabsList` (`default` vs `line`) changes trigger appearance significantly — a slot recipe would allow the list variant to propagate to `trigger` and `content` via descendant selectors, removing the need to duplicate variant awareness in each sub-component.

---

### 7. `sidebar.tsx`
Partial recipe usage (`sidebarMenuButton`). Many other sidebar parts (`SidebarProvider`, sections, groups, headers, footers) use `css()`.

**Proposed slots:** `provider`, `sidebar`, `header`, `footer`, `content`, `group`, `groupLabel`, `menu`, `menuItem`, `menuButton`, `menuAction`, `menuBadge`, `menuSkeleton`, `separator`, `input`, `inset`

This is the most complex component. A phased approach makes sense: start with the structural parts (`provider`, `sidebar`, `header`, `footer`, `content`) and leave the menu sub-tree as a separate slot recipe (`SidebarMenu*` components).

---

## Low Priority — Recipe Extensions

### 8. `button-group.tsx`
`ButtonGroup` already uses a recipe. `ButtonGroupText` and `ButtonGroupSeparator` still use `css()`.

**Proposed slots:** `root`, `text`, `separator`

The orientation variant on `ButtonGroup` affects text and separator styling — folding them into a slot recipe would make this dependency explicit.

---

## Already Migrated / No Action Needed

- `alert.tsx` — slot recipe (reference example)
- `badge.tsx` — single recipe
- `button.tsx` — single recipe
- `toggle.tsx` — single recipe
