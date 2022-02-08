#!/usr/bin/env node
const [command, flag] = process.argv.slice(2);

if (command === 'lint') {
  const fix = flag === '--fix';
  const { lint } = require('./src/lint');
  lint(fix);
  return;
}

const { init } = require('./src/uniform');
init();
