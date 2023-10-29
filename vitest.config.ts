import { join } from "path";
import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude, "**/e2e/**"],
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "~/": join(__dirname, "./src/"),
    },
  },
});
