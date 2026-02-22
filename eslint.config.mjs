import { defineConfig } from "eslint/config";
import expo from "eslint-config-expo/flat.js";
import prettier from "eslint-plugin-prettier/recommended";
import reactCompiler from "eslint-plugin-react-compiler";

export default defineConfig(
  expo,
  reactCompiler.configs.recommended,
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
