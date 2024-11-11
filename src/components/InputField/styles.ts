import { StyleSheet } from 'react-native';

import { Colors } from 'core/theme/colors';

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.input,
    borderRadius: 12,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 10,
    padding: 14,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default styles;
