module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testMatch: ['**/src/**/*.(test|spec).js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};