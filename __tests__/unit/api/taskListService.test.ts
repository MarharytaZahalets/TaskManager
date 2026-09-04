import apiClient from '../../../src/api/apiClient';
import service from '../../../src/api/taskListService';
import type { Task } from '../../../src/models/TaskList';

jest.mock('../../../src/api/apiClient');

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

const createTask = (overrides: Partial<Task> = {}): Task => ({
  id: '1',
  title: 'Test',
  description: 'D',
  createdAt: new Date(),
  status: 'ongoing',
  ...overrides,
});

describe('taskListService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getTasks delegates to apiClient.get', async () => {
    const tasks = [createTask({ id: '1' })];
    mockedApiClient.get.mockResolvedValueOnce(tasks);

    const result = await service.getTasks();

    expect(mockedApiClient.get).toHaveBeenCalledWith('/taskList');
    expect(result).toEqual(tasks);
  });

  it('createTask delegates to apiClient.post', async () => {
    const task = createTask({ id: '1' });
    mockedApiClient.post.mockResolvedValueOnce(task);

    const result = await service.createTask(task);

    expect(mockedApiClient.post).toHaveBeenCalledWith('/taskList', task);
    expect(result).toEqual(task);
  });

  it('updateTask delegates to apiClient.put', async () => {
    const task = createTask({ id: '1' });
    mockedApiClient.put.mockResolvedValueOnce(task);

    const result = await service.updateTask('1', task);

    expect(mockedApiClient.put).toHaveBeenCalledWith('/taskList/1', task);
    expect(result).toEqual(task);
  });

  it('deleteTask delegates to apiClient.remove', async () => {
    const task = createTask({ id: '1' });
    mockedApiClient.remove.mockResolvedValueOnce(task);

    const result = await service.deleteTask('1');

    expect(mockedApiClient.remove).toHaveBeenCalledWith('/taskList/1');
    expect(result).toEqual(task);
  });

  it('sortTasks delegates to apiClient.get with query params', async () => {
    const tasks = [createTask({ id: '1' })];
    mockedApiClient.get.mockResolvedValueOnce(tasks);

    const result = await service.sortTasks('title', 'asc');

    expect(mockedApiClient.get).toHaveBeenCalledWith('/taskList?_sort=title');
    expect(result).toEqual(tasks);
  });

  it('sortTasks prefixes the field with - for descending order', async () => {
    mockedApiClient.get.mockResolvedValueOnce([]);

    await service.sortTasks('status', 'desc');

    expect(mockedApiClient.get).toHaveBeenCalledWith('/taskList?_sort=-status');
  });

  it('sortTasks uses createdAt for date sorting', async () => {
    mockedApiClient.get.mockResolvedValueOnce([]);

    await service.sortTasks('createdAt', 'asc');
    expect(mockedApiClient.get).toHaveBeenCalledWith('/taskList?_sort=createdAt');

    await service.sortTasks('createdAt', 'desc');
    expect(mockedApiClient.get).toHaveBeenCalledWith('/taskList?_sort=-createdAt');
  });
});

