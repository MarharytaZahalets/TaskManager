module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended', // recommended rules for TS
    'prettier', // disable ESLint rules that conflict with Prettier
    'plugin:import/typescript', // TS support for import/export linting
    'plugin:react-native/all', // recommended rules for RN
  ],
  parser: '@typescript-eslint/parser', // TS parser for ESLint to understand TS syntax
  plugins: [
    '@typescript-eslint', // additional TS rules
    'prettier', // enable Prettier to show formatting issues as ESLint errors
    'unused-imports', // listing for unused imports and variables
    'react-native', // additional RN rules
    'import', // sort import
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'], // specify files for parser
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // allow resolve types even if they’re not explicitly imported
        project: '<root>/tsconfig.json', // link to TS config
      },
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'], // apply rules only for TS files
      rules: {
        '@typescript-eslint/no-shadow': ['error'], // prevent variable naming conflicts
        '@typescript-eslint/no-var-requires': 'off', // allow using require() in TS files
        'no-shadow': 'off', // disable default ESLint no-shadow rule to avoid conflicts
        'no-undef': 'off', // disable no-undefined ESLint rule, TS handles this
        'prettier/prettier': ['error'], // flag Prettier issues as errors
        '@typescript-eslint/no-unused-vars': 'error', // flag unused variables as errors
        'no-unused-vars': 'off', // disable ESLint no-unused-vars rule to avoid conflicts
        'no-console': 'warn', // disallow console logs for deploy (for dev change to 'warn')
        'unused-imports/no-unused-imports': 'error', // auto-removal for unused imports
        'import/no-duplicates': 'error', // prevent duplicate imports and use 'import type' for types
        'react-native/no-raw-text': 'off',
        'react-native/split-platform-components': 'off',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_', // ignore vars with this prefix
            args: 'after-used', // flags unused arguments only if they appear after used ones
            argsIgnorePattern: '^_', // ignore args with this prefix
          },
        ],
        'no-nested-ternary': 'error', // disallow nested ternary operators for readability
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never', // no extensions for TypeScript files
            tsx: 'never', // no extensions for TypeScript (React) files
            js: 'never', // no extensions for JS files
            jsx: 'never', // no extensions for JSX files
            json: 'always', // require extension for JSON files
          },
        ],
        'import/order': [
          // sort imports rules
          'error',
          {
            groups: [
              ['builtin', 'external'],
              ['internal', 'parent', 'sibling', 'index'],
              'type',
            ],
            pathGroups: [
              {
                pattern: '{react,react-native}',
                group: 'external',
                position: 'before', // React and RN must be always first
              },
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-native'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
      },
    },
  ],
};
