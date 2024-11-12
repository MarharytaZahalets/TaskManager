import { StyleSheet } from 'react-native';

import { Colors } from 'core/theme/colors';

const styles = StyleSheet.create({
  actionButtonIndent: { flex: 0.2 },
  actionButtonText: { color: Colors.textLight },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  container: {},
  deleteButton: { backgroundColor: Colors.labelCancel, flex: 2 },
  saveButton: { backgroundColor: Colors.primary, flex: 2 },
  statusButton: {
    backgroundColor: Colors.secondary,
  },
  statusButtonContent: { alignItems: 'flex-start' },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default styles;
