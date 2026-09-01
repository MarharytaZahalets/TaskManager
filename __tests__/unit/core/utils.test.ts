import { Linking, Platform } from 'react-native';

import {
  dateString,
  errorHandler,
  generateId,
  hasChanges,
  isAndroid,
  openAppSettings,
} from '../../../src/core/utils/utils';

jest.mock('react-native', () => {
  const actual = jest.requireActual('react-native');
  return {
    ...actual,
    Linking: { openSettings: jest.fn() },
    Platform: { ...actual.Platform, OS: 'ios' },
  };
});

describe('utils', () => {
  it('generateId returns different values', () => {
    const first = generateId();
    const second = generateId();
    expect(first).not.toEqual(second);
  });

  it('hasChanges detects changed keys', () => {
    const original = { a: 1, b: 2 };
    const updated = { a: 1, b: 3 };
    expect(hasChanges(original, updated, ['a'])).toBe(false);
    expect(hasChanges(original, updated, ['b'])).toBe(true);
    expect(hasChanges(original, updated, ['a', 'b'])).toBe(true);
  });

  it('errorHandler returns message for Error instances', () => {
    const err = new Error('boom');
    expect(errorHandler(err)).toBe('boom');
  });

  it('errorHandler returns fallback for unknown errors', () => {
    expect(errorHandler('oops')).toBe('An unknown error occurred');
    expect(errorHandler(null)).toBe('An unknown error occurred');
  });

  it('dateString returns a locale date string', () => {
    const result = dateString(new Date('2024-01-02T00:00:00Z'));
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('openAppSettings calls Linking.openSettings', () => {
    openAppSettings();
    expect(Linking.openSettings).toHaveBeenCalled();
  });

  it('isAndroid returns true only when Platform.OS is android', () => {
    (Platform as any).OS = 'android';
    expect(isAndroid()).toBe(true);

    (Platform as any).OS = 'ios';
    expect(isAndroid()).toBe(false);
  });
});

