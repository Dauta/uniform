import fs from 'fs';
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { browserBase, nodeBase, prettierConfig } from '../configs/index.js';

const TARGET_DIR = process.cwd();

const generatePrettierConfig = (targetDir) => {
  const targetFile = `${targetDir}/.prettierrc`;

  const configContent = JSON.stringify(prettierConfig, null, 2);

  if (fs.existsSync(targetFile)) {
    fs.rmSync(targetFile);
  }
  fs.writeFileSync(targetFile, configContent);
};

const generateEslintConfig = (targetDir, options) => {
  const targetFile = `${targetDir}/.eslintrc.json`;
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

  fs.writeFileSync(targetFile, configContent);
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
