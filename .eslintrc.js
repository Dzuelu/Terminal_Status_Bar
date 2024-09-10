module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'plugin:node/recommended',
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended', // typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  ignorePatterns: ['node_modules', 'out'],
  // overrides: [
  //   {
  //     files: ['spec/**/*.ts'],
  //     rules: {
  //       '@typescript-eslint/ban-ts-ignore': 'off',
  //       '@typescript-eslint/no-explicit-any': 'off',
  //       '@typescript-eslint/no-non-null-assertion': 'off'
  //     }
  //   }
  // ],
  parser: '@typescript-eslint/parser',
  plugins: ['sort-keys-fix'],
  rules: {
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   { format: null, modifiers: ['requiresQuotes'], selector: 'default' },
    //   { format: ['camelCase', 'PascalCase'], selector: 'default' }
    // ],
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'import/extensions': ['error', 'never', { ignorePackages: true }],
    'import/first': 'off',
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-len': ['error', { code: 120 }],
    'no-console': 'off',
    'no-new': 'off',
    'no-param-reassign': 'off',
    'no-throw-literal': 'error',
    'no-underscore-dangle': 'off',
    'node/no-extraneous-import': 'error',
    'node/no-missing-import': [
      'error',
      {
        allowModules: ['vscode'],
        tryExtensions: ['.ts', '.d.ts', '.js']
      }
    ],
    'node/no-unpublished-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        endOfLine: 'auto',
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'none',
        useTabs: false
      }
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'sort-keys-fix/sort-keys-fix': 'error'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    node: {
      resolvePaths: ['./src', 'node_modules']
    }
  }
};
