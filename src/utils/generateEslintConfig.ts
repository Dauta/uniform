import fs from 'fs';
import { browserBase, nodeBase } from '../../configs/index';
import type { ConfigGeneratorOptions, StrictEslintConfig } from '../../types';
import { incompatibleNodeRules } from '../../configs/helpers.config';

export const generateEslintConfig = (
  targetDir: string,
  options: ConfigGeneratorOptions
) => {
  const targetFile = `${targetDir}/.eslintrc.json`;
  const { environment, usesTypescript, usesReact } = options;

  let config: StrictEslintConfig;

  if (environment === 'Node') {
    config = {
      ...nodeBase,
    };
  } else {
    config = {
      ...browserBase,
    };
  }

  if (usesTypescript) {
    config.extends = [
      ...config.extends,
      'plugin:@typescript-eslint/recommended',
    ];

    config.parser = '@typescript-eslint/parser';
    config.plugins.push('@typescript-eslint');
    config.rules['no-unused-vars'] = 'off';

    config.rules['@typescript-eslint/no-unused-vars'] = [
      'error',
      { argsIgnorePattern: '^_' },
    ];

    if (environment === 'Node') {
      config.rules = {
        ...incompatibleNodeRules,
        ...config.rules,
      };
    }
  }

  if (usesReact) {
    config.extends = [
      ...config.extends,
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react/jsx-runtime',
    ];

    if (!config.parserOptions) {
      config.parserOptions = {};
    }
    config.parserOptions['ecmaFeatures'] = {
      jsx: true,
    };

    config.plugins.push('react');

    if (!config.settings) {
      config.settings = {};
    }
    config.settings['react'] = {
      version: 'detect',
    };

    config.rules['react-hooks/rules-of-hooks'] = 'error';
    config.rules['react-hooks/exhaustive-deps'] = 'warn';
  }

  // prettier needs to be the last extend
  config.extends.push('plugin:prettier/recommended');

  const configContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(targetFile, configContent);
};
