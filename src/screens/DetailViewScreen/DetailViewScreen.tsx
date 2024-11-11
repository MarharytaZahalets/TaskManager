// screens/DetailViewScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';

import { AppSaveAreaView, BaseText } from 'components';
import BaseButton from 'components/BaseButton/BaseButton';
import InputField from 'components/InputField/InputField';
import { TASK_FIELDS, TASK_STATUS_FIELDS } from 'core/constants/ui';
import styles from 'screens/DetailViewScreen/styles';
import { useDetailViewModel } from 'viewmodels/DetailViewViewModel';

import type { DetailViewScreenProps } from 'navigation/types';

const DetailViewScreen: React.FC<DetailViewScreenProps> = ({ navigation, route }) => {
  const {
    updatedTitle,
    updatedDescription,
    updatedStatus,
    setUpdatedTitle,
    setUpdatedDescription,
    showStatusAlert,
    onSave,
    onDelete,
  } = useDetailViewModel(route, navigation);

  return (
    <AppSaveAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputField
          fieldName={TASK_FIELDS.title}
          fieldValue={updatedTitle}
          onChangeText={(value) => setUpdatedTitle(value)}
        />
        <InputField
          fieldName={TASK_FIELDS.description}
          fieldValue={updatedDescription}
          multiline
          returnKeyType='done'
          onChangeText={(value) => setUpdatedDescription(value)}
        />
        <BaseText style={styles.title} isBold>
          Change status:
        </BaseText>
        <BaseButton
          style={styles.statusButton}
          contentStyle={styles.statusButtonContent}
          fullScreenWidth
          onPress={showStatusAlert}
        >
          <BaseText isBold>{TASK_STATUS_FIELDS[updatedStatus]}</BaseText>
        </BaseButton>
      </ScrollView>
      <View style={styles.actionButtonsContainer}>
        <BaseButton onPress={onSave} fullScreenWidth style={styles.saveButton}>
          <BaseText isBold style={styles.actionButtonText}>
            Save
          </BaseText>
        </BaseButton>
        <View style={styles.actionButtonIndent} />
        <BaseButton onPress={onDelete} fullScreenWidth style={styles.deleteButton}>
          <BaseText isBold style={styles.actionButtonText}>
            Delete
          </BaseText>
        </BaseButton>
      </View>
    </AppSaveAreaView>
  );
};

export default DetailViewScreen;
