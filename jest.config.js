process.env.TZ = 'Etc/UTC';

module.exports = {
  clearMocks: true,
  // collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  coveragePathIgnorePatterns: [
    'tests/unit/setup-component',
    'tests/unit/factories/*',
    'src/setup/*',
    'src/components/sad/SadSwitch.vue',
    'src/components/sad/SadDatePicker.vue',
    'src/api/index.ts',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: -10,
  //   },
  // },
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/tests/unit/$1',
    '\\.(css|scss)$': '<rootDir>/tests/__mocks__/style-mock.js',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/unit/setup.ts'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
