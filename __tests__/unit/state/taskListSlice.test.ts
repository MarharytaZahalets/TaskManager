import reducer, {
  addTaskAction,
  deleteTaskAction,
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
  const initialState: TaskListState = { taskList: [] };

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
    const state: TaskListState = { taskList: [original] };
    const updated = createTask({ id: '1', title: 'New' });
    const next = reducer(state, updateTaskAction(updated));
    expect(next.taskList[0].title).toBe('New');
  });

  it('ignores updateTaskAction when task does not exist', () => {
    const original = createTask({ id: '1', title: 'Old' });
    const state: TaskListState = { taskList: [original] };
    const updated = createTask({ id: '2', title: 'New' });
    const next = reducer(state, updateTaskAction(updated));
    expect(next.taskList[0].title).toBe('Old');
  });

  it('handles deleteTaskAction', () => {
    const task1 = createTask({ id: '1' });
    const task2 = createTask({ id: '2' });
    const state: TaskListState = { taskList: [task1, task2] };
    const next = reducer(state, deleteTaskAction('1'));
    expect(next.taskList).toEqual([task2]);
  });
});

