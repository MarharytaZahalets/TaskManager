import { isAndroid } from 'core/utils/utils';

import type { Task } from 'models/TaskList';

const BASE_URL = isAndroid() ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

type ApiCallType = {
  (method: 'GET', url: string): Promise<Task[]>;
  (method: 'POST' | 'PUT', url: string, data: Task): Promise<Task>;
  (method: 'DELETE', url: string): Promise<Task>;
};

const apiCall: ApiCallType = async (
  method: 'GET' | 'DELETE' | 'POST' | 'PUT',
  url: string,
  data?: Task,
) => {
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

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      const error = await response.text();
      __DEV__ && console.error(error);
      return method === 'GET' ? [] : ({} as Task);
    }

    return await response.json();
  } catch (error) {
    __DEV__ && console.error(error);
    return method === 'GET' ? [] : ({} as Task);
  }
};

export const get = (url: string): Promise<Task[]> => apiCall('GET', url);
export const post = (url: string, data: Task): Promise<Task> =>
  apiCall('POST', url, data);
export const put = (url: string, data: Task): Promise<Task> => apiCall('PUT', url, data);
export const remove = (url: string): Promise<Task> => apiCall('DELETE', url);

export default {
  get,
  post,
  put,
  remove,
};
