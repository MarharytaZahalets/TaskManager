import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from 'state/store';

// thunk to load taskList from AsyncStorage
export const loadTaskList = createAsyncThunk('taskList/loadTaskList', async () => {
  const savedTaskList = await AsyncStorage.getItem('taskList');
  return savedTaskList ? JSON.parse(savedTaskList) : [];
});

// thunk to save taskList to AsyncStorage
export const saveTaskList = createAsyncThunk(
  'taskList/saveTaskList',
  async (_, { getState }) => {
    const state = getState() as RootState;
    await AsyncStorage.setItem('taskList', JSON.stringify(state.taskList));
  },
);
