import { sortTaskListBy, toTimestamp } from '../../../src/core/utils/sortTaskList';
import type { SortField, SortOrder, Task } from '../../../src/models/TaskList';

const createTask = (overrides: Partial<Task>): Task => ({
  id: '1',
  title: 'Alpha',
  description: 'Zebra',
  createdAt: new Date('2024-11-10'),
  status: 'ongoing',
  ...overrides,
});

const tasks: Task[] = [
  createTask({
    id: '1',
    title: 'Navigation setup',
    description: 'Implement navigation',
    createdAt: '2024-11-5' as unknown as Date,
    status: 'done',
  }),
  createTask({
    id: '2',
    title: 'Setup json-server',
    description: 'Read documentation',
    createdAt: '2024-11-10' as unknown as Date,
    status: 'inProcess',
  }),
  createTask({
    id: '3',
    title: 'Fix all bugs',
    description: 'Test the application',
    createdAt: '2026-09-04T12:19:31.386Z' as unknown as Date,
    status: 'canceled',
  }),
];

const combinations: Array<[SortField, SortOrder]> = [
  ['title', 'asc'],
  ['title', 'desc'],
  ['description', 'asc'],
  ['description', 'desc'],
  ['status', 'asc'],
  ['status', 'desc'],
  ['createdAt', 'asc'],
  ['createdAt', 'desc'],
];

describe('sortTaskListBy', () => {
  it.each(combinations)('sorts by %s %s without dropping items', (field, order) => {
    const sorted = sortTaskListBy(tasks, field, order);

    expect(sorted).toHaveLength(tasks.length);
    expect(sorted.map((task) => task.id).sort()).toEqual(['1', '2', '3']);
  });

  it('sorts titles ascending and descending', () => {
    expect(sortTaskListBy(tasks, 'title', 'asc').map((task) => task.title)).toEqual([
      'Fix all bugs',
      'Navigation setup',
      'Setup json-server',
    ]);
    expect(sortTaskListBy(tasks, 'title', 'desc').map((task) => task.title)).toEqual([
      'Setup json-server',
      'Navigation setup',
      'Fix all bugs',
    ]);
  });

  it('sorts descriptions ascending and descending', () => {
    expect(sortTaskListBy(tasks, 'description', 'asc').map((task) => task.description)).toEqual([
      'Implement navigation',
      'Read documentation',
      'Test the application',
    ]);
    expect(sortTaskListBy(tasks, 'description', 'desc').map((task) => task.description)).toEqual([
      'Test the application',
      'Read documentation',
      'Implement navigation',
    ]);
  });

  it('sorts statuses ascending and descending', () => {
    expect(sortTaskListBy(tasks, 'status', 'asc').map((task) => task.status)).toEqual([
      'canceled',
      'done',
      'inProcess',
    ]);
    expect(sortTaskListBy(tasks, 'status', 'desc').map((task) => task.status)).toEqual([
      'inProcess',
      'done',
      'canceled',
    ]);
  });

  it('sorts createdAt chronologically rather than as display strings', () => {
    const lexicographic = [...tasks].sort((a, b) =>
      String(a.createdAt).localeCompare(String(b.createdAt)),
    );
    expect(lexicographic.map((task) => task.id)).toEqual(['2', '1', '3']);

    expect(sortTaskListBy(tasks, 'createdAt', 'asc').map((task) => task.id)).toEqual([
      '1',
      '2',
      '3',
    ]);
    expect(sortTaskListBy(tasks, 'createdAt', 'desc').map((task) => task.id)).toEqual([
      '3',
      '2',
      '1',
    ]);
    expect(
      toTimestamp(sortTaskListBy(tasks, 'createdAt', 'asc')[0].createdAt),
    ).toBeLessThan(toTimestamp(sortTaskListBy(tasks, 'createdAt', 'asc')[2].createdAt));
  });

  it('does not mutate the original array', () => {
    const original = tasks.map((task) => task.id);
    sortTaskListBy(tasks, 'title', 'desc');
    expect(tasks.map((task) => task.id)).toEqual(original);
  });
});
