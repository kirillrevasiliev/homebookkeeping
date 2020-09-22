module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "no-unused-vars": "warn",
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "no-cond-assign": ["error", "always"],
    "no-console": "off",
    "react/prop-types": "off",
    "react/forbid-prop-types": "off",
    "react/display-name": "off"
  }
}
