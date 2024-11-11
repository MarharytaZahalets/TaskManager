import { isAndroid } from 'core/utils/utils';

const BASE_URL = isAndroid() ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

interface ApiResponse {
  data: Record<string, unknown> | null;
  error: string | null;
}

const apiCall = async (
  method: string,
  url: string,
  data?: object,
): Promise<ApiResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data); // for POST/PUT requests
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      const error = await response.text();
      __DEV__ && console.error(error);
      return {
        data: null,
        error: error,
      };
    }
    return await response.json();
  } catch (error) {
    __DEV__ && console.error(error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const get = (url: string): Promise<ApiResponse> => apiCall('GET', url);
export const post = (url: string, data: object): Promise<ApiResponse> =>
  apiCall('POST', url, data);
export const put = (url: string, data: object): Promise<ApiResponse> =>
  apiCall('PUT', url, data);
export const remove = (url: string): Promise<ApiResponse> => apiCall('DELETE', url);

export default {
  get,
  post,
  put,
  remove,
};
