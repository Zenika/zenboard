
// Inspired by:
// - https://github.com/airbnb/javascript/blob/master/linters/.eslintrc,
// - https://github.com/facebook/fbjs/blob/master/scripts/eslint/.eslintrc.js,
// - http://eslint.org/docs/user-guide/configuring.html#configuring-rules
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    "eslint-plugin-html",
    "react"
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  ecmaFeatures: {
    modules: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "no-console": WARNING,
    "react/prop-types": WARNING,
    "react/no-deprecated": WARNING,
    "react/no-render-return-value": "off",
    "no-unused-vars": WARNING,
    "no-undef": WARNING,
    "no-case-declarations": WARNING,
    "no-class-assign": WARNING,
    "no-mixed-spaces-and-tabs": WARNING,
    "comma-dangle": WARNING,
    "no-dupe-keys": WARNING
  }
};
