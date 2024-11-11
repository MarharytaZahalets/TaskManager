// screens/DetailViewScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';

import { ActionButton, AppSaveAreaView, BaseText, InputField } from 'components';
import { TASK_FIELDS, TASK_STATUS_FIELDS } from 'core/constants/ui';
import styles from 'screens/DetailViewScreen/styles';
import { useDetailViewModel } from 'viewmodels/DetailViewViewModel';

import type { DetailViewScreenProps } from 'navigation/types';

const DetailViewScreen: React.FC<DetailViewScreenProps> = ({ navigation, route }) => {
  const { updatedTask, setTitle, setDescription, showStatusAlert, onSave, onDelete } =
    useDetailViewModel(route, navigation);

  return (
    <AppSaveAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputField
          fieldName={TASK_FIELDS.title}
          fieldValue={updatedTask.title}
          onChangeText={(value) => setTitle(value)}
        />
        <InputField
          fieldName={TASK_FIELDS.description}
          fieldValue={updatedTask.description}
          multiline
          returnKeyType='done'
          onChangeText={(value) => setDescription(value)}
        />
        <BaseText style={styles.title} isBold>
          Change status:
        </BaseText>
        <ActionButton
          style={styles.statusButton}
          contentStyle={styles.statusButtonContent}
          fullScreenWidth
          onPress={showStatusAlert}
        >
          <BaseText isBold>{TASK_STATUS_FIELDS[updatedTask.status]}</BaseText>
        </ActionButton>
      </ScrollView>
      <View style={styles.actionButtonsContainer}>
        <ActionButton onPress={onSave} fullScreenWidth style={styles.saveButton}>
          <BaseText isBold style={styles.actionButtonText}>
            Save
          </BaseText>
        </ActionButton>
        <View style={styles.actionButtonIndent} />
        <ActionButton onPress={onDelete} fullScreenWidth style={styles.deleteButton}>
          <BaseText isBold style={styles.actionButtonText}>
            Delete
          </BaseText>
        </ActionButton>
      </View>
    </AppSaveAreaView>
  );
};

export default DetailViewScreen;
