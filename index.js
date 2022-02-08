#!/usr/bin/env node
const fs = require('fs');

const TARGET_DIR = process.cwd();

fs.symlinkSync(`${__dirname}/.eslintrc.json`, `${TARGET_DIR}/.eslintrc.json`);
fs.symlinkSync(`${__dirname}/.prettierrc`, `${TARGET_DIR}/.prettierrc`);
