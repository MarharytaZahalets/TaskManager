import { StyleSheet } from 'react-native';

import { Colors } from 'core/theme/colors';

const styles = StyleSheet.create({
  actionIconButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
    paddingHorizontal: 0,
  },
  container: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    marginVertical: 20,
  },
  input: {
    color: Colors.text,
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'flex-end' },
  search: {
    backgroundColor: Colors.input,
    borderRadius: 12,
    flexDirection: 'row',
    flex: 1,
  },
});

export default styles;
