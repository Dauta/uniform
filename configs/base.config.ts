import type { StrictEslintConfig } from '../types';

export const nodeBase: StrictEslintConfig = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'prettier/prettier': 'warn',
  },
  settings: {},
  ignorePatterns: [
    'node_modules',
    'public',
    'dist',
    'build',
    'out',
    '**/__generated__/*',
  ],
};

export const browserBase: StrictEslintConfig = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'prettier/prettier': 'warn',
  },
  settings: {},
  ignorePatterns: [
    'node_modules',
    'public',
    'dist',
    'build',
    'out',
    '**/__generated__/*',
  ],
};
