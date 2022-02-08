const { ESLint } = require('eslint');

async function lint(fix) {
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

  if (totalIssues === 0) return;

  results.forEach((result) => {
    if (result.messages.length === 0) return;
    console.log('\n');
    console.log('->', result.filePath + '\n');

    result.messages.map((message) => {
      console.log(`\tat line ${message.line}: ${message.message}\n`);
    });
  });

  console.log(
    `Linted ${results.length} ${
      results.length === 1 ? 'file' : 'files'
    }. Found ${totalIssues} ${totalIssues === 1 ? 'issue' : 'issues'}.`
  );
}

module.exports = { lint };
