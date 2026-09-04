import { useCallback, useEffect, useRef, useState } from 'react';

import { SheetManager } from 'react-native-actions-sheet';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import api from '../api/taskListService';
import { SORT_BY_FIELDS, SORT_ORDER_FIELDS } from '../core/constants/ui';
import { sortTaskListBy } from '../core/utils/sortTaskList';
import { dateString, errorHandler } from '../core/utils/utils';
import { Task, type SortOption, type SortOrder } from '../models/TaskList';
import { RootState } from '../state/store';
import {
  requestStartAction,
  setErrorAction,
  setLoadingAction,
  setTaskListAction,
} from '../state/taskListSlice';

type UseTaskViewModelOptions = {
  fetchOnMount?: boolean;
};

export const useTaskViewModel = ({ fetchOnMount = true }: UseTaskViewModelOptions = {}) => {
  const { taskList, loading, error } = useSelector(
    (state: RootState) => state.taskList,
    shallowEqual,
  );

  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const sortByRef = useRef<SortOption>(sortBy);
  const sortOrderRef = useRef<SortOrder | null>(sortOrder);
  const defaultTaskListRef = useRef<Task[]>([...taskList]);
  sortByRef.current = sortBy;
  sortOrderRef.current = sortOrder;

  const publishList = useCallback(() => {
    const field = sortByRef.current;
    const order = sortOrderRef.current;
    if (field === 'default' || order == null) {
      dispatch(setTaskListAction([...defaultTaskListRef.current]));
      return;
    }

    dispatch(setTaskListAction(sortTaskListBy(defaultTaskListRef.current, field, order)));
  }, [dispatch]);

  const runRequest = useCallback(
    async <T>(request: () => Promise<T>, onSuccess: (result: T) => void): Promise<boolean> => {
      dispatch(requestStartAction());
      try {
        const result = await request();
        onSuccess(result);
        return true;
      } catch (err: unknown) {
        dispatch(setErrorAction(errorHandler(err)));
        return false;
      } finally {
        dispatch(setLoadingAction(false));
      }
    },
    [dispatch],
  );

  const fetchTaskList = useCallback(async () => {
    return runRequest(
      () => api.getTasks(),
      (data) => {
        defaultTaskListRef.current = data;
        publishList();
      },
    );
  }, [publishList, runRequest]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchTaskList();
    }
  }, [fetchOnMount, fetchTaskList]);

  const addTask = useCallback(
    async (task: Task) => {
      return runRequest(
        () => api.createTask(task),
        (newTask) => {
          defaultTaskListRef.current = [...defaultTaskListRef.current, newTask];
          publishList();
        },
      );
    },
    [publishList, runRequest],
  );

  const updateTask = useCallback(
    async (id: string, task: Task) => {
      return runRequest(
        () => api.updateTask(id, task),
        (updatedTask) => {
          defaultTaskListRef.current = defaultTaskListRef.current.map((item) =>
            item.id === updatedTask.id ? updatedTask : item,
          );
          publishList();
        },
      );
    },
    [publishList, runRequest],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      return runRequest(
        () => api.deleteTask(id),
        () => {
          defaultTaskListRef.current = defaultTaskListRef.current.filter((item) => item.id !== id);
          publishList();
        },
      );
    },
    [publishList, runRequest],
  );

  const sortTaskList = useCallback(
    (field: SortOption, order: SortOrder | null = null) => {
      if (field === 'default') {
        sortByRef.current = 'default';
        sortOrderRef.current = null;
        setSortBy('default');
        setSortOrder(null);
        dispatch(setTaskListAction([...defaultTaskListRef.current]));
        return;
      }

      sortByRef.current = field;
      setSortBy(field);

      const nextOrder = order ?? 'asc';
      sortOrderRef.current = nextOrder;
      setSortOrder(nextOrder);
      dispatch(setTaskListAction(sortTaskListBy(defaultTaskListRef.current, field, nextOrder)));
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
    [dispatch, fetchTaskList, taskList],
  );

  const sortActionList = () => {
    const isDefaultSort = sortByRef.current === 'default';
    const sortOptions = Object.keys(SORT_BY_FIELDS) as SortOption[];

    SheetManager.show('app-action-sheet', {
      payload: {
        title: 'Sort tasks',
        sections: [
          {
            title: 'Sort by',
            items: sortOptions.map((field) => ({
              id: `field-${field}`,
              field: SORT_BY_FIELDS[field],
              selected: sortByRef.current === field,
              onPress: () =>
                sortTaskList(field, field === 'default' ? null : sortOrderRef.current),
            })),
          },
          {
            title: 'Order',
            items: (Object.keys(SORT_ORDER_FIELDS) as SortOrder[]).map((order) => ({
              id: `order-${order}`,
              field: SORT_ORDER_FIELDS[order],
              selected: !isDefaultSort && sortOrderRef.current === order,
              disabled: isDefaultSort,
              onPress: () => sortTaskList(sortByRef.current, order),
            })),
          },
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
    sortTaskList,
    sortBy,
    sortOrder,
  };
};
