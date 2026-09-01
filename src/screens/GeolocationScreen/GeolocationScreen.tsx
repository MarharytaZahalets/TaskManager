import React from 'react';
import { View } from 'react-native';

import { BaseText } from '../../components';
import styles from './styles';

import type { GeolocationScreenProps } from '../../navigation/types';

const GeolocationScreen: React.FC<GeolocationScreenProps> = () => {
  return (
    <View style={styles.container}>
      <BaseText>GeolocationScreen</BaseText>
    </View>
  );
};

export default GeolocationScreen;
