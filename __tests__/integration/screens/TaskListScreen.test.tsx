import React from 'react';
import renderer from 'react-test-renderer';

import TaskListScreen from '../../../src/screens/TaskListScreen/TaskListScreen';
import { Path } from '../../../src/navigation/constants';
import type { Task } from '../../../src/models/TaskList';

const mockSortActionList = jest.fn();
const mockSearchTaskList = jest.fn();

const task: Task = {
  id: '1',
  title: 'Task 1',
  description: 'Description',
  createdAt: new Date(),
  status: 'ongoing',
};

jest.mock('../../../src/viewmodels/TaskListViewModel', () => ({
  useTaskViewModel: () => ({
    taskList: [task],
    sortActionList: mockSortActionList,
    searchTaskList: mockSearchTaskList,
  }),
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

  it('renders list of tasks and matches snapshot', () => {
    const navigation = createNavigation();
    const tree = renderer.create(<TaskListScreen navigation={navigation as any} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to DetailView when task is pressed', () => {
    const navigation = createNavigation();
    const component = renderer.create(<TaskListScreen navigation={navigation as any} />);
    const root = component.root;

    const taskCard = root.findByProps({ children: task.title }).parent;

    renderer.act(() => {
      taskCard.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith(Path.DetailView, expect.objectContaining(task));
  });

  it('calls sortActionList when sort is pressed', () => {
    const navigation = createNavigation();
    const component = renderer.create(<TaskListScreen navigation={navigation as any} />);
    const root = component.root;

    const sortButton = root.findByProps({ children: 'Sort' }).parent;
    renderer.act(() => {
      sortButton.props.onPress();
    });

    expect(mockSortActionList).toHaveBeenCalled();
  });

  it('calls searchTaskList when search text changes', () => {
    const navigation = createNavigation();
    const component = renderer.create(<TaskListScreen navigation={navigation as any} />);
    const root = component.root;

    const textInput = root.findByType(require('react-native').TextInput);
    renderer.act(() => {
      textInput.props.onChangeText('query');
    });

    expect(mockSearchTaskList).toHaveBeenCalledWith('query');
  });
});

