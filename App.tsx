import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
//import { useColorScheme } from 'react-native';

//import { Colors } from 'react-native/Libraries/NewAppScreen';

const App: React.FC = () => {
  //const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return <AppNavigator />;
};

export default App;
