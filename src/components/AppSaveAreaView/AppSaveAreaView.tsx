import React from 'react';
import { SafeAreaView, type Edges } from 'react-native-safe-area-context';

import styles from './styles';

interface AppSaveAreaViewProps {
  children: React.ReactNode;
  style?: object;
  edges?: Edges;
}

const AppSaveAreaView: React.FC<AppSaveAreaViewProps> = ({ children, style, edges }) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

export default AppSaveAreaView;
