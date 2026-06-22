import { css } from "@zero-app/styled-system/css";

// Temporary Panda CSS smoke-test for the ui-library package. Styled entirely
// with Panda's `css()` (no Tailwind classes) so it visibly confirms the shared
// `@zero-app/styled-system` resolves and generates utilities for this lib.
export function PandaCheck() {
  return (
    <div
      className={css({
        display: "inline-flex",
        alignItems: "center",
        gap: "2",
        bg: "blue.600",
        color: "white",
        px: "4",
        py: "2",
        rounded: "lg",
        fontWeight: "semibold",
        fontSize: "sm",
      })}
    >
      🐼 Panda CSS works in ui-library
    </div>
  );
}
