import React from 'react';
import { Pressable, View } from 'react-native';

import { BaseText } from '..';
import styles from './styles';
import { APP_STATIC_ICONS, STATUS_ICONS } from '../../core/constants/icons';
import { dateString } from '../../core/utils/utils';

import type { Task } from '../../models/TaskList';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onPress }) => {
  const date = dateString(task.createdAt);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.row}>
          {STATUS_ICONS[task.status]}
          <BaseText isBold numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
            {task.title}
          </BaseText>
        </View>

        <BaseText style={styles.description} ellipsizeMode={'tail'} numberOfLines={3}>
          {task.description}
        </BaseText>

        <View style={styles.row}>
          {APP_STATIC_ICONS.calendar}
          <BaseText style={styles.date}>{date}</BaseText>
        </View>
      </Pressable>
    </View>
  );
});

export default TaskCard;
