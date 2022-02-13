import { defineConfig } from 'eslint-define-config';

export const nodeBase = defineConfig({
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'prettier/prettier': 'warn',
  },
  settings: {},
  ignorePatterns: ['node_modules', '**/__generated__/*', 'public/**/*'],
});

export const browserBase = defineConfig({
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'prettier/prettier': 'warn',
  },
  settings: {},
  ignorePatterns: ['node_modules', '**/__generated__/*', 'public/**/*'],
});
