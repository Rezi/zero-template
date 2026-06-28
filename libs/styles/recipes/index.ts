// Central registry of config recipes for the design system.
//
// `panda.config.mjs` spreads `recipes` into `theme.extend.recipes`. Each KEY here
// becomes the generated function + types in `@zero-app/styled-system/recipes`
// (e.g. `button` -> `button()` + `ButtonVariantProps`), which the ui-library
// components consume. Definitions live here (not in the components) so the config
// can reference them without `libs/styles` depending on `libs/ui-library`, which
// would be circular (ui-library imports the generated `@zero-app/styled-system`).
import { accordionRecipe } from "./accordion.recipe";
import { alertRecipe } from "./alert.recipe";
import { breadcrumbRecipe } from "./breadcrumb.recipe";
import { alertDialogRecipe } from "./alert-dialog.recipe";
import { avatarRecipe } from "./avatar.recipe";
import { badgeRecipe } from "./badge.recipe";
import { buttonRecipe } from "./button.recipe";
import { buttonGroupRecipe } from "./button-group.recipe";
import { calendarRecipe } from "./calendar.recipe";
import { cardRecipe } from "./card.recipe";
import { carouselRecipe } from "./carousel.recipe";
import { checkboxRecipe } from "./checkbox.recipe";
import { chartRecipe } from "./chart.recipe";
import { comboboxRecipe } from "./combobox.recipe";
import { commandRecipe } from "./command.recipe";
import { contextMenuRecipe } from "./context-menu.recipe";
import { dialogRecipe } from "./dialog.recipe";
import { dropdownMenuRecipe } from "./dropdown-menu.recipe";
import { emptyRecipe } from "./empty.recipe";
import { fieldRecipe } from "./field.recipe";
import { hoverCardRecipe } from "./hover-card.recipe";
import { inputGroupRecipe, inputGroupAddonRecipe, inputGroupButtonRecipe } from "./input-group.recipe";
import { itemRecipe } from "./item.recipe";
import { navigationMenuRecipe } from "./navigation-menu.recipe";
import { sidebarRecipe } from "./sidebar.recipe";
import { tabsRecipe } from "./tabs.recipe";
import { toggleRecipe } from "./toggle.recipe";
import { toggleGroupRecipe } from "./toggle-group.recipe";
import { drawerRecipe } from "./drawer.recipe";
import { inputOtpRecipe } from "./input-otp.recipe";
import { kbdRecipe } from "./kbd.recipe";
import { menubarRecipe } from "./menubar.recipe";
import { nativeSelectRecipe } from "./native-select.recipe";
import { progressRecipe } from "./progress.recipe";
import { popoverRecipe } from "./popover.recipe";
import { resizableRecipe } from "./resizable.recipe";
import { scrollAreaRecipe } from "./scroll-area.recipe";
import { sonnerRecipe } from "./sonner.recipe";
import { radioGroupRecipe } from "./radio-group.recipe";
import { sliderRecipe } from "./slider.recipe";
import { switchRecipe } from "./switch.recipe";
import { selectRecipe } from "./select.recipe";
import { sheetRecipe } from "./sheet.recipe";
import { tableRecipe } from "./table.recipe";
import { paginationRecipe } from "./pagination.recipe";
import { tooltipRecipe } from "./tooltip.recipe";

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
  accordion: accordionRecipe,
  calendar: calendarRecipe,
  alert: alertRecipe,
  alertDialog: alertDialogRecipe,
  combobox: comboboxRecipe,
  breadcrumb: breadcrumbRecipe,
  avatar: avatarRecipe,
  card: cardRecipe,
  carousel: carouselRecipe,
  chart: chartRecipe,
  checkbox: checkboxRecipe,
  command: commandRecipe,
  contextMenu: contextMenuRecipe,
  dialog: dialogRecipe,
  dropdownMenu: dropdownMenuRecipe,
  buttonGroup: buttonGroupRecipe,
  empty: emptyRecipe,
  field: fieldRecipe,
  hoverCard: hoverCardRecipe,
  inputGroup: inputGroupRecipe,
  item: itemRecipe,
  navigationMenu: navigationMenuRecipe,
  sidebar: sidebarRecipe,
  tabs: tabsRecipe,
  drawer: drawerRecipe,
  inputOtp: inputOtpRecipe,
  kbd: kbdRecipe,
  menubar: menubarRecipe,
  nativeSelect: nativeSelectRecipe,
  progress: progressRecipe,
  popover: popoverRecipe,
  resizable: resizableRecipe,
  scrollArea: scrollAreaRecipe,
  radioGroup: radioGroupRecipe,
  sonner: sonnerRecipe,
  uiSwitch: switchRecipe,
  select: selectRecipe,
  slider: sliderRecipe,
  sheet: sheetRecipe,
  table: tableRecipe,
  toggleGroup: toggleGroupRecipe,
  pagination: paginationRecipe,
  tooltip: tooltipRecipe,
};
