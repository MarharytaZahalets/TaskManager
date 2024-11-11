import { StyleSheet } from 'react-native';

import { Colors } from 'core/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: 24,
    marginBottom: 24,
    padding: 16,
  },
  date: { marginLeft: 8 },
  description: { paddingVertical: 16 },
  row: { flexDirection: 'row' },
  title: { flexShrink: 1, fontSize: 18, marginLeft: 12 },
});

export default styles;
