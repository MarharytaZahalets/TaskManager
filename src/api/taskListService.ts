import apiClient, { type ApiResponse } from 'api/apiClient';
import { Task } from 'models/TaskList';

export const getTasks = async (): Promise<ApiResponse> =>
  await apiClient.get('/taskList');

export const createTask = async (task: Task): Promise<ApiResponse> =>
  await apiClient.post('/taskList', task);

export const updateTask = async (id: string, task: Task): Promise<ApiResponse> =>
  await apiClient.put(`/taskList/${id}`, task);

export const deleteTask = async (id: string): Promise<ApiResponse> =>
  await apiClient.remove(`/taskList/${id}`);

export const sortTasks = async (
  field: keyof Task,
  order: 'asc' | 'desc',
): Promise<ApiResponse> =>
  await apiClient.get(`/taskList?_sort=${field}&_order=${order}`);

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  sortTasks,
};
