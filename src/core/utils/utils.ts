import { Linking, Platform } from 'react-native';

export const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const hasChanges = <T extends object>(
  original: T,
  updated: T,
  keys: (keyof T)[],
): boolean => {
  return keys.some((key) => original[key] !== updated[key]);
};

export const errorHandler = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  } else {
    return 'An unknown error occurred';
  }
};

export const dateString = (date: Date) => new Date(date).toLocaleDateString();

export const openAppSettings = () => {
  Linking.openSettings();
};

export const isAndroid = () => Platform.OS === 'android';
