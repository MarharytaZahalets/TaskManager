import React from 'react';
import { Pressable, View } from 'react-native';

import styles from 'components/ActionButton/styles';

interface ActionButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  containerStyle?: object;
  contentStyle?: object;
  fullScreenWidth?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  style,
  containerStyle,
  contentStyle,
  children,
  fullScreenWidth = false,
}) => {
  if (fullScreenWidth) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.button,
          style,
          { opacity: pressed ? 0.7 : 1 }, // Optional press effect
        ]}
        onPress={onPress}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </Pressable>
    );
  }
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          style,
          { opacity: pressed ? 0.7 : 1 }, // Optional press effect
        ]}
        onPress={onPress}
      >
        <View style={styles.content}>{children}</View>
      </Pressable>
    </View>
  );
};

export default ActionButton;
