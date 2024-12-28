import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';


// --------------------------------------------------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});


// --------------------------------------------------------------------------------------------------------------------
export default [{
    ignores: ['coverage', 'dist', 'node_modules'],
}, ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
), {
    plugins: {
        '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
        parser: tsParser,
    },
    files: ['**/*.ts', '**/*.js', '*.mjs'],
    rules: {
        'keyword-spacing': 'error',
        'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
        'indent': [
            'error',
            4,
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
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
        'eol-last': [
            'error',
            'always',
        ],
        'sort-imports': [
            // <Wayne Shih> 17-Nov-2023
            // The modules are organized into distinct groups, each separated by an empty line for clarity and order.
            // The sequence of groups is as follows:
            //   Node.js built-in modules
            //   Third party modules
            //   Siemens internal modules
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
    },
}, {
    files: ['migrations/**/*.js', 'seeds/**/*.js'],
    languageOptions: {
        sourceType: 'commonjs',
    },
    rules: {
        '@typescript-eslint/no-require-imports': 'off',
    },
}, {
    files: ['**/*.spec.ts'],
    rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
    },
}];
