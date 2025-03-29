import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export interface TaskItem {
  _id: string;
    title: string;
    description: string;
  }

interface TasksState {
    tasks: TaskItem[];
    loading: boolean;
    error: string | null;
  }

// task - status(complete, incomplete), text, _id
const initialState: TasksState = {
  tasks: [
   
  ], loading: false,
  error: null,
};
export const fetchTaskItems = createAsyncThunk('tasks/fetch', async () => {
    const response = await apiClient.get('/tasks');
    return response.data.data;
  });

  const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      createTaskItem: (state, action: PayloadAction<TaskItem>) => {
        state.tasks.push(action.payload);
      },
      updateTaskItem: (state, action: PayloadAction<TaskItem>) => {
        const index = state.tasks.findIndex((item: TaskItem) => item._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      },
      deleteTaskItem: (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((item) => item._id !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTaskItems.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchTaskItems.fulfilled, (state, action: PayloadAction<TaskItem[]>) => {
          state.tasks = action.payload;
          state.loading = false;
        })
        .addCase(fetchTaskItems.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to fetch tasks';
          state.loading = false;
        });
    },
  });

  export const { createTaskItem, updateTaskItem, deleteTaskItem } = tasksSlice.actions;
  export default tasksSlice.reducer;
