import { DefaultTheme } from '@react-navigation/native';

import { Colors } from './colors';

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    primary: Colors.primary,
    secondary: Colors.secondary,
    accent: Colors.accent,
    text: Colors.text,
    labelDone: Colors.labelDone,
    labelCancel: Colors.labelCancel,
    labelInProgress: Colors.labelInProgress,
    labelOngoing: Colors.labelOngoing,
  },
};

export const inheritTextColor = {
  color: Colors.text,
};
