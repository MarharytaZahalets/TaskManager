import { configureStore } from '@reduxjs/toolkit';

import taskListReducer from 'state/taskListSlice';

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
  },
});

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// inferred type: {taskList: TaskListState}
export type AppDispatch = typeof store.dispatch;
