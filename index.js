#!/usr/bin/env node
const [arg] = process.argv.slice(2);

if (arg === 'lint') {
  const { lint } = require('./src/lint');
  lint();

  return;
}

const { init } = require('./src/uniform');
init();
