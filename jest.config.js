module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!react-native|@react-native|react-native-gesture-handler|react-redux|react-native-actions-sheet|@react-navigation)`,
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
