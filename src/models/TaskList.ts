export type TaskStatus = 'ongoing' | 'inProcess' | 'done' | 'canceled';
export type TaskField = 'id' | 'title' | 'description' | 'status' | 'createdAt';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
}

export interface TaskListState {
  taskList: Task[];
}
