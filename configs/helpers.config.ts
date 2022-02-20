import { Rules } from 'eslint-define-config/src/rules';

export const incompatibleNodeRules: Rules = {
  'node/no-unsupported-features/es-builtins': 'off',
  'node/no-unsupported-features/es-syntax': 'off',
  'node/no-unsupported-features/node-builtins': 'off',
  'node/no-missing-import': 'off',
  'node/no-mixed-requires': 'off',
  'node/no-unpublished-import': 'off',
  'node/no-unpublished-require': 'off',
  'node/shebang': 'off',
};
