export const hasChanges = <T extends object>(
  original: T,
  updated: T,
  keys: (keyof T)[],
): boolean => {
  return keys.some((key) => original[key] !== updated[key]);
};
