import type { TaskStatus } from 'models/TaskList';

type TaskFields = 'title' | 'description' | 'status' | 'createdAt';

export const TASK_FIELDS: Record<TaskFields, string> = {
  title: 'Title',
  description: 'Description',
  status: 'Status',
  createdAt: 'Date',
};

export const TASK_STATUS_FIELDS: Record<TaskStatus, string> = {
  ongoing: 'Ongoing',
  inProcess: 'In Process',
  canceled: 'Cancel',
  done: 'Done',
};
