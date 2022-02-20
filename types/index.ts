import { EslintConfig } from 'eslint-define-config';
import { Extends } from 'eslint-define-config/src/extends';
import { Plugin } from 'eslint-define-config/src/plugin';
import { Rules } from 'eslint-define-config/src/rules';

export type ConfigGeneratorOptions = {
  environment: string;
  usesTypescript: boolean;
  usesReact: boolean;
};

export type StrictEslintConfig = Omit<
  EslintConfig,
  'extends' | 'plugins' | 'rules'
> & {
  extends: Extends[];
  plugins: Plugin[];
  rules: Rules;
};
