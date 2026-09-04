import { useCallback, useRef, useState } from 'react';

import { SheetManager } from 'react-native-actions-sheet';

import { TASK_STATUS_FIELDS } from '../core/constants/ui';
import { generateId, hasChanges } from '../core/utils/utils';
import { useTaskViewModel } from './TaskListViewModel';

import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { Task, TaskStatus } from '../models/TaskList';
import type { RootStackParamList } from '../navigation/types';

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

  const lastAction = useRef<'save' | 'delete' | null>(null);
  const [didAttemptMutation, setDidAttemptMutation] = useState(false);

  const { addTask, deleteTask, updateTask, loading, error } = useTaskViewModel({
    fetchOnMount: false,
  });

  const setStatusAndClose = useCallback((task: Task) => {
    setUpdatedTask(task);
    SheetManager.hide('app-action-sheet');
  }, []);

  const openChangeStatus = () => {
    SheetManager.show('app-action-sheet', {
      payload: {
        title: 'Choose status',
        items: [
          {
            id: '1',
            field: TASK_STATUS_FIELDS.ongoing,
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'ongoing' }),
          },
          {
            id: '2',
            field: TASK_STATUS_FIELDS.inProcess,
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'inProcess' }),
          },
          {
            id: '3',
            field: TASK_STATUS_FIELDS.done,
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'done' }),
          },
          {
            id: '4',
            field: TASK_STATUS_FIELDS.canceled,
            onPress: () => setStatusAndClose({ ...updatedTask, status: 'canceled' }),
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

  const onSave = async () => {
    if (loading) {
      return;
    }

    lastAction.current = 'save';
    setDidAttemptMutation(true);
    let success = true;

    if (!id) {
      success = await addTask({
        ...updatedTask,
        id: generateId(),
        createdAt: new Date(),
      });
    } else if (
      hasChanges(route.params, updatedTask, ['title', 'description', 'status'])
    ) {
      success = await updateTask(id, {
        ...updatedTask,
      });
    }

    if (success) {
      navigation.goBack();
    }
  };

  const onDelete = async () => {
    if (loading) {
      return;
    }

    lastAction.current = 'delete';
    setDidAttemptMutation(true);
    const success = await deleteTask(id);

    if (success) {
      navigation.goBack();
    }
  };

  const onRetry = () => {
    if (lastAction.current === 'delete') {
      onDelete();
      return;
    }

    onSave();
  };

  return {
    updatedTask,
    loading,
    error: didAttemptMutation ? error : null,
    setTitle,
    setDescription,
    openChangeStatus,
    onSave,
    onDelete,
    onRetry,
  };
};
