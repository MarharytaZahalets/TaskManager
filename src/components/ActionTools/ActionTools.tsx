import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';

import { ActionButton } from 'components';
import styles from 'components/ActionTools/styles';
import { APP_STATIC_ICONS } from 'core/constants/icons';

interface ActionToolsProps {
  onAddTask: () => void;
  onSearchBy: (query: string) => void;
  onSortTaskList: () => void;
}

const ActionTools: React.FC<ActionToolsProps> = React.memo(
  ({ onAddTask, onSearchBy, onSortTaskList }) => {
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
      if (query === '') {
        onSearchBy('');
      }
    }, [query]);

    const onSearch = () => {
      onSearchBy(query);
    };

    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            placeholder={'Search'}
            autoCorrect={false}
            inputMode={'search'}
            onSubmitEditing={onSearch}
          />
          <ActionButton onPress={onSearch}>{APP_STATIC_ICONS.search}</ActionButton>
        </View>
        <ActionButton style={styles.actionIconButton} onPress={onSortTaskList}>
          {APP_STATIC_ICONS.filter}
        </ActionButton>
        <ActionButton style={styles.actionIconButton} onPress={onAddTask}>
          {APP_STATIC_ICONS.circlePlus}
        </ActionButton>
      </View>
    );
  },
);

export default ActionTools;
