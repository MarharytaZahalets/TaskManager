import React from 'react';

import { ActionButton, BaseText } from '..';
import styles from './styles';

interface TaskCardProps {
  title: string;
  onPress: () => void;
}

const SettingActionButton: React.FC<TaskCardProps> = React.memo(({ title, onPress }) => {
  return (
    <ActionButton onPress={onPress} fullScreenWidth style={styles.button}>
      <BaseText isBold style={styles.buttonText}>
        {title}
      </BaseText>
    </ActionButton>
  );
});

export default SettingActionButton;
