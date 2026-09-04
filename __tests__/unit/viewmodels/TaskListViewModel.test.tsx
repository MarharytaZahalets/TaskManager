import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SheetManager } from 'react-native-actions-sheet';
import renderer, { act } from 'react-test-renderer';

import api from '../../../src/api/taskListService';
import taskListReducer from '../../../src/state/taskListSlice';
import { useTaskViewModel } from '../../../src/viewmodels/TaskListViewModel';
import type { Task } from '../../../src/models/TaskList';

jest.mock('react-native-actions-sheet', () => ({
  SheetManager: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

jest.mock('../../../src/api/taskListService', () => ({
  __esModule: true,
  default: {
    getTasks: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    sortTasks: jest.fn(),
  },
}));

const mockedApi = api as jest.Mocked<typeof api>;

const task: Task = {
  id: '1',
  title: 'Test',
  description: 'D',
  createdAt: new Date(),
  status: 'ongoing',
};

type ViewModel = ReturnType<typeof useTaskViewModel>;

const createStore = (preloaded?: Partial<ReturnType<typeof taskListReducer>>) =>
  configureStore({
    reducer: { taskList: taskListReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState: {
      taskList: {
        taskList: [],
        loading: false,
        error: null,
        ...preloaded,
      },
    },
  });

const renderViewModel = (store: ReturnType<typeof createStore>, fetchOnMount = false) => {
  let latest: ViewModel | undefined;

  const Harness = () => {
    latest = useTaskViewModel({ fetchOnMount });
    return null;
  };

  act(() => {
    renderer.create(
      <Provider store={store}>
        <Harness />
      </Provider>,
    );
  });

  return () => latest as ViewModel;
};

describe('useTaskViewModel', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('sets loading on request start and stores data on success', async () => {
    mockedApi.getTasks.mockResolvedValueOnce([task]);
    const store = createStore({ error: 'old error' });
    const getVm = renderViewModel(store);

    await act(async () => {
      await getVm().fetchTaskList();
    });

    const state = store.getState().taskList;
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.taskList).toEqual([task]);
  });

  it('stores error and keeps existing tasks when a request fails', async () => {
    mockedApi.getTasks.mockRejectedValueOnce(new Error('HTTP 500: boom'));
    const store = createStore({ taskList: [task] });
    const getVm = renderViewModel(store);

    await act(async () => {
      await getVm().fetchTaskList();
    });

    const state = store.getState().taskList;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('HTTP 500: boom');
    expect(state.taskList).toEqual([task]);
  });

  it('does not add a task when create fails', async () => {
    mockedApi.createTask.mockRejectedValueOnce(new Error('HTTP 400: bad'));
    const store = createStore();
    const getVm = renderViewModel(store);

    let success = true;
    await act(async () => {
      success = await getVm().addTask(task);
    });

    expect(success).toBe(false);
    expect(store.getState().taskList.taskList).toEqual([]);
    expect(store.getState().taskList.error).toBe('HTTP 400: bad');
  });

  it('does not remove a task when delete fails', async () => {
    mockedApi.deleteTask.mockRejectedValueOnce(new Error('Network request failed'));
    const store = createStore({ taskList: [task] });
    const getVm = renderViewModel(store);

    let success = true;
    await act(async () => {
      success = await getVm().deleteTask('1');
    });

    expect(success).toBe(false);
    expect(store.getState().taskList.taskList).toEqual([task]);
  });

  it('sorts the current list locally by field and order', () => {
    const later = {
      ...task,
      id: '2',
      title: 'Zebra',
      createdAt: new Date('2026-01-01T00:00:00Z'),
    };
    const store = createStore({ taskList: [later, task] });
    const getVm = renderViewModel(store);

    act(() => {
      getVm().sortTaskList('title', 'asc');
    });

    expect(mockedApi.sortTasks).not.toHaveBeenCalled();
    expect(store.getState().taskList.taskList.map((item) => item.title)).toEqual([
      'Test',
      'Zebra',
    ]);
    expect(getVm().sortBy).toBe('title');
    expect(getVm().sortOrder).toBe('asc');
  });

  it('sorts createdAt chronologically in descending order', () => {
    const older = { ...task, id: 'old', createdAt: '2024-11-5' as unknown as Date };
    const newer = {
      ...task,
      id: 'new',
      createdAt: '2026-09-04T12:19:31.386Z' as unknown as Date,
    };
    const store = createStore({ taskList: [older, newer] });
    const getVm = renderViewModel(store);

    act(() => {
      getVm().sortTaskList('createdAt', 'desc');
    });

    expect(store.getState().taskList.taskList.map((item) => item.id)).toEqual([
      'new',
      'old',
    ]);
    expect(getVm().sortBy).toBe('createdAt');
    expect(getVm().sortOrder).toBe('desc');
  });

  it('starts with default order and restores the original list', () => {
    const later = { ...task, id: '2', title: 'Zebra' };
    const store = createStore({ taskList: [later, task] });
    const getVm = renderViewModel(store);

    expect(getVm().sortBy).toBe('default');
    expect(getVm().sortOrder).toBeNull();

    act(() => {
      getVm().sortTaskList('title', 'asc');
    });
    expect(store.getState().taskList.taskList.map((item) => item.title)).toEqual([
      'Test',
      'Zebra',
    ]);

    act(() => {
      getVm().sortTaskList('default');
    });

    expect(getVm().sortBy).toBe('default');
    expect(getVm().sortOrder).toBeNull();
    expect(store.getState().taskList.taskList.map((item) => item.id)).toEqual(['2', '1']);
  });

  it('applies ascending order when a custom field is selected from default order', () => {
    const later = { ...task, id: '2', title: 'Zebra' };
    const store = createStore({ taskList: [later, task] });
    const getVm = renderViewModel(store);

    act(() => {
      getVm().sortTaskList('title');
    });

    expect(getVm().sortBy).toBe('title');
    expect(getVm().sortOrder).toBe('asc');
    expect(store.getState().taskList.taskList.map((item) => item.title)).toEqual([
      'Test',
      'Zebra',
    ]);
  });

  it('keeps the current order when switching between custom fields', () => {
    const later = { ...task, id: '2', title: 'Zebra', status: 'done' as const };
    const store = createStore({ taskList: [later, task] });
    const getVm = renderViewModel(store);

    act(() => {
      getVm().sortTaskList('title', 'desc');
    });
    act(() => {
      getVm().sortTaskList('status', getVm().sortOrder);
    });

    expect(getVm().sortBy).toBe('status');
    expect(getVm().sortOrder).toBe('desc');
  });

  it('opens a sort sheet with field and order sections', () => {
    const store = createStore({ taskList: [task] });
    const getVm = renderViewModel(store);

    act(() => {
      getVm().sortActionList();
    });

    expect(SheetManager.show).toHaveBeenCalledWith(
      'app-action-sheet',
      expect.objectContaining({
        payload: expect.objectContaining({
          title: 'Sort tasks',
          sections: [
            expect.objectContaining({
              title: 'Sort by',
              items: [
                expect.objectContaining({ field: 'Default order', selected: true }),
                expect.objectContaining({ field: 'Title', selected: false }),
                expect.objectContaining({ field: 'Description' }),
                expect.objectContaining({ field: 'Status' }),
                expect.objectContaining({ field: 'Date' }),
              ],
            }),
            expect.objectContaining({
              title: 'Order',
              items: [
                expect.objectContaining({
                  field: '↑ Ascending',
                  selected: false,
                  disabled: true,
                }),
                expect.objectContaining({
                  field: '↓ Descending',
                  selected: false,
                  disabled: true,
                }),
              ],
            }),
          ],
        }),
      }),
    );
  });

  it('marks the active field and order when a custom sort is applied', () => {
    const store = createStore({ taskList: [task] });
    const getVm = renderViewModel(store);

    act(() => {
      getVm().sortTaskList('status', 'desc');
      getVm().sortActionList();
    });

    expect(SheetManager.show).toHaveBeenCalledWith(
      'app-action-sheet',
      expect.objectContaining({
        payload: expect.objectContaining({
          sections: [
            expect.objectContaining({
              items: expect.arrayContaining([
                expect.objectContaining({ field: 'Default order', selected: false }),
                expect.objectContaining({ field: 'Status', selected: true }),
              ]),
            }),
            expect.objectContaining({
              items: [
                expect.objectContaining({
                  field: '↑ Ascending',
                  selected: false,
                  disabled: false,
                }),
                expect.objectContaining({
                  field: '↓ Descending',
                  selected: true,
                  disabled: false,
                }),
              ],
            }),
          ],
        }),
      }),
    );
  });
});
