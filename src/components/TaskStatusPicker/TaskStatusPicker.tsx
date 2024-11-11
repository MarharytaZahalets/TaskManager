import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { styles } from 'components/TaskStatusPicker/styles';

type TaskStatus = 'ongoing' | 'inProcess' | 'done' | 'canceled';

interface TaskStatusPickerProps {
  currentStatus: TaskStatus;
  onChangeStatus: (status: TaskStatus) => void;
}

// TODO: modal integration needed
const TaskStatusPicker: React.FC<TaskStatusPickerProps> = ({
  currentStatus,
  onChangeStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(currentStatus);

  const handleStatusChange = (status: TaskStatus) => {
    setSelectedStatus(status);
    onChangeStatus(status);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Change Task Status:</Text>
      <Picker
        selectedValue={selectedStatus}
        onValueChange={(itemValue) => handleStatusChange(itemValue as TaskStatus)}
        style={styles.picker}
      >
        <Picker.Item label='Ongoing' value='ongoing' />
        <Picker.Item label='In Process' value='inProcess' />
        <Picker.Item label='Done' value='done' />
        <Picker.Item label='Canceled' value='canceled' />
      </Picker>
    </View>
  );
};

export default TaskStatusPicker;
