import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import simpleSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-plugin-prettier";
import nextConfig from "eslint-config-next";

export default [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "next-env.d.ts",
    ],
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      "simple-import-sort": simpleSort,
      prettier,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nextConfig.rules,

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "no-duplicate-imports": "error",
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/first": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],

      "prettier/prettier": "error",

      "no-console": "error",
    },
  },
];
