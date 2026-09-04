import React from 'react';
import renderer, { act } from 'react-test-renderer';

import { useDetailViewModel } from '../../../src/viewmodels/DetailViewViewModel';

const mockAddTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();
const mockGoBack = jest.fn();

jest.mock('../../../src/viewmodels/TaskListViewModel', () => ({
  useTaskViewModel: () => ({
    addTask: mockAddTask,
    updateTask: mockUpdateTask,
    deleteTask: mockDeleteTask,
    loading: false,
    error: null,
  }),
}));

const newTaskParams = {
  id: '',
  title: 'New',
  description: 'D',
  createdAt: new Date(),
  status: 'ongoing' as const,
};

describe('useDetailViewModel mutations', () => {
  const navigation = { goBack: mockGoBack } as never;
  const route = { params: newTaskParams } as never;

  let latest: ReturnType<typeof useDetailViewModel>;

  const Harness = () => {
    latest = useDetailViewModel(route, navigation);
    return null;
  };

  beforeEach(() => {
    jest.resetAllMocks();
    renderer.act(() => {
      renderer.create(<Harness />);
    });
  });

  it('navigates back after a successful create', async () => {
    mockAddTask.mockResolvedValueOnce(true);

    await act(async () => {
      await latest.onSave();
    });

    expect(mockAddTask).toHaveBeenCalled();
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('stays on screen when create fails', async () => {
    mockAddTask.mockResolvedValueOnce(false);

    await act(async () => {
      await latest.onSave();
    });

    expect(mockGoBack).not.toHaveBeenCalled();
  });

  it('stays on screen when delete fails', async () => {
    mockDeleteTask.mockResolvedValueOnce(false);

    await act(async () => {
      await latest.onDelete();
    });

    expect(mockGoBack).not.toHaveBeenCalled();
  });
});
