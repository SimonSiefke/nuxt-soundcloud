module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: ['standard', 'plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['html', 'json'],
  // add your custom rules here
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'no-inner-declarations': 'off'
  },
  globals: {}
}
