export const nodeBase = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
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
};

export const browserBase = {
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
  ignorePatterns: ['node_modules', '**/__generated__/*', 'public/**/*'],
};
