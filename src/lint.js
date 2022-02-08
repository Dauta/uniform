const { ESLint } = require('eslint');

async function lint() {
  const linter = new ESLint({
    errorOnUnmatchedPattern: false,
    extensions: ['ts', 'js', 'mjs', 'jsx', 'tsx'],
  });

  const results = await linter.lintFiles('.');
  const totalIssues = results.reduce((acc, curr) => {
    return acc + curr.messages.length;
  }, 0);

  console.log(
    `Linted ${results.length} ${
      results.length === 1 ? 'file' : 'files'
    }. Found ${totalIssues} ${totalIssues === 1 ? 'issue' : 'issues'}.`
  );

  if (totalIssues === 0) return;

  results.forEach((result) => {
    if (result.messages.length === 0) return;
    console.log('\n');
    console.log('->', result.filePath + '\n');

    result.messages.map((message) => {
      console.log(`\tat line ${message.line}: ${message.message}\n`);
    });
  });
}

module.exports = { lint };
