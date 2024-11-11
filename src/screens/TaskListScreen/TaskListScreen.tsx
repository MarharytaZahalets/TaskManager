import React from 'react';
import { FlatList, type ListRenderItem } from 'react-native';

import { AppSaveAreaView, BaseText, TaskCard } from 'components';
import ActionTools from 'components/ActionTools/ActionTools';
import { Path } from 'navigation/constants';
import styles from 'screens/TaskListScreen/styles';
import { useTaskViewModel } from 'viewmodels/TaskListViewModel';

import type { Task } from 'models/TaskList';
import type { TaskListScreenProps } from 'navigation/types';

const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const { taskList, showSortAlert, searchTaskList } = useTaskViewModel();

  const onTaskPress = (item: Task) => {
    navigation.navigate(Path.DetailView, { ...item });
  };

  const renderTask: ListRenderItem<Task> = ({ item }) => (
    <TaskCard task={item} onPress={() => onTaskPress(item)} />
  );

  const onAddTask = () => {
    onTaskPress({
      id: '',
      title: '',
      description: '',
      createdAt: '2024-11-7' as unknown as Date,
      status: 'ongoing',
    });
  };

  const onSortTaskList = () => {
    showSortAlert();
  };

  return (
    <AppSaveAreaView style={styles.container}>
      <ActionTools
        onAddTask={onAddTask}
        onSearchBy={searchTaskList}
        onSortTaskList={onSortTaskList}
      />
      <FlatList
        stickyHeaderHiddenOnScroll={false}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={<BaseText>No tasks</BaseText>}
        keyExtractor={(item) => item.id.toString()}
        data={taskList}
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        windowSize={10}
        removeClippedSubviews
      />
    </AppSaveAreaView>
  );
};

export default TaskListScreen;
