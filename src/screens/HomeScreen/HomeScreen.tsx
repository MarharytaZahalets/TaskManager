import React from 'react';

import styles from './styles';
import { AppSaveAreaView, BaseText, BaseButton } from 'components';
import { APP_STATIC_ICONS } from 'core/constants/icons';
import { Path } from 'navigation/constants';
import { useTaskViewModel } from 'viewmodels/TaskListViewModel';

import type { HomeScreenProps } from 'navigation/types';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { taskList } = useTaskViewModel();
  const taskListLength = taskList.length;

  const goToTabs = () => {
    navigation.navigate(Path.Tabs, {
      screen: Path.TaskList,
    });
  };

  return (
    <AppSaveAreaView>
      <BaseText isHeader isBold style={styles.header}>
        👋 Welcome to Task Manager!
      </BaseText>

      <BaseText style={styles.welcomeText}>
        Here, you can easily manage your tasks
      </BaseText>
      {taskListLength === 0 && (
        <BaseText style={styles.welcomeText}>
          I see you still don't have a task, so let's get started🚀
        </BaseText>
      )}
      {taskListLength > 0 && (
        <BaseText style={styles.welcomeText}>
          As I see, you already have {taskList.length} tasks, so good luck getting them
          done🚀
        </BaseText>
      )}
      <BaseText style={styles.welcomeText}>
        Feel free to edit, remove, add, sort and filter tasks as you like
      </BaseText>
      <BaseText style={styles.welcomeText}>
        As a bonus, access your location to see where you are on the map🗺️
      </BaseText>
      <BaseText style={styles.welcomeText}>
        Tap on arrow to bring more magic into your life✨
      </BaseText>

      <BaseButton onPress={goToTabs} containerStyle={styles.buttonContainer}>
        {APP_STATIC_ICONS.arrow}
      </BaseButton>
    </AppSaveAreaView>
  );
};

export default HomeScreen;
