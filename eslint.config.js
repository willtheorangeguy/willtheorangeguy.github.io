import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  { rules: { "no-console": "error" } },
  { files: ["scripts/**"], rules: { "no-console": "off" } },
  {
    // Vendored third-party code (LibreSpeed: https://github.com/librespeed/speedtest/,
    // GNU LGPLv3), copied as-is rather than authored in this project's style.
    // These rules don't fit its dialect/conventions, so they're relaxed here
    // instead of rewriting upstream logic:
    // - no-console: the speed test intentionally logs progress/errors to the console.
    // - no-unused-vars: `caughtErrors: "none"` allows the many `catch (e) {}` blocks
    //   that deliberately ignore the caught error (a common upstream pattern here).
    // - no-unused-expressions: speedtest_worker.js uses a bare property access
    //   (`xhr[i].upload.onprogress;`) inside a try/catch purely for its side effect of
    //   throwing on unsupported browsers (IE11 feature detection), not as a mistake.
    files: ["public/speedtest/**"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  {
    ignores: [
      "dist/**",
      ".astro",
      "public/pagefind/**",
      "public/styleguide/**",
    ],
  },
];
