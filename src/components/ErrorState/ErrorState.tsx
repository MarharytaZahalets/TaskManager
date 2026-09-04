import React from 'react';
import { View } from 'react-native';

import { ActionButton, BaseText } from '..';
import styles from './styles';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  compact?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, compact = false }) => {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <BaseText isBold style={styles.title}>
        Something went wrong
      </BaseText>
      {/* <BaseText style={styles.message}>{message}</BaseText> */}
      <ActionButton onPress={onRetry} style={styles.retryButton}>
        <BaseText isBold style={styles.retryText}>
          Retry
        </BaseText>
      </ActionButton>
    </View>
  );
};

export default ErrorState;
