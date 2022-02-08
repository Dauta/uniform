function init() {
  const TARGET_DIR = process.cwd();

  const CONFIG_TARGET = `${TARGET_DIR}/.eslintrc.json`;
  const PRETTIER_TARGET = `${TARGET_DIR}/.prettierrc`;

  // copy eslint config
  if (fs.existsSync(CONFIG_TARGET)) {
    fs.rmSync(CONFIG_TARGET);
  }
  fs.symlinkSync(`${__dirname}/.eslintrc.json`, CONFIG_TARGET);

  // copy prettierrc
  if (fs.existsSync(PRETTIER_TARGET)) {
    fs.rmSync(PRETTIER_TARGET);
  }
  fs.symlinkSync(`${__dirname}/.prettierrc`, PRETTIER_TARGET);

  console.log('Successfully initialized uniform! 🦄🎩');
}

module.exports = { init };
