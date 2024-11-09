import React from 'react';
import { Button, Text, View } from 'react-native';

import styles from './styles';
import { Path } from 'navigation/constants';

import type { TaskListScreenProps } from 'navigation/types';

const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Task List Screen</Text>
      <Button
        title={'Go to Detail View'}
        onPress={() => navigation.navigate(Path.DetailView, { title: 'Task #1' })}
      />
    </View>
  );
};

export default TaskListScreen;
