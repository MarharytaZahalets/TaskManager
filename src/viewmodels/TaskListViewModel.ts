import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import api from 'api/taskListService';
import { TASK_FIELDS } from 'core/constants/ui';
import { dateString } from 'core/utils/dateToString';
import { Task, type TaskField } from 'models/TaskList';
import { RootState } from 'state/store';
import {
  addTaskAction,
  deleteTaskAction,
  setTaskListAction,
  updateTaskAction,
} from 'state/taskListSlice';

export const useTaskViewModel = () => {
  const taskList: Task[] = useSelector(
    (state: RootState) => state.taskList.taskList,
    shallowEqual,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const errorHandler = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
  };

  // Fetch tasks on mount
  useEffect(() => {
    fetchTaskList();
  }, []);

  const fetchTaskList = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getTasks();
      __DEV__ && console.log('DATA: ', data);
      dispatch(setTaskListAction(data));
    } catch (err: unknown) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const addTask = useCallback(
    async (task: Task) => {
      setLoading(true);
      try {
        const newTask = await api.createTask(task);
        dispatch(addTaskAction(newTask));
      } catch (err: unknown) {
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const updateTask = useCallback(
    async (id: string, task: Task) => {
      setLoading(true);
      try {
        const updatedTask = await api.updateTask(id, task);
        dispatch(updateTaskAction(updatedTask));
      } catch (err: unknown) {
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await api.deleteTask(id);
        dispatch(deleteTaskAction(id));
      } catch (err: unknown) {
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const sortTaskList = useCallback(
    async (field: TaskField) => {
      setLoading(true);
      try {
        const data = await api.sortTasks(field, 'asc');
        dispatch(setTaskListAction(data));
      } catch (err: unknown) {
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const searchTaskList = useCallback(
    (query: string) => {
      if (!query) {
        fetchTaskList();
        return;
      }
      const updatedList = taskList.filter((task) => {
        const date = dateString(task.createdAt);

        return (
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase()) ||
          date.includes(query.toLowerCase()) ||
          task.status.toLowerCase().includes(query.toLowerCase())
        );
      });
      dispatch(setTaskListAction(updatedList));
    },
    [dispatch, taskList],
  );

  const showSortAlert = () => {
    Alert.alert(
      'Select sort field',
      '',
      [
        { text: TASK_FIELDS.title, onPress: () => sortTaskList('title') },
        {
          text: TASK_FIELDS.description,
          onPress: () => sortTaskList('description'),
        },
        { text: TASK_FIELDS.status, onPress: () => sortTaskList('status') },
        {
          text: TASK_FIELDS.createdAt,
          onPress: () => sortTaskList('createdAt'),
        },
      ],
      { cancelable: true },
    );
  };

  return {
    taskList,
    loading,
    error,
    fetchTaskList,
    addTask,
    updateTask,
    deleteTask,
    searchTaskList,
    showSortAlert,
  };
};
