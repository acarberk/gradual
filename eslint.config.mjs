import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "apps/**",
    "packages/**",
    "node_modules/**",
    ".next/**",
    ".turbo/**",
    "build/**",
    "dist/**",
    "out/**",
  ]),
  {
    files: ["**/*.{js,mjs,cjs}"],
  },
]);
