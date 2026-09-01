import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../../../src/screens/HomeScreen/HomeScreen';
import { Path } from '../../../src/navigation/constants';

jest.mock('../../../src/viewmodels/TaskListViewModel', () => ({
  useTaskViewModel: () => ({
    taskList: [],
  }),
}));

jest.mock('../../../src/components', () => {
  const ReactNative = jest.requireActual('react-native');
  const { View, Text, TouchableOpacity } = ReactNative;

  return {
    AppSaveAreaView: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
    BaseText: ({ children }: { children: React.ReactNode }) => <Text>{children}</Text>,
    ActionButton: ({
      children,
      onPress,
    }: {
      children: React.ReactNode;
      onPress: () => void;
      containerStyle?: object;
    }) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});

describe('HomeScreen integration', () => {
  const createNavigation = () => ({
    navigate: jest.fn(),
  });

  it('renders without crashing and matches snapshot', () => {
    const navigation = createNavigation();
    const tree = renderer.create(<HomeScreen navigation={navigation as any} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to Tabs -> TaskList when button is pressed', () => {
    const navigation = createNavigation();
    const component = renderer.create(<HomeScreen navigation={navigation as any} />);

    const root = component.root;
    const touchables = root.findAll(
      (node) => node.props.onPress && node.type.displayName !== 'Text',
    );

    // Fallback: just find first TouchableOpacity
    const button = touchables[0] ?? root.findByType(require('react-native').TouchableOpacity);
    renderer.act(() => {
      button.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith(Path.Tabs, {
      screen: Path.TaskList,
    });
  });
});

