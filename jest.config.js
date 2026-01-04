module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'apps/**/*.(t|j)s',
    'libs/**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^@airlineshub/(.*)$': '<rootDir>/apps/airlineshub/src/$1',
    '^@exchange/(.*)$': '<rootDir>/apps/exchange/src/$1',
    '^@fidelity/(.*)$': '<rootDir>/apps/fidelity/src/$1',
    '^@auth/(.*)$': '<rootDir>/apps/auth/src/$1',
    '^@imdtravel/(.*)$': '<rootDir>/apps/imdtravel/src/$1',
    '^@app/shared/(.*)$': '<rootDir>/libs/shared/src/$1',
    '^@app/shared$': '<rootDir>/libs/shared/src',
    '^@apps/(.*)$': '<rootDir>/apps/$1',
  },
};
