const { off } = require("process");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['dist', '*.js'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-undef':'off',
    'no-unused-vars':'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': ['error'],
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
}
