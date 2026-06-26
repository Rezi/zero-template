import * as React from "react";
import type { Decorator, Preview } from "@storybook/react-vite";

// The single global stylesheet (fonts + design tokens + sugar reset + generated
// Panda CSS), owned by the styles library — the same one the app loads, so
// Storybook stays in sync without reaching into the app.
// oxlint-disable-next-line no-unassigned-import -- CSS side-effect import
import "@zero-app/styles/global.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light";
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);
  return (
    <div>
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "todo" },
  },
  globalTypes: {
    theme: {
      description: "Color theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
