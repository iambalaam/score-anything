module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '\\.tsx?$': ['ts-jest', { tsConfig: 'src/app/tsconfig.json' }],
    '\\.css': '<rootDir>/src/app/__mocks__/fileMock.js'
  }
};