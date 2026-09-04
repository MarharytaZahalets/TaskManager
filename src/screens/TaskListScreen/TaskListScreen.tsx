import React from 'react';
import { ActivityIndicator, FlatList, type ListRenderItem } from 'react-native';

import {
  ActionTools,
  AppSaveAreaView,
  EmptyComponent,
  ErrorState,
  TaskCard,
} from '../../components';
import { Colors } from '../../core/theme/colors';
import { Path } from '../../navigation/constants';
import styles from './styles';
import { useTaskViewModel } from '../../viewmodels/TaskListViewModel';

import type { Task } from '../../models/TaskList';
import type { TaskListScreenProps } from '../../navigation/types';

const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const { taskList, loading, error, fetchTaskList, sortActionList, searchTaskList } =
    useTaskViewModel();

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

  const renderContent = () => {
    if (loading && taskList.length === 0) {
      return <ActivityIndicator size='large' color={Colors.primary} style={styles.loader} />;
    }

    if (error && taskList.length === 0) {
      return <ErrorState message={error} onRetry={fetchTaskList} />;
    }

    if (taskList.length > 0) {
      return (
        <>
          {error ? (
            <ErrorState compact message={error} onRetry={fetchTaskList} />
          ) : null}
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
        </>
      );
    }

    return <EmptyComponent title={'No tasks'} />;
  };

  return (
    <AppSaveAreaView style={styles.container} edges={['left', 'right']}>
      <ActionTools
        onAddTask={onAddTask}
        onSearchBy={searchTaskList}
        onSortTaskList={sortActionList}
      />
      {renderContent()}
    </AppSaveAreaView>
  );
};

export default TaskListScreen;
