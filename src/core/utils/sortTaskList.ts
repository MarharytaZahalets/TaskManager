import type { SortField, SortOrder, Task } from '../../models/TaskList';

export const toTimestamp = (value: Date | string): number => {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const compareTasks = (a: Task, b: Task, field: SortField): number => {
  if (field === 'createdAt') {
    return toTimestamp(a.createdAt) - toTimestamp(b.createdAt);
  }

  return String(a[field]).localeCompare(String(b[field]), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
};

export const sortTaskListBy = (
  tasks: Task[],
  field: SortField,
  order: SortOrder,
): Task[] => {
  const direction = order === 'asc' ? 1 : -1;

  return [...tasks].sort((left, right) => compareTasks(left, right, field) * direction);
};
