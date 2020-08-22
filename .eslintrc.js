module.exports = {
  root: true,

  env: {
    jest: true,
    node: true,
  },

  extends: [
    'plugin:jest/recommended',
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/standard',
  ],

  globals: {
    context: true,
  },

  plugins: [
    'jest',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'comma-dangle': [
      'error',
      'always-multiline',
      { functions: 'never' },
    ],
    'jest/no-identical-title': 'off',
    'max-len': [
      'error',
      { ignorePattern: '@/' },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [
      'error',
      'single', { avoidEscape: true },
    ],
    semi: [
      'error',
      'never',
    ],
    'space-before-function-paren': 'error',
    'vue/attributes-order': 'error',
    'vue/component-tags-order': [
      'error',
      { order: ['template', 'script', 'style', 'i18n'] },
    ],
    'vue/max-attributes-per-line': [
      'error',
      { singleline: 5, multiline: 1 },
    ],
  },
}
