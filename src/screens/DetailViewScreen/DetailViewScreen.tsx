import React from 'react';
import { Button, Text, View } from 'react-native';

import styles from './styles';

import type { DetailViewScreenProps } from 'navigation/types';

const DetailViewScreen: React.FC<DetailViewScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Detail View Screen</Text>
      <Button title={'Go back'} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailViewScreen;
