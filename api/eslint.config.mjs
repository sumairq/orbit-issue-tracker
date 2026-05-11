import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  { ignores: ['build/**', 'node_modules/**', 'tsconfig-paths.js'] },
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2022,
      },
      globals: { ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        node: { moduleDirectory: ['node_modules', 'src/'] },
        typescript: { project: './tsconfig.json' },
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      radix: 0,
      'no-restricted-syntax': 0,
      'no-await-in-loop': 0,
      'no-console': 0,
      'consistent-return': 0,
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'import/prefer-default-export': 0,
      'import/no-cycle': 0,
    },
  },
];
