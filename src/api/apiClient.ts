import { Platform } from 'react-native';

const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const apiCall = async <T>(method: string, url: string, data?: object): Promise<T> => {
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
      throw new Error(`Error ${response.status}: ${error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const get = <T>(url: string): Promise<T> => apiCall('GET', url);
export const post = <T>(url: string, data: object): Promise<T> =>
  apiCall('POST', url, data);
export const put = <T>(url: string, data: object): Promise<T> =>
  apiCall('PUT', url, data);
export const remove = <T>(url: string): Promise<T> => apiCall('DELETE', url);

export default {
  get,
  post,
  put,
  remove,
};
