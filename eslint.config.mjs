import { defineConfig } from "eslint/config";
import expo from "eslint-config-expo/flat.js";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig(expo, prettier, {
  ignores: [".expo/", "dist/"],
});
