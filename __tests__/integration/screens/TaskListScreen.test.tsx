import React from 'react';
import renderer from 'react-test-renderer';

import TaskListScreen from '../../../src/screens/TaskListScreen/TaskListScreen';
import { Path } from '../../../src/navigation/constants';
import type { Task } from '../../../src/models/TaskList';

const mockSortActionList = jest.fn();
const mockSearchTaskList = jest.fn();
const mockFetchTaskList = jest.fn();

const task: Task = {
  id: '1',
  title: 'Task 1',
  description: 'Description',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  status: 'ongoing',
};

const mockVm = {
  taskList: [task] as Task[],
  loading: false,
  error: null as string | null,
  fetchTaskList: mockFetchTaskList,
  sortActionList: mockSortActionList,
  searchTaskList: mockSearchTaskList,
};

jest.mock('../../../src/viewmodels/TaskListViewModel', () => ({
  useTaskViewModel: () => mockVm,
}));

jest.mock('../../../src/components', () => {
  const ReactNative = jest.requireActual('react-native');
  const { View, Text, TouchableOpacity, TextInput } = ReactNative;

  return {
    AppSaveAreaView: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
    TaskCard: ({ onPress, task: t }: { onPress: () => void; task: Task }) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{t.title}</Text>
      </TouchableOpacity>
    ),
    EmptyComponent: ({ title }: { title: string }) => <Text>{title}</Text>,
    ErrorState: ({ message, onRetry }: { message: string; onRetry: () => void }) => (
      <TouchableOpacity onPress={onRetry}>
        <Text>{message}</Text>
      </TouchableOpacity>
    ),
    ActionTools: ({
      onAddTask,
      onSearchBy,
      onSortTaskList,
    }: {
      onAddTask: () => void;
      onSearchBy: (q: string) => void;
      onSortTaskList: () => void;
    }) => (
      <View>
        <TouchableOpacity onPress={onAddTask}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSortTaskList}>
          <Text>Sort</Text>
        </TouchableOpacity>
        <TextInput onChangeText={onSearchBy} value="" />
      </View>
    ),
  };
});

describe('TaskListScreen integration', () => {
  const createNavigation = () => ({
    navigate: jest.fn(),
  });

  beforeEach(() => {
    mockVm.taskList = [task];
    mockVm.loading = false;
    mockVm.error = null;
    mockFetchTaskList.mockClear();
  });

  const findPressable = (root: renderer.ReactTestInstance, label: string) => {
    const textNode = root.findByProps({ children: label });
    let current: renderer.ReactTestInstance | null = textNode;
    while (current && typeof current.props.onPress !== 'function') {
      current = current.parent;
    }
    return current;
  };

  const renderScreen = (navigation: ReturnType<typeof createNavigation>) => {
    let component: renderer.ReactTestRenderer;
    renderer.act(() => {
      component = renderer.create(<TaskListScreen navigation={navigation as never} />);
    });
    return component!;
  };

  it('renders list of tasks and matches snapshot', () => {
    const navigation = createNavigation();
    expect(renderScreen(navigation).toJSON()).toMatchSnapshot();
  });

  it('navigates to DetailView when task is pressed', () => {
    const navigation = createNavigation();
    const root = renderScreen(navigation).root;

    const taskCard = findPressable(root, task.title);

    renderer.act(() => {
      taskCard?.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith(Path.DetailView, expect.objectContaining(task));
  });

  it('calls sortActionList when sort is pressed', () => {
    const navigation = createNavigation();
    const root = renderScreen(navigation).root;

    const sortButton = findPressable(root, 'Sort');
    renderer.act(() => {
      sortButton?.props.onPress();
    });

    expect(mockSortActionList).toHaveBeenCalled();
  });

  it('calls searchTaskList when search text changes', () => {
    const navigation = createNavigation();
    const root = renderScreen(navigation).root;

    const textInput = root.findByType(require('react-native').TextInput);
    renderer.act(() => {
      textInput.props.onChangeText('query');
    });

    expect(mockSearchTaskList).toHaveBeenCalledWith('query');
  });

  it('shows a loading indicator when loading with no tasks', () => {
    mockVm.taskList = [];
    mockVm.loading = true;
    const navigation = createNavigation();
    const component = renderScreen(navigation);

    expect(component.root.findByType(require('react-native').ActivityIndicator)).toBeTruthy();
  });

  it('shows empty success state when there are no tasks', () => {
    mockVm.taskList = [];
    const navigation = createNavigation();
    const component = renderScreen(navigation);

    expect(component.root.findByProps({ children: 'No tasks' })).toBeTruthy();
  });

  it('shows error state and retries via the view model', () => {
    mockVm.taskList = [];
    mockVm.error = 'HTTP 500: boom';
    const navigation = createNavigation();
    const retry = findPressable(
      renderScreen(navigation).root,
      'HTTP 500: boom',
    );

    renderer.act(() => {
      retry?.props.onPress();
    });

    expect(mockFetchTaskList).toHaveBeenCalled();
  });
});

