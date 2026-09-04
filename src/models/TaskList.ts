export type TaskStatus = 'ongoing' | 'inProcess' | 'done' | 'canceled';
export type TaskField = 'id' | 'title' | 'description' | 'status' | 'createdAt';
export type SortField = Exclude<TaskField, 'id'>;
export type SortOption = SortField | 'default';
export type SortOrder = 'asc' | 'desc';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
}

export interface TaskListState {
  taskList: Task[];
  loading: boolean;
  error: string | null;
}
