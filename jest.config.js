module.exports = {
  // collectCoverageFrom: [
  //   '<rootDir>/client/src/**/*.{js,jsx}',
  //   '!<rootDir>/client/src/**/index.js',
  //   '!<rootDir>/client/tests/**/*.(spec|test).{js,jsx}'
  // ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/server/',
    '<rootDir>/client/src/index.jsx'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/client/tests/__mocks__/fileMock.js'
  },
  setupTestFrameworkScriptFile: '<rootDir>/client/tests/setUpTests.js',
  // testMatch: [
  //   '<rootDir>/client/tests/**/*.(spec|test).{js,jsx}',
  //   '<rootDir>/client/src/**/?(*.)(spec|test).{js,jsx}'
  // ],
  verbose: true,
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};