module.exports = {
  preset: '@react-native/jest-preset',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!react-native|@react-native|react-native-gesture-handler|react-redux|@reduxjs/toolkit|immer|react-native-actions-sheet|@react-navigation)`,
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

