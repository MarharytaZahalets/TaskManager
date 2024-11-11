import React from 'react';

import { SheetProvider } from 'react-native-actions-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

import './sheets';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SheetProvider>
        <AppNavigator />
      </SheetProvider>
    </SafeAreaProvider>
  );
};

export default App;
