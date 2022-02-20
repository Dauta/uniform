import fs from 'fs';
import { prettierConfig } from '../../configs';

export const generatePrettierConfig = (targetDir: string) => {
  const targetFile = `${targetDir}/.prettierrc`;

  const configContent = JSON.stringify(prettierConfig, null, 2);

  if (fs.existsSync(targetFile)) {
    fs.rmSync(targetFile);
  }
  fs.writeFileSync(targetFile, configContent);
};
