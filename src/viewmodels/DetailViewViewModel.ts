import { useState } from 'react';
import { Alert } from 'react-native';

import { TASK_STATUS_FIELDS } from 'core/constants/ui';
import { generateId } from 'core/utils/generateId';
import { hasChanges } from 'core/utils/hasChanges';
import { useTaskViewModel } from 'viewmodels/TaskListViewModel';

import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { TaskStatus } from 'models/TaskList';
import type { RootStackParamList } from 'navigation/types';

export const useDetailViewModel = (
  route: RouteProp<RootStackParamList, 'DetailView'>,
  navigation: NavigationProp<RootStackParamList, 'DetailView'>,
) => {
  const { id, createdAt, title, description, status } = route.params;
  const [updatedTitle, setUpdatedTitle] = useState<string>(title);
  const [updatedDescription, setUpdatedDescription] = useState<string>(description);
  const [updatedStatus, setUpdatedStatus] = useState<TaskStatus>(status || 'ongoing');

  const { addTask, deleteTask, updateTask } = useTaskViewModel();

  const showStatusAlert = () => {
    Alert.alert(
      'Change Task Status',
      '',
      [
        { text: TASK_STATUS_FIELDS.ongoing, onPress: () => setUpdatedStatus('ongoing') },
        {
          text: TASK_STATUS_FIELDS.inProcess,
          onPress: () => setUpdatedStatus('inProcess'),
        },
        { text: TASK_STATUS_FIELDS.done, onPress: () => setUpdatedStatus('done') },
        {
          text: TASK_STATUS_FIELDS.canceled,
          onPress: () => setUpdatedStatus('canceled'),
        },
      ],
      { cancelable: true },
    );
  };

  const onSave = () => {
    const updatedTask = {
      title: updatedTitle,
      description: updatedDescription,
      status: updatedStatus,
    };

    if (!title) {
      addTask({
        id: generateId(),
        createdAt: new Date(),
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
      });
    } else if (
      hasChanges(route.params, updatedTask, ['title', 'description', 'status'])
    ) {
      updateTask(id, {
        id,
        createdAt,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
      });
    }

    navigation.goBack();
  };

  const onDelete = () => {
    deleteTask(id);

    navigation.goBack();
  };

  return {
    updatedTitle,
    updatedDescription,
    updatedStatus,
    setUpdatedTitle,
    setUpdatedDescription,
    setUpdatedStatus,
    showStatusAlert,
    onSave,
    onDelete,
  };
};
