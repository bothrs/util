// Template for ignoring multiple packages
const untranspiledModulePatterns = []

module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  transformIgnorePatterns: [
    `node_modules/(?!${untranspiledModulePatterns.join('|')})`,
  ],
}
