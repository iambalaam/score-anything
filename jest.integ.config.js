module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.integ.test.ts?(x)'],
  transform: {
    '\\.tsx?$': ['ts-jest', { tsconfig: 'src/app/tsconfig.json' }],
    '\\.css': '<rootDir>/src/app/__mocks__/fileMock.js'
  }
};