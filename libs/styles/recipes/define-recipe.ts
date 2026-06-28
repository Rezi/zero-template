// Token-aware identity helpers for authoring config recipes.
//
// These wrap a recipe config object and return it unchanged — their only job is
// to attach types. We deliberately type against the *generated* styled-system
// types (`@zero-app/styled-system/types`) rather than `@pandacss/dev`, because
// the generated `SystemStyleObject` is aware of *this* project's tokens — so
// `bg: "primary"`, `ringC: "ring/30"`, `rounded: "2xl"` etc. all autocomplete and
// type-check inside `base`/`variants`, exactly like the old inline `cva()` calls.
//
// The import is type-only, so esbuild (which loads `panda.config.mjs`) strips it
// before module resolution ever runs. That matters for two reasons:
//   1. No runtime dependency on the generated output → no circular dependency
//      (the output is produced *by* the config that imports these recipes).
//   2. It sidesteps the same Deno `nodeModulesDir: auto` resolution issue that
//      stops the config from importing `@pandacss/dev` at runtime.
//
// `defineRecipe` is generic so `T` is inferred from the `variants` you pass,
// which makes `defaultVariants` and `compoundVariants` strictly checked against
// the variant keys/values you actually declared.
import type {
  RecipeConfig,
  RecipeVariantRecord,
  SlotRecipeConfig,
  SlotRecipeVariantRecord,
} from "../styled-system/types";

export const defineRecipe = <T extends RecipeVariantRecord>(
  config: RecipeConfig<T>,
): RecipeConfig<T> => config;

export const defineSlotRecipe = <S extends string, T extends SlotRecipeVariantRecord<S>>(
  config: SlotRecipeConfig<S, T>,
): SlotRecipeConfig<S, T> => config;
