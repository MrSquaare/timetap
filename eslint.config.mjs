import { defineConfig, globalIgnores } from "eslint/config";
import expo from "eslint-config-expo/flat.js";

export default defineConfig(
  globalIgnores([
    ".expo/",
    "dist/",
    "drizzle/",
    "android/",
    "ios/",
    "src/uniwind-types.d.ts",
  ]),
  expo,
  {
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
      "react/jsx-curly-brace-presence": ["error", { props: "always" }],
      "react/jsx-sort-props": ["error"],
    },
  },
);
