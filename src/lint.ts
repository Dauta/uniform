import { ESLint, Linter } from 'eslint';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

const logMessage = (message: Linter.LintMessage) => {
  const severity =
    message.severity === 1
      ? `[${chalk.yellow('WARN')}]`
      : `[${chalk.red('ERROR')}]`;
  const line = chalk.blueBright.bold(message.line);
  const messageText = chalk.yellowBright(message.message);

  console.log(`\t${severity} at line ${line}: ${messageText}\n`);
};

const logResult = (total: number, issues: number) => {
  const totalText = `Linted ${chalk.bold(total)} ${
    total === 1 ? 'file' : 'files'
  }`;
  const issuesText =
    issues > 0
      ? `${chalk.bold.bgRed.whiteBright(' ' + issues + ' ')} ${
          issues === 1 ? 'issue' : 'issues'
        } found.`
      : `${chalk.green('No issues found!')} 🎉`;

  console.log(chalk.magentaBright(`${totalText}. ${issuesText}`));
};

export const lint = async (fix: boolean) => {
  const spinner = createSpinner('Linting your code. Please, wait...\n', {
    color: 'magenta',
  });

  spinner.start();

  const linter = new ESLint({
    errorOnUnmatchedPattern: false,
    extensions: ['ts', 'js', 'mjs', 'jsx', 'tsx'],
    fix,
  });

  const results = await linter.lintFiles('.');

  if (fix) {
    await ESLint.outputFixes(results);
  }

  const totalIssues = results.reduce((acc, curr) => {
    return acc + curr.messages.length;
  }, 0);

  spinner.clear();
  spinner.success({ text: 'Success!' });
  if (totalIssues === 0) {
    logResult(results.length, totalIssues);
    return;
  }

  results.forEach((result) => {
    if (result.messages.length === 0) return;
    console.log('\n');
    console.log(
      chalk.bold.yellowBright('-->'),
      chalk.underline(result.filePath) + '\n'
    );

    result.messages.map(logMessage);
  });

  logResult(results.length, totalIssues);
};
