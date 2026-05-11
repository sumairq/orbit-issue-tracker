import js from '@eslint/js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['build/**', 'dev/**', 'node_modules/**', 'cypress/**', 'server.js'],
  },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.jest, ...globals.node, process: 'readonly' },
    },
    settings: {
      'import/resolver': {
        node: { moduleDirectory: ['node_modules', 'src/'] },
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      radix: 0,
      'no-restricted-syntax': 0,
      'no-await-in-loop': 0,
      'no-console': 0,
      'no-unused-vars': 'warn',
      'consistent-return': 0,
      'no-param-reassign': [2, { props: false }],
      'no-return-assign': [2, 'except-parens'],
      'no-use-before-define': 0,
      'import/prefer-default-export': 0,
      'import/no-cycle': 0,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
];
