import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { BaseText } from '..';
import styles from './styles';

interface InputFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  fieldName: string;
  fieldValue: string;
  onChangeText: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  fieldName,
  fieldValue,
  onChangeText,
  ...props
}) => {
  return (
    <View>
      <BaseText style={styles.title} isBold>
        {fieldName}:
      </BaseText>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={fieldValue}
        placeholder={'Enter your title here'}
        {...props}
      />
    </View>
  );
};

export default InputField;
