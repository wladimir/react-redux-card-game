module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react", "jest"],
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: ""
  },
  parser: "babel-eslint",
  globals: { process: true },
  rules: {
    "no-console": "off"
  }
};
