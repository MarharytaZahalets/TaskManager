import React from 'react';
import { Text, TextProps } from 'react-native';

import styles from 'components/BaseText/styles';

interface BaseTextProps extends TextProps {
  children: React.ReactNode;
  isHeader?: boolean;
  isBold?: boolean;
}

const BaseText: React.FC<BaseTextProps> = ({
  children,
  style,
  isHeader,
  isBold,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.textColor,
        styles.text,
        isHeader && styles.header,
        isBold && styles.bold,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default BaseText;
