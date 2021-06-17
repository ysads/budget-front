module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline', { functions: 'never' }],
    'max-len': ['error', { ignorePattern: '@/', ignoreComments: true }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'vue/attributes-order': 'error',
    'vue/component-tags-order': [
      'error',
      { order: ['template', 'script', 'style', 'i18n'] },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
