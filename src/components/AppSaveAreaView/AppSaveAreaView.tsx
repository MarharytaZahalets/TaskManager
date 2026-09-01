import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';

interface AppSaveAreaViewProps {
  children: React.ReactNode;
  style?: object;
}

const AppSaveAreaView: React.FC<AppSaveAreaViewProps> = ({ children, style }) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

export default AppSaveAreaView;
