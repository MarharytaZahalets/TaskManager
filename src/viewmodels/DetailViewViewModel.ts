import { useState } from 'react';

import { SheetManager } from 'react-native-actions-sheet';

import { TASK_STATUS_FIELDS } from 'core/constants/ui';
import { generateId, hasChanges } from 'core/utils/utils';
import { useTaskViewModel } from 'viewmodels/TaskListViewModel';

import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { TaskStatus } from 'models/TaskList';
import type { RootStackParamList } from 'navigation/types';

export const useDetailViewModel = (
  route: RouteProp<RootStackParamList, 'DetailView'>,
  navigation: NavigationProp<RootStackParamList, 'DetailView'>,
) => {
  const { id, createdAt, title, description, status } = route.params;
  const [updatedTask, setUpdatedTask] = useState<{
    title: string;
    description: string;
    status: TaskStatus;
    id: string;
    createdAt: Date;
  }>({
    title,
    description,
    status,
    createdAt,
    id,
  });

  const { addTask, deleteTask, updateTask } = useTaskViewModel();

  const showStatusAlert = () => {
    SheetManager.show('app-action-sheet', {
      payload: {
        title: 'Change task status',
        items: [
          {
            id: '1',
            field: TASK_STATUS_FIELDS.ongoing,
            onPress: () => setUpdatedTask({ ...updatedTask, status: 'ongoing' }),
          },
          {
            id: '2',
            field: TASK_STATUS_FIELDS.inProcess,
            onPress: () => setUpdatedTask({ ...updatedTask, status: 'inProcess' }),
          },
          {
            id: '3',
            field: TASK_STATUS_FIELDS.done,
            onPress: () => setUpdatedTask({ ...updatedTask, status: 'done' }),
          },
          {
            id: '3',
            field: TASK_STATUS_FIELDS.canceled,
            onPress: () => setUpdatedTask({ ...updatedTask, status: 'canceled' }),
          },
        ],
      },
    });
  };

  const setTitle = (titleString: string) => {
    setUpdatedTask({ ...updatedTask, title: titleString });
  };

  const setDescription = (descriptionString: string) => {
    setUpdatedTask({ ...updatedTask, description: descriptionString });
  };

  const onSave = () => {
    if (!title) {
      addTask({
        ...updatedTask,
        id: generateId(),
        createdAt: new Date(),
      });
    } else if (
      hasChanges(route.params, updatedTask, ['title', 'description', 'status'])
    ) {
      updateTask(id, {
        ...updatedTask,
      });
    }

    navigation.goBack();
  };

  const onDelete = () => {
    deleteTask(id);

    navigation.goBack();
  };

  return {
    updatedTask,
    setTitle,
    setDescription,
    showStatusAlert,
    onSave,
    onDelete,
  };
};
