import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Path } from 'navigation/constants';
import {
  geolocationScreenOptions,
  tabNavigatorOptions,
  taskListScreenOptions,
} from 'navigation/screenOptions';
import { GeolocationScreen, SettingsScreen, TaskListScreen } from 'screens';

import type { TabParamList } from 'navigation/types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName={Path.TaskList} screenOptions={tabNavigatorOptions}>
      <Tab.Screen
        name={Path.TaskList}
        component={TaskListScreen}
        options={taskListScreenOptions}
      />
      <Tab.Screen
        name={Path.Geolocation}
        component={GeolocationScreen}
        options={geolocationScreenOptions}
      />
      <Tab.Screen name={Path.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
