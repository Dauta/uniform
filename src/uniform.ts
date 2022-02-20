import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { generateEslintConfig } from './utils/generateEslintConfig';
import { generatePrettierConfig } from './utils/generatePrettierConfig';

const TARGET_DIR = process.cwd();

export const init = async () => {
  const { environment, usesTypescript } = await inquirer.prompt<
    Record<string, string>
  >([
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

  let reactPrompt: Record<string, string> = {};
  if (['Browser'].includes(environment)) {
    reactPrompt = await inquirer.prompt<Record<string, string>>([
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
    usesReact: reactPrompt?.usesReact === 'yes',
  };

  const spinner = createSpinner('Generating eslint config', {
    color: 'magenta',
  }).start();

  try {
    generateEslintConfig(TARGET_DIR, options);
    generatePrettierConfig(TARGET_DIR);

    spinner.success({
      text: 'Successfully initialized Uniform! Enjoy! 🦄🎩',
    });
  } catch (err) {
    spinner.error({ text: 'Something went wrong' });
    console.error(err);
  }
};
