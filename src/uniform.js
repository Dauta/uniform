import fs from 'fs';
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { browserBase, nodeBase } from '../configs/base.config.js';

const TARGET_DIR = process.cwd();

const generatePrettierConfig = (target) => {
  const PRETTIER_TARGET = `${target}/.prettierrc`;
  const PRETTIER_SOURCE = new URL('../configs/.prettierrc', import.meta.url)
    .pathname;

  if (fs.existsSync(PRETTIER_TARGET)) {
    fs.rmSync(PRETTIER_TARGET);
  }
  fs.copyFileSync(PRETTIER_SOURCE, PRETTIER_TARGET);
};

const generateEslintConfig = (target, options) => {
  const CONFIG_TARGET = `${target}/.eslintrc.json`;
  const { environment, usesTypescript, usesReact } = options;

  let config;
  if (environment === 'Node') {
    config = {
      ...nodeBase,
    };
  }

  if (environment === 'Browser') {
    config = {
      ...browserBase,
    };
  }

  if (usesTypescript) {
    config.extends = [
      'plugin:@typescript-eslint/recommended',
      ...config.extends,
    ];

    config.parser = '@typescript-eslint/parser';
    config.plugins.push('@typescript-eslint');
    config.rules['no-unused-vars'] = 'off';

    config.rules['@typescript-eslint/no-unused-vars'] = [
      'error',
      { argsIgnorePattern: '^_' },
    ];
  }

  if (usesReact) {
    config.extends = [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      ...config.extends,
    ];

    config.parserOptions['ecmaFeatures'] = {
      jsx: true,
    };

    config.plugins.push('react');

    config.settings['react'] = {
      version: 'detect',
    };
  }

  const configContent = JSON.stringify(config, null, 2);

  fs.writeFileSync(CONFIG_TARGET, configContent);
};

export const init = async () => {
  const { environment, usesTypescript } = await inquirer.prompt([
    {
      name: 'environment',
      choices: ['Browser', 'Node'],
      message: 'Is this a Browser or a Node project?',
      type: 'list',
    },
    {
      name: 'usesTypescript',
      choices: ['yes', 'no'],
      message: `Are you using ${chalk.bold.blueBright('TypeScript')}?`,
      type: 'list',
    },
  ]);

  let reactPrompt;
  if (['Browser'].includes(environment)) {
    reactPrompt = await inquirer.prompt([
      {
        name: 'usesReact',
        choices: ['yes', 'no'],
        message: 'Are you using React?',
        type: 'list',
      },
    ]);
  }

  const options = {
    environment,
    usesTypescript: usesTypescript === 'yes',
    usesReact: reactPrompt ? reactPrompt.usesReact === 'yes' : false,
  };

  const spinner = createSpinner('Generating eslint config', {
    color: 'magenta',
  }).start();

  try {
    generateEslintConfig(TARGET_DIR, options);
    generatePrettierConfig(TARGET_DIR);

    spinner.success({
      text: 'Successfully initialized uniform! Enjoy! 🦄🎩',
    });
  } catch (err) {
    spinner.error({ text: 'Something went wrong' });
    console.error(err);
  }
};
