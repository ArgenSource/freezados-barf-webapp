/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "jest-formatting"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:jest-formatting/recommended",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "arrow-body-style": ["error", "as-needed"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "block" },
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let"],
        next: ["const", "let"],
      },
    ],
    "no-console": ["warn"],
    "jest-formatting/padding-around-expect-groups": 1,

    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "external",
          ["builtin", "index", "internal", "parent", "sibling"],
        ],
        pathGroups: [
          {
            pattern: "@(react*)",
            group: "external",
          },
          {
            pattern:
              "{pages,vendors,assets,components,hooks,services,utils,features}/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        warnOnUnassignedImports: true,
        distinctGroup: true,
      },
    ],
  },
};

module.exports = config;
