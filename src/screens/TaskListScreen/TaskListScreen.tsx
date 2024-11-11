import React from 'react';
import { FlatList, type ListRenderItem } from 'react-native';

import { ActionTools, AppSaveAreaView, EmptyComponent, TaskCard } from 'components';
import { Path } from 'navigation/constants';
import styles from 'screens/TaskListScreen/styles';
import { useTaskViewModel } from 'viewmodels/TaskListViewModel';

import type { Task } from 'models/TaskList';
import type { TaskListScreenProps } from 'navigation/types';

const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const { taskList, sortActionList, searchTaskList } = useTaskViewModel();

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

  return (
    <AppSaveAreaView style={styles.container}>
      <ActionTools
        onAddTask={onAddTask}
        onSearchBy={searchTaskList}
        onSortTaskList={sortActionList}
      />
      {!!taskList.length && (
        <FlatList
          stickyHeaderHiddenOnScroll={false}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id.toString()}
          data={taskList}
          renderItem={renderTask}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          windowSize={10}
          removeClippedSubviews
        />
      )}
      {!taskList.length && <EmptyComponent title={'No tasks'} />}
    </AppSaveAreaView>
  );
};

export default TaskListScreen;
