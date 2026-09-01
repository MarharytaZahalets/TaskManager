import React from 'react';
import { View } from 'react-native';

import { BaseText } from '..';
import styles from './styles';

interface EmptyComponentProps {
  title: string;
}
const EmptyComponent: React.FC<EmptyComponentProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <BaseText style={styles.text}>{title}</BaseText>
    </View>
  );
};

export default EmptyComponent;
