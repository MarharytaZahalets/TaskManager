import { registerSheet, type SheetDefinition } from 'react-native-actions-sheet';

import AppActionSheet, {
  type renderItemProps,
} from 'components/AppActionSheet/AppActionSheet';

registerSheet('app-action-sheet', AppActionSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'app-action-sheet': SheetDefinition<{
      payload: {
        title: string;
        items: renderItemProps[];
      };
    }>;
  }
}

export {};
