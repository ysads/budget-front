process.env.TZ = 'Etc/UTC'

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  coveragePathIgnorePatterns: [
    'tests/unit/factory-builder',
    'src/setup/*',
  ] ,
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/tests/unit/$1.js',
  },
  setupFiles: [
    '<rootDir>/tests/unit/setup',
    '<rootDir>/node_modules/jest-plugin-context/setup',
  ],
}