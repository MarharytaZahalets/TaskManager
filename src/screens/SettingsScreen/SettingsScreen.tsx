import React from 'react';
import { Button, Text, View } from 'react-native';

import styles from './styles';

import type { SettingsProps } from 'navigation/types';

const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title={'Go to Home'} onPress={() => navigation.pop(1)} />
    </View>
  );
};

export default SettingsScreen;
