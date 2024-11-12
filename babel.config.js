module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./__tests__/'],
          '@components': './src/components',
          '@screens': 'src/screens',
          '@assets': 'src/assets',
          '@utils': 'src/core/utils',
          '@hooks': 'src/core/hooks',
          '@state': 'src/state',
          '@models': 'src/models',
          '@viewmodels': 'src/viewmodels',
          '@api': 'src/api',
        },
      },
    ],
  ],
};
