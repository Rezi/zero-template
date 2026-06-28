// Central registry of config recipes for the design system.
//
// `panda.config.mjs` spreads `recipes` into `theme.extend.recipes`. Each KEY here
// becomes the generated function + types in `@zero-app/styled-system/recipes`
// (e.g. `button` -> `button()` + `ButtonVariantProps`), which the ui-library
// components consume. Definitions live here (not in the components) so the config
// can reference them without `libs/styles` depending on `libs/ui-library`, which
// would be circular (ui-library imports the generated `@zero-app/styled-system`).
import { alertRecipe } from "./alert.recipe";
import { badgeRecipe } from "./badge.recipe";
import { buttonRecipe } from "./button.recipe";
import { buttonGroupRecipe } from "./button-group.recipe";
import { emptyRecipe } from "./empty.recipe";
import { fieldRecipe } from "./field.recipe";
import { inputGroupRecipe, inputGroupAddonRecipe, inputGroupButtonRecipe } from "./input-group.recipe";
import { itemRecipe } from "./item.recipe";
import { navigationMenuRecipe } from "./navigation-menu.recipe";
import { sidebarRecipe } from "./sidebar.recipe";
import { tabsRecipe } from "./tabs.recipe";
import { toggleRecipe } from "./toggle.recipe";

// Standard (single-class) recipes -> registered under `theme.extend.recipes`.
export const recipes = {
  badge: badgeRecipe,
  button: buttonRecipe,
  inputGroupAddon: inputGroupAddonRecipe,
  inputGroupButton: inputGroupButtonRecipe,
  toggle: toggleRecipe,
};

// Multi-part (slot) recipes -> registered under `theme.extend.slotRecipes`.
// The generated function returns a `{ slot: className }` map instead of a string.
export const slotRecipes = {
  alert: alertRecipe,
  buttonGroup: buttonGroupRecipe,
  empty: emptyRecipe,
  field: fieldRecipe,
  inputGroup: inputGroupRecipe,
  item: itemRecipe,
  navigationMenu: navigationMenuRecipe,
  sidebar: sidebarRecipe,
  tabs: tabsRecipe,
};
