import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Console is allowed in development
      'no-console': 'off',

      // Enforce modern JavaScript practices
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': ['error', {
        array: true,
        object: true,
      }, {
        enforceForRenamedProperties: false,
      }],

      // Code style
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'indent': ['error', 2, { SwitchCase: 1 }],

      // Best practices
      'eqeqeq': ['error', 'always'],
      'no-var': 'error',
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-use-before-define': ['error', {
        functions: false,
        classes: true,
        variables: true,
      }],

      // Modern ES features
      'object-shorthand': 'error',
      'arrow-spacing': 'error',
      'template-curly-spacing': 'error',
      'rest-spread-spacing': 'error',
    },
  },
  {
    name: 'zeropoint/ignores',
    ignores: [
      'public/**/*',
      'node_modules/**/*',
    ],
  },
];
