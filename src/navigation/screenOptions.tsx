import React from 'react';

import { GeolocationIcon, SettingsIcon, TaskListIcon } from 'assets/icons/svg';
import { Colors } from 'core/theme/colors';
import { Path } from 'navigation/constants';

import type {
  BottomTabNavigationOptions,
  BottomTabOptionsArgs,
} from '@react-navigation/bottom-tabs';
import type {
  NativeStackNavigationOptions,
  NativeStackOptionsArgs,
} from '@react-navigation/native-stack';
import type { RootStackParamList, TabBarIconProps, TabParamList } from 'navigation/types';

// *** Options for Root Navigator Screens ***
export const homeScreenOptions: NativeStackNavigationOptions = { headerShown: false };

export const tabsScreenOptions: NativeStackNavigationOptions = { headerShown: false };

export const detailViewScreenOptions = ({
  route,
}: NativeStackOptionsArgs<
  RootStackParamList,
  typeof Path.DetailView
>): NativeStackNavigationOptions => {
  return {
    title: route.params?.title || 'Details',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: Colors.text,
  };
};

// *** Options for Tab Navigator ***
export const tabNavigatorOptions = ({
  route,
}: BottomTabOptionsArgs<TabParamList>): BottomTabNavigationOptions => {
  const tabBarIcon = ({ focused }: TabBarIconProps): React.ReactNode => {
    const color: string = focused ? Colors.accent : Colors.neutral;
    switch (route.name) {
      case Path.TaskList:
        return <TaskListIcon width={25} height={25} color={color} />;
      case Path.Geolocation:
        return <GeolocationIcon width={25} height={25} color={color} />;
      case Path.Settings:
        return <SettingsIcon width={25} height={25} color={color} />;
      default:
        return null;
    }
  };

  return {
    tabBarIcon,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerBackButtonDisplayMode: 'minimal',
    animation: 'fade',
  };
};

// *** Options for Tab Navigator Screens ***
export const taskListScreenOptions: BottomTabNavigationOptions = {
  title: 'Tasks',
};

export const geolocationScreenOptions: BottomTabNavigationOptions = {
  title: 'My Location',
};
