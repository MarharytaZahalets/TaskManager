import reducer, {
  addTaskAction,
  deleteTaskAction,
  requestStartAction,
  setErrorAction,
  setLoadingAction,
  setTaskListAction,
  updateTaskAction,
} from '../../../src/state/taskListSlice';
import type { Task, TaskListState } from '../../../src/models/TaskList';

const createTask = (overrides: Partial<Task> = {}): Task => ({
  id: '1',
  title: 'Test',
  description: 'Desc',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  status: 'ongoing',
  ...overrides,
});

describe('taskListSlice reducer', () => {
  const initialState: TaskListState = { taskList: [], loading: false, error: null };

  it('handles requestStartAction by setting loading and clearing error', () => {
    const state: TaskListState = {
      taskList: [createTask()],
      loading: false,
      error: 'old error',
    };
    const next = reducer(state, requestStartAction());
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
    expect(next.taskList).toHaveLength(1);
  });

  it('handles setLoadingAction', () => {
    const next = reducer(initialState, setLoadingAction(true));
    expect(next.loading).toBe(true);
  });

  it('handles setErrorAction without changing the task list', () => {
    const task = createTask();
    const state: TaskListState = { taskList: [task], loading: true, error: null };
    const next = reducer(state, setErrorAction('HTTP 500'));
    expect(next.error).toBe('HTTP 500');
    expect(next.taskList).toEqual([task]);
  });

  it('handles setTaskListAction', () => {
    const tasks = [createTask({ id: 'a' }), createTask({ id: 'b' })];
    const next = reducer(initialState, setTaskListAction(tasks));
    expect(next.taskList).toEqual(tasks);
  });

  it('handles addTaskAction', () => {
    const task = createTask({ id: 'new' });
    const next = reducer(initialState, addTaskAction(task));
    expect(next.taskList).toHaveLength(1);
    expect(next.taskList[0]).toEqual(task);
  });

  it('handles updateTaskAction when task exists', () => {
    const original = createTask({ id: '1', title: 'Old' });
    const state: TaskListState = { taskList: [original], loading: false, error: null };
    const updated = createTask({ id: '1', title: 'New' });
    const next = reducer(state, updateTaskAction(updated));
    expect(next.taskList[0].title).toBe('New');
  });

  it('ignores updateTaskAction when task does not exist', () => {
    const original = createTask({ id: '1', title: 'Old' });
    const state: TaskListState = { taskList: [original], loading: false, error: null };
    const updated = createTask({ id: '2', title: 'New' });
    const next = reducer(state, updateTaskAction(updated));
    expect(next.taskList[0].title).toBe('Old');
  });

  it('handles deleteTaskAction', () => {
    const task1 = createTask({ id: '1' });
    const task2 = createTask({ id: '2' });
    const state: TaskListState = { taskList: [task1, task2], loading: false, error: null };
    const next = reducer(state, deleteTaskAction('1'));
    expect(next.taskList).toEqual([task2]);
  });
});
