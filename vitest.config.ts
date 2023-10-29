import { join } from "path";
import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    exclude: [...configDefaults.exclude, "**/e2e/**"],
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/utils/test/setup.ts"],
  },
  resolve: {
    alias: {
      "~/": join(__dirname, "./src/"),
    },
  },
});
