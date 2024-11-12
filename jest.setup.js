import { jest } from '@jest/globals';

jest.mock('react-native-actions-sheet', () => {
  return {
    default: () => null,
    SheetProvider: ({ children }) => children,
    show: jest.fn(),
    hide: jest.fn(),
    registerSheet: jest.fn(),
  };
});

jest.mock('@react-native-community/geolocation', () => {
  return {
    getCurrentPosition: jest.fn((success) =>
      success({ coords: { latitude: 0, longitude: 0 } }),
    ),
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn(() => ({
      Navigator: jest.fn(() => null), // Mock Navigator component
      Screen: jest.fn(() => null), // Mock Screen component
    })),
  };
});
