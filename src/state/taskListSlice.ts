import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task, TaskListState } from 'models/TaskList';

const initialState: TaskListState = {
  taskList: [],
};

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setTaskListAction: (state: TaskListState, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    },
    addTaskAction: (state: TaskListState, action: PayloadAction<Task>) => {
      state.taskList.push(action.payload);
    },
    updateTaskAction: (state: TaskListState, action: PayloadAction<Task>) => {
      const index = state.taskList.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.taskList[index] = action.payload;
      }
    },
    deleteTaskAction: (state: TaskListState, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTaskAction, updateTaskAction, deleteTaskAction, setTaskListAction } =
  taskListSlice.actions;

export default taskListSlice.reducer;
