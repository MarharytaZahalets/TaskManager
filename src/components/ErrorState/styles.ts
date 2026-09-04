import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';

const styles = StyleSheet.create({
  compact: {
    flex: 0,
    paddingVertical: 16,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
  },
  retryText: {
    color: Colors.textLight,
  },
  title: {
    color: Colors.labelCancel,
    fontSize: 22,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default styles;
