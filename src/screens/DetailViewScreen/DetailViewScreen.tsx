// screens/DetailViewScreen.tsx
import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import {
  ActionButton,
  AppSaveAreaView,
  BaseText,
  ErrorState,
  InputField,
} from '../../components';
import { TASK_FIELDS, TASK_STATUS_FIELDS } from '../../core/constants/ui';
import { Colors } from '../../core/theme/colors';
import styles from './styles';
import { useDetailViewModel } from '../../viewmodels/DetailViewViewModel';

import type { DetailViewScreenProps } from '../../navigation/types';

const DetailViewScreen: React.FC<DetailViewScreenProps> = ({ navigation, route }) => {
  const {
    updatedTask,
    loading,
    error,
    setTitle,
    setDescription,
    openChangeStatus,
    onSave,
    onDelete,
    onRetry,
  } = useDetailViewModel(route, navigation);

  console.log('loading', loading);

  return (
    <AppSaveAreaView style={styles.container} edges={['left', 'right']}>
      {loading ? <ActivityIndicator color={Colors.primary} size={'large'}/> : null}
      {error ? <ErrorState compact message={error} onRetry={onRetry} /> : null}
      {!loading && !error && (
        <>
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
            Status:
          </BaseText>
          <ActionButton
            style={styles.statusButton}
            contentStyle={styles.statusButtonContent}
            fullScreenWidth
            onPress={openChangeStatus}
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
      </>
    )}
    </AppSaveAreaView>
  );
};

export default DetailViewScreen;
