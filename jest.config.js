process.env.TZ = 'Etc/UTC'

module.exports = {
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  clearMocks: true,
  coveragePathIgnorePatterns: [
    'tests/unit/factory-builder.js',
    'src/setup/*',
  ],
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/tests/unit/$1.js',
  },
  setupFiles: [
    '<rootDir>/tests/unit/setup.js',
    '<rootDir>/node_modules/jest-plugin-context/setup',
  ],
}
