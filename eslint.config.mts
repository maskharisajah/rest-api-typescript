import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import tseslintparser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslintparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["**/tsconfig.json"]
      },
    },
     ignores: [
      "**/build/*",
      "**/node_modules/*",
      "**/public/*",
      "**/tsconfig.json",
    ],

    rules: {
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  tseslint.configs.recommended,
]);
