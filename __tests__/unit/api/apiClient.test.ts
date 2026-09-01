import apiClient, { get, post, put, remove } from '../../../src/api/apiClient';
import type { Task } from '../../../src/models/TaskList';

declare const global: any;

describe('apiClient', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    mockFetch.mockReset();
  });

  const mockResponse = (ok: boolean, body: unknown) => {
    return {
      ok,
      json: jest.fn().mockResolvedValue(body),
      text: jest.fn().mockResolvedValue(typeof body === 'string' ? body : JSON.stringify(body)),
    };
  };

  it('get calls fetch with GET and returns tasks on success', async () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Test',
        description: 'D',
        createdAt: new Date(),
        status: 'ongoing',
      },
    ];
    mockFetch.mockResolvedValue(mockResponse(true, tasks));

    const result = await get('/taskList');

    expect(mockFetch).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(tasks);
  });

  it('get returns empty array on error', async () => {
    mockFetch.mockResolvedValue(mockResponse(false, 'error'));

    const result = await get('/taskList');
    expect(result).toEqual([]);
  });

  it('post sends body and returns task on success', async () => {
    const task: Task = {
      id: '1',
      title: 'Test',
      description: 'D',
      createdAt: new Date(),
      status: 'ongoing',
    };
    mockFetch.mockResolvedValue(mockResponse(true, task));

    const result = await post('/taskList', task);

    expect(mockFetch).toHaveBeenCalled();
    expect(result).toEqual(task);
  });

  it('post returns empty task on error', async () => {
    const task: Task = {
      id: '1',
      title: 'Test',
      description: 'D',
      createdAt: new Date(),
      status: 'ongoing',
    };
    mockFetch.mockResolvedValue(mockResponse(false, 'error'));

    const result = await post('/taskList', task);
    expect(result).toEqual({} as Task);
  });

  it('put and remove delegate to apiClient', async () => {
    const task: Task = {
      id: '1',
      title: 'Test',
      description: 'D',
      createdAt: new Date(),
      status: 'ongoing',
    };

    const spyPut = jest.spyOn(apiClient, 'put');
    const spyRemove = jest.spyOn(apiClient, 'remove');

    await put('/taskList/1', task);
    await remove('/taskList/1');

    expect(spyPut).toHaveBeenCalledWith('/taskList/1', task);
    expect(spyRemove).toHaveBeenCalledWith('/taskList/1');
  });
}
);
