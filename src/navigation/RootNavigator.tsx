import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Path } from 'navigation/constants';
import {
  detailViewScreenOptions,
  homeScreenOptions,
  tabsScreenOptions,
} from 'navigation/screenOptions';
import TabNavigator from 'navigation/TabNavigator';
import { DetailViewScreen, HomeScreen } from 'screens';

import type { RootStackParamList } from 'navigation/types';

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
