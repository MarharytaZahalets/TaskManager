import { get, post, put, remove } from '../../../src/api/apiClient';
import type { Task } from '../../../src/models/TaskList';

const sampleTask: Task = {
  id: '1',
  title: 'Test',
  description: 'D',
  createdAt: new Date(),
  status: 'ongoing',
};

describe('apiClient', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    mockFetch.mockReset();
    jest.spyOn(global, 'setTimeout').mockImplementation((callback: TimerHandler) => {
      if (typeof callback === 'function') {
        callback();
      }
      return 0 as unknown as ReturnType<typeof setTimeout>;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockResponse = (ok: boolean, body: unknown, status = ok ? 200 : 500) => {
    return {
      ok,
      status,
      json: jest.fn().mockResolvedValue(body),
      text: jest
        .fn()
        .mockResolvedValue(typeof body === 'string' ? body : JSON.stringify(body)),
    };
  };

  it('get succeeds on the first attempt', async () => {
    const tasks: Task[] = [sampleTask];
    mockFetch.mockResolvedValue(mockResponse(true, tasks));

    const result = await get('/taskList');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tasks);
  });

  it('get treats a successful empty array as success', async () => {
    mockFetch.mockResolvedValue(mockResponse(true, []));

    await expect(get('/taskList')).resolves.toEqual([]);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('get retries a retryable failure and succeeds on the second attempt', async () => {
    mockFetch
      .mockRejectedValueOnce(new TypeError('Network request failed'))
      .mockResolvedValueOnce(mockResponse(true, [sampleTask]));

    await expect(get('/taskList')).resolves.toEqual([sampleTask]);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('get retries HTTP 500 once and succeeds on retry', async () => {
    mockFetch
      .mockResolvedValueOnce(mockResponse(false, 'error', 500))
      .mockResolvedValueOnce(mockResponse(true, [sampleTask]));

    await expect(get('/taskList')).resolves.toEqual([sampleTask]);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('get throws the final error after retryable failures are exhausted', async () => {
    mockFetch.mockResolvedValue(mockResponse(false, 'error', 500));

    await expect(get('/taskList')).rejects.toThrow('HTTP 500: error');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('get does not retry a non-retryable HTTP error', async () => {
    mockFetch.mockResolvedValue(mockResponse(false, '', 404));

    await expect(get('/taskList')).rejects.toThrow('HTTP 404');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('get does not retry invalid JSON on a successful HTTP response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockRejectedValue(new SyntaxError('Unexpected token')),
      text: jest.fn().mockResolvedValue(''),
    });

    await expect(get('/taskList')).rejects.toThrow('Unexpected token');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('post does not retry HTTP 500', async () => {
    mockFetch.mockResolvedValue(mockResponse(false, 'error', 500));

    await expect(post('/taskList', sampleTask)).rejects.toThrow('HTTP 500: error');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('post sends body and returns task on success', async () => {
    mockFetch.mockResolvedValue(mockResponse(true, sampleTask));

    const result = await post('/taskList', sampleTask);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(sampleTask);
  });

  it('post rejects on HTTP 400 without retry', async () => {
    mockFetch.mockResolvedValue(mockResponse(false, 'error', 400));

    await expect(post('/taskList', sampleTask)).rejects.toThrow('HTTP 400: error');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('put and remove call fetch and return data on success', async () => {
    mockFetch.mockResolvedValue(mockResponse(true, sampleTask));

    await expect(put('/taskList/1', sampleTask)).resolves.toEqual(sampleTask);
    await expect(remove('/taskList/1')).resolves.toEqual(sampleTask);

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('put and remove reject on HTTP error without retry', async () => {
    mockFetch.mockResolvedValue(mockResponse(false, 'error', 500));

    await expect(put('/taskList/1', sampleTask)).rejects.toThrow('HTTP 500: error');
    await expect(remove('/taskList/1')).rejects.toThrow('HTTP 500: error');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
