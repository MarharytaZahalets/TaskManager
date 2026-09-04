import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

import ActionSheet, { type SheetProps } from 'react-native-actions-sheet';

import { BaseText } from '..';
import styles from './styles';

export interface renderItemProps {
  id: string;
  field: string;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface SheetSection {
  title: string;
  items: renderItemProps[];
}

const AppActionSheet: React.FC<SheetProps<'app-action-sheet'>> = ({ payload }) => {
  const sections: SheetSection[] = payload?.sections?.length
    ? payload.sections
    : payload?.items?.length
      ? [{ title: '', items: payload.items }]
      : [];

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    sections.map((section) => section.items.find((item) => item.selected)?.id ?? ''),
  );

  const onItemPress = (sectionIndex: number, item: renderItemProps) => {
    const isOrderSection = sections[sectionIndex]?.title === 'Order';
    const sortBySectionIndex = sections.findIndex((section) => section.title === 'Sort by');
    const selectedSortId =
      sectionIndex === sortBySectionIndex ? item.id : selectedIds[sortBySectionIndex];

    if (isOrderSection && selectedSortId === 'field-default') {
      return;
    }

    setSelectedIds((current) => {
      const next = [...current];
      next[sectionIndex] = item.id;
      const orderSectionIndex = sections.findIndex((section) => section.title === 'Order');
      if (item.id === 'field-default') {
        if (orderSectionIndex >= 0) {
          next[orderSectionIndex] = '';
        }
      } else if (sectionIndex === sortBySectionIndex && orderSectionIndex >= 0 && !next[orderSectionIndex]) {
        next[orderSectionIndex] = 'order-asc';
      }
      return next;
    });
    item.onPress();
  };

  return (
    <ActionSheet
      gestureEnabled
      useBottomSafeAreaPadding
      containerStyle={styles.sheet}
      indicatorStyle={styles.indicator}
    >
      <View style={styles.container}>
        <BaseText style={styles.header} isBold>
          {payload?.title}
        </BaseText>
        {sections.map((section, sectionIndex) => {
          const isOrderSection = section.title === 'Order';
          const sortBySectionIndex = sections.findIndex(
            (currentSection) => currentSection.title === 'Sort by',
          );
          const isDefaultSort =
            sortBySectionIndex >= 0 && selectedIds[sortBySectionIndex] === 'field-default';
          const orderDisabled = isOrderSection && isDefaultSort;

          return (
            <View key={`${section.title}-${sectionIndex}`} style={styles.section}>
              {section.title ? (
                <BaseText style={styles.sectionTitle} isBold>
                  {section.title}
                </BaseText>
              ) : null}
              {isOrderSection ? (
                <View style={styles.chipRow}>
                  {section.items.map((item) => {
                    const isSelected = !orderDisabled && selectedIds[sectionIndex] === item.id;

                    return (
                      <Pressable
                        key={item.id}
                        disabled={orderDisabled}
                        onPress={() => onItemPress(sectionIndex, item)}
                        style={({ pressed }) => [
                          styles.chip,
                          isSelected && styles.chipSelected,
                          orderDisabled && styles.chipDisabled,
                          { opacity: orderDisabled ? 0.4 : pressed ? 0.7 : 1 },
                        ]}
                      >
                        <BaseText
                          isBold={isSelected}
                          style={isSelected ? styles.chipTextSelected : undefined}
                        >
                          {item.field}
                        </BaseText>
                      </Pressable>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.group}>
                  {section.items.map((item, itemIndex) => {
                    const isSelected = selectedIds[sectionIndex] === item.id;

                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => onItemPress(sectionIndex, item)}
                        style={({ pressed }) => [
                          styles.row,
                          itemIndex > 0 && styles.rowDivider,
                          isSelected && styles.rowSelected,
                          { opacity: pressed ? 0.7 : 1 },
                        ]}
                      >
                        <BaseText
                          isBold={isSelected}
                          style={isSelected ? styles.selectedText : undefined}
                        >
                          {item.field}
                        </BaseText>
                        {isSelected ? (
                          <BaseText isBold style={styles.checkmark}>
                            ✓
                          </BaseText>
                        ) : null}
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ActionSheet>
  );
};

export default AppActionSheet;
