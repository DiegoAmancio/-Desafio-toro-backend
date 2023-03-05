module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['.'],
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  modulePaths: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@adapterIn/(.*)': '<rootDir>/src/adapters/in/$1',
    '@adapterOut/(.*)': '<rootDir>/src/adapters/out/$1',
    '@application/(.*)': '<rootDir>/src/application/$1',
  },
};
