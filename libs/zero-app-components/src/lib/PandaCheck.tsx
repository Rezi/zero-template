import { css } from "@zero-app/styled-system/css";

// Temporary Panda CSS smoke-test for the zero-app-components package. Styled
// entirely with Panda's `css()` so it visibly confirms the shared
// `@zero-app/styled-system` resolves and generates utilities for this lib.
export function PandaCheck() {
  return (
    <div
      className={css({
        display: "inline-flex",
        alignItems: "center",
        gap: "2",
        bg: "green.600",
        color: "white",
        px: "4",
        py: "2",
        rounded: "lg",
        fontWeight: "semibold",
        fontSize: "sm",
      })}
    >
      🐼 Panda CSS works in zero-app-components
    </div>
  );
}
