import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];