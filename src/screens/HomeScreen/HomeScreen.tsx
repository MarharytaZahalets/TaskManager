import React from 'react';
import { Button, Text, View } from 'react-native';

import styles from './styles';
import { Path } from 'navigation/constants';

import type { HomeScreenProps } from 'navigation/types';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title={'Go to main stack'}
        onPress={() =>
          navigation.navigate(Path.Tabs, {
            screen: Path.TaskList,
          })
        }
      />
    </View>
  );
};

export default HomeScreen;
