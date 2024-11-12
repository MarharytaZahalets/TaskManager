import React from 'react';
import { View } from 'react-native';

import ActionSheet, { type SheetProps } from 'react-native-actions-sheet';

import { ActionButton, BaseText } from 'components';
import styles from 'components/AppActionSheet/styles';

export interface renderItemProps {
  id: string;
  field: string;
  onPress: () => void;
}

const AppActionSheet: React.FC<SheetProps<'app-action-sheet'>> = ({ payload }) => {
  return (
    <ActionSheet>
      <View style={styles.container}>
        <BaseText style={styles.header} isBold>
          {payload?.title}
        </BaseText>
        {payload?.items.length &&
          payload?.items.map((item) => (
            <ActionButton
              key={item.id}
              fullScreenWidth
              style={styles.item}
              onPress={item.onPress}
            >
              <BaseText>{item.field}</BaseText>
            </ActionButton>
          ))}
      </View>
    </ActionSheet>
  );
};

export default AppActionSheet;
