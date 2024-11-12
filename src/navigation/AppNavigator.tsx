import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './RootNavigator';
import { Theme } from 'core/theme/config';

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={Theme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
