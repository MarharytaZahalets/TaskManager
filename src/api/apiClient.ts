import { HttpError } from './HttpError';
import { withRetry } from './withRetry';
import { isAndroid } from '../core/utils/utils';

import type { Task } from '../models/TaskList';

const BASE_URL = isAndroid() ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const apiCall = async <T>(
  method: 'GET' | 'DELETE' | 'POST' | 'PUT',
  url: string,
  data?: Task,
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    const errorText = (await response.text()).trim();
    throw new HttpError(
      response.status,
      errorText ? `HTTP ${response.status}: ${errorText}` : `HTTP ${response.status}`,
    );
  }

  return (await response.json()) as T;
};

export const get = (url: string): Promise<Task[]> =>
  withRetry(() => apiCall<Task[]>('GET', url));

export const post = (url: string, data: Task): Promise<Task> =>
  apiCall<Task>('POST', url, data);
export const put = (url: string, data: Task): Promise<Task> =>
  apiCall<Task>('PUT', url, data);
export const remove = (url: string): Promise<Task> => apiCall<Task>('DELETE', url);

export default {
  get,
  post,
  put,
  remove,
};
