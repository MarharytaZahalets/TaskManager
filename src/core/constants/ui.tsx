import type { SortField, SortOption, SortOrder, TaskStatus } from '../../models/TaskList';

export const TASK_FIELDS: Record<SortField, string> = {
  title: 'Title',
  description: 'Description',
  status: 'Status',
  createdAt: 'Date',
};

export const SORT_BY_FIELDS: Record<SortOption, string> = {
  default: 'Default order',
  ...TASK_FIELDS,
};

export const SORT_ORDER_FIELDS: Record<SortOrder, string> = {
  asc: '↑ Ascending',
  desc: '↓ Descending',
};

export const TASK_STATUS_FIELDS: Record<TaskStatus, string> = {
  ongoing: 'Ongoing',
  inProcess: 'In process',
  canceled: 'Cancel',
  done: 'Done',
};
