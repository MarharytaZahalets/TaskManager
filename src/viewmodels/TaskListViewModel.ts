import { useCallback, useEffect, useState } from 'react';

import { SheetManager } from 'react-native-actions-sheet';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import api from 'api/taskListService';
import { TASK_FIELDS } from 'core/constants/ui';
import { dateString, errorHandler } from 'core/utils/utils';
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
      setError(errorHandler(err));
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
        setError(errorHandler(err));
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
        setError(errorHandler(err));
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
        setError(errorHandler(err));
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
        setError(errorHandler(err));
      } finally {
        setLoading(false);
        SheetManager.hide('app-action-sheet');
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

  const sortActionList = () => {
    SheetManager.show('app-action-sheet', {
      payload: {
        title: 'Select sort option',
        items: [
          { id: '1', field: TASK_FIELDS.title, onPress: () => sortTaskList('title') },
          {
            id: '2',
            field: TASK_FIELDS.description,
            onPress: () => sortTaskList('description'),
          },
          { id: '3', field: TASK_FIELDS.status, onPress: () => sortTaskList('status') },
        ],
      },
    });
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
    sortActionList,
  };
};
