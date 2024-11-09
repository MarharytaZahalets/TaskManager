import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

import type { GeolocationScreenProps } from 'navigation/types';

const GeolocationScreen: React.FC<GeolocationScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Geolocation Screen</Text>
    </View>
  );
};

export default GeolocationScreen;
