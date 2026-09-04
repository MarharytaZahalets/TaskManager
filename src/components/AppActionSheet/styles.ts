import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';

const styles = StyleSheet.create({
  checkmark: {
    color: Colors.accent,
    fontSize: 18,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: Colors.input,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 12,
  },
  chipDisabled: {
    opacity: 0.4,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
  },
  chipTextSelected: {
    color: Colors.textLight,
  },
  container: {
    paddingBottom: 12,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  group: {
    backgroundColor: Colors.input,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  indicator: {
    backgroundColor: Colors.neutral,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowDivider: {
    borderTopColor: Colors.secondary,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  rowSelected: {
    backgroundColor: Colors.secondary,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    color: Colors.accent,
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },
  selectedText: {
    color: Colors.accent,
  },
  sheet: {
    backgroundColor: Colors.background,
  },
});

export default styles;
