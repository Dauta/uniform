# Uniform 🦄🎩

All-in-one code linter and formatter for TypeScript and JavaScript

## ⚡️ Quickstart

- `npm install @dauta/uniform --save-dev` or `yarn add -D @dauta/uniform`
- `npx uniform` or `yarn uniform`

_Note:_ You _might_ need to restart ESLint server in your IDE for the config files to get picked up.

## 🤔 What will this do?

Installing the package will install `eslint` and `prettier` as a dependency of your project, along with several plugins.

Running the `uniform` script, will generate configuration files based on your choices and copy them into the root of your project. This will allow your IDE (or whatever extension you're using to run eslint) to read the correct configurations and give realtime feedback on your code.

## 🐶 Friendly Output

Uniform is focused on user-friendlines and readability. 

<img width="526" alt="Screenshot 2022-02-08 at 23 40 10" src="https://user-images.githubusercontent.com/9319191/153095636-719d06a6-940d-4c08-8935-443b09eb23cb.png">

## 💻 CLI

To lint your code manually, run `npx uniform lint` or `yarn uniform lint`.

### Fix

To auto-fix some issues, add the `--fix` flag to the above command.
That's it :)

## 🤩 Recommended Setup

We recommend running uniform with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension and setting up the "Format on save" option.

✨ Enjoy!
