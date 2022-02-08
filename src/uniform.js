import fs from 'fs';

export const init = () => {
  const TARGET_DIR = process.cwd();

  const CONFIG_TARGET = `${TARGET_DIR}/.eslintrc.json`;
  const PRETTIER_TARGET = `${TARGET_DIR}/.prettierrc`;

  const CONFIG_SOURCE = new URL('../.eslintrc.json', import.meta.url).pathname;
  const PRETTIER_SOURCE = new URL('../.prettierrc', import.meta.url).pathname;

  // copy eslint config
  if (fs.existsSync(CONFIG_TARGET)) {
    fs.rmSync(CONFIG_TARGET);
  }
  fs.copyFileSync(CONFIG_SOURCE, CONFIG_TARGET);

  // copy prettierrc
  if (fs.existsSync(PRETTIER_TARGET)) {
    fs.rmSync(PRETTIER_TARGET);
  }
  fs.copyFileSync(PRETTIER_SOURCE, PRETTIER_TARGET);

  console.log('Successfully initialized uniform! 🦄🎩');
};
