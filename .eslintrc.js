require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2017": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:json/recommended",
    "plugin:md/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "plugins": [
    "@html-eslint",
    "json"
  ],
  "overrides": [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
    },
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
    },
  ],
  "rules": {
    "@html-eslint/indent": ["error", 2],
    "@html-eslint/require-closing-tags": ["error", { "selfClosing": "always" }],
  },
}