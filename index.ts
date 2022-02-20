#!/usr/bin/env node
import { lint } from './src/lint';
import { init } from './src/uniform';

const [command, flag] = process.argv.slice(2);

if (command === 'lint') {
  const fix = flag === '--fix';
  lint(fix);
} else {
  init();
}
