import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTs from '@typescript-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';


// --------------------------------------------------------------------------------------------------------------------
const globalLanguageOptions = {
  globals: {
    ...globals.node,
    ...globals.mocha,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
  parser: tsParser,
};


// --------------------------------------------------------------------------------------------------------------------
/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['coverage', 'dist', 'node_modules'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Entire project
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { '@typescript-eslint': pluginTs },
    languageOptions: globalLanguageOptions,
    rules: {
      // ----- Code Style -----
      'keyword-spacing': 'error',
      'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
      'indent': ['error', 4],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      'eol-last': ['error', 'always'],
      'max-len': [
        'warn',
        {
          'code': 120,
          'ignoreComments': true,
          'ignoreUrls': true,
          'ignoreTemplateLiterals': true,
          'ignoreRegExpLiterals': true,
        },
      ],
      'no-trailing-spaces': ['error'],

      // ----- Import/Export Rules -----
      // `sort-imports` is native to ESLint, so it doesn't need a plugin.
      // But `import/order` is from `eslint-plugin-import`, so it needs to be installed as a plugin.
      'sort-imports': [
        // The modules are organized into distinct groups, each separated by an empty line for clarity and order.
        // The sequence of groups is as follows:
        //   Node.js built-in modules
        //   Third party modules
        //   project modules
        'error',
        {
          'ignoreCase': true,
          'ignoreDeclarationSort': false,
          'ignoreMemberSort': false,
          'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
          'allowSeparatedGroups': true,
        },
      ],

      // Need `eslint-plugin-import` as a plugin to use import/export rules.
      //   $ npm install eslint-plugin-import --save-dev
      // Reference:
      //   - Installation:
      //     - https://github.com/import-js/eslint-plugin-import/tree/main?tab=readme-ov-file#installation
      //   - Configuration:
      //     - https://github.com/import-js/eslint-plugin-import/tree/main?tab=readme-ov-file#config---flat-eslintconfigjs
      //     - https://github.com/import-js/eslint-plugin-import/tree/main?tab=readme-ov-file#config---flat-with-config-in-typescript-eslint
      //   - Rules:
      //     - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
      //
      // 'import/order': [
      //   'error',
      //   {
      //     groups: [
      //       ['builtin', 'external'],
      //       'internal',
      //       ['parent', 'sibling'],
      //       'index'
      //     ],
      //     'newlines-between': 'always',
      //     'alphabetize': { order: 'asc', caseInsensitive: true },
      //   },
      // ],

      // ----- TypeScript Rules -----
      '@typescript-eslint/member-ordering': [
        // In order from the largest to the smallest scope, member variables should come first, followed by the
        // constructor, and then member methods.
        'warn',
        {
          'default': [
            // Abstract Fields
            'public-abstract-field',
            'protected-abstract-field',
            // Abstract Methods
            'public-abstract-method',
            'protected-abstract-method',

            // Static Fields
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            // Static Methods
            'public-static-method',
            'protected-static-method',
            'private-static-method',

            // Instance Fields
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            // Constructor
            'constructor',
            // Instance Methods
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        },
      ],
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'indent': ['error', 2],
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];
