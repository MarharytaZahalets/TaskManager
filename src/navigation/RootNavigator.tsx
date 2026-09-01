import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Path } from './constants';
import {
  detailViewScreenOptions,
  homeScreenOptions,
  tabsScreenOptions,
} from './screenOptions';
import TabNavigator from './TabNavigator';
import { DetailViewScreen, HomeScreen } from '../screens';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={Path.Home}>
      <Stack.Screen name={Path.Home} component={HomeScreen} options={homeScreenOptions} />
      <Stack.Screen
        name={Path.Tabs}
        component={TabNavigator}
        options={tabsScreenOptions}
      />
      <Stack.Screen
        name={Path.DetailView}
        component={DetailViewScreen}
        options={detailViewScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
