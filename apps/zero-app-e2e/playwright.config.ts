import { defineConfig, devices } from "@playwright/test";
import { workspaceRoot } from "@nx/devkit";

const baseURL = process.env["BASE_URL"] || "http://localhost:3000";

export default defineConfig({
  testDir: "./src",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npx nx serve zero-app",
    url: baseURL,
    reuseExistingServer: !process.env["CI"],
    cwd: workspaceRoot,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
