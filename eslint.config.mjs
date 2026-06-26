import { defineConfig } from "eslint/config";
import expo from "eslint-config-expo/flat.js";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig(
  expo,
  prettier,
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
  { ignores: [".expo/", "dist/", "drizzle", "src/uniwind-types.d.ts"] },
);
